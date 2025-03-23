<script setup>
import Calendar from 'primevue/calendar'; // Import the Calendar component
import Chart from 'primevue/chart';
import { computed, onMounted, ref, watch } from 'vue';
import { useUserStore } from '/stores/user';

const userStore = useUserStore();
const chartSelectedDate = ref(null); // Ref to store the date selected in the calendar

const fullUserData = computed(() => userStore.fullUserData);
const data = fullUserData.value;
const dias = data?.dias ?? {};

const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const availableDates = ref(
    Object.keys(dias)
        .map((dateString) => {
            const parts = dateString.split('-');
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        })
        .sort((a, b) => b.getTime() - a.getTime())
);

if (availableDates.value.length > 0) {
    chartSelectedDate.value = availableDates.value[0];
}

const isDateSelectable = (date) => {
    return availableDates.value.some((availableDate) => availableDate.getFullYear() === date.getFullYear() && availableDate.getMonth() === date.getMonth() && availableDate.getDate() === date.getDate());
};

const dailyData = computed(() => dias[formatDate(chartSelectedDate.value)] ?? {});

const pressureData = computed(() => {
    const bpData = dailyData.value?.bloodPressureData ?? [];
    const labels = bpData.map((item) => {
        const date = new Date(item.time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    const systolicData = bpData.map((item) => item.systolic);
    const diastolicData = bpData.map((item) => item.diastolic);
    return { labels, systolicData, diastolicData };
});

const heartRateData = computed(() => {
    const hrData = dailyData.value?.heartRateData ?? [];
    const labels = hrData.map((item) => {
        const date = new Date(item.time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    const rateData = hrData.map((item) => item.rate);
    return { labels, rateData };
});

const oxygenData = computed(() => {
    const oxData = dailyData.value?.oxygenSaturationData ?? [];
    const labels = oxData.map((item) => {
        const date = new Date(item.time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    const percentageData = oxData.map((item) => item.percentage);
    return { labels, percentageData };
});

const charts = computed(() => {
    const pressure = pressureData.value;
    const heart = heartRateData.value;
    const oxygen = oxygenData.value;

    return [
        {
            title: 'Presión Arterial Durante el Día',
            labels: pressure.labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Sistólica',
                    backgroundColor: '#FF6384',
                    data: pressure.systolicData,
                    barThickness: 12
                },
                {
                    type: 'bar',
                    label: 'Diastólica',
                    backgroundColor: '#36A2EB',
                    data: pressure.diastolicData,
                    barThickness: 12
                }
            ]
        },
        {
            title: 'Frecuencia Cardíaca Durante el Día',
            labels: heart.labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Frecuencia Cardíaca',
                    backgroundColor: '#4CAF50',
                    data: heart.rateData,
                    barThickness: 16
                }
            ]
        },
        {
            title: 'Oxigenación en Sangre Durante el Día',
            labels: oxygen.labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Oxigenación (%)',
                    backgroundColor: '#FFC107',
                    data: oxygen.percentageData,
                    barThickness: 16
                }
            ]
        }
    ];
});

const currentChartIndex = ref(0);

function nextChart() {
    currentChartIndex.value = (currentChartIndex.value + 1) % charts.value.length;
}

function prevChart() {
    currentChartIndex.value = (currentChartIndex.value - 1 + charts.value.length) % charts.value.length;
}

const chartOptions = ref(null);

function setChartOptions() {
    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: false,
                ticks: {
                    color: '#666'
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: false,
                ticks: {
                    color: '#666'
                },
                grid: {
                    color: '#ddd',
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

onMounted(() => {
    chartOptions.value = setChartOptions();
    // Initialize chartSelectedDate to the latest available date if not already set
    if (!chartSelectedDate.value && availableDates.value.length > 0) {
        chartSelectedDate.value = availableDates.value[0];
    }
});

watch(currentChartIndex, () => {
    chartOptions.value = setChartOptions();
});

// Watch for changes in chartSelectedDate to update the charts
watch(chartSelectedDate, () => {
    // The 'charts' computed property will automatically re-evaluate
    // when chartSelectedDate changes because it depends on dailyData.
});
</script>
<template>
    <div class="flex flex-col">
        <div class="mb-4 flex justify-center">
            <Calendar
                v-model="chartSelectedDate"
                dateFormat="dd/mm/yy"
                :disabledDates="availableDates.filter((date) => !isDateSelectable(date))"
                :minDate="availableDates.length > 0 ? availableDates[availableDates.length - 1] : null"
                :maxDate="availableDates.length > 0 ? availableDates[0] : new Date()"
                :isDateDisabled="(date) => !isDateSelectable(date)"
                class="shadow-lg rounded-md"
            />
        </div>
        <div class="card flex flex-col sm:flex-row items-center">
            <button @click="prevChart" class="p-2 mr-4 bg-gray-200 rounded" :disabled="charts.length === 0 || charts[currentChartIndex] === undefined">⬅️</button>
            <div class="flex-1 w-full" v-if="charts.length > 0 && charts[currentChartIndex]">
                <div class="font-semibold text-xl mb-4 text-center">{{ charts[currentChartIndex].title }}</div>
                <div class="relative w-full h-80">
                    <Chart type="bar" :data="charts[currentChartIndex]" :options="chartOptions" class="w-full h-full" />
                </div>
            </div>
            <div class="flex-1 w-full" v-else>
                <div class="font-semibold text-xl mb-4 text-center">No hay datos disponibles para la fecha seleccionada.</div>
            </div>
            <button @click="nextChart" class="p-2 ml-4 bg-gray-200 rounded" :disabled="charts.length === 0 || charts[currentChartIndex] === undefined">➡️</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    max-width: 100%;
    overflow: hidden;
}
</style>
