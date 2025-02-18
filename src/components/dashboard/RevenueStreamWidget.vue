<script setup>
import { onMounted, ref } from 'vue';

const charts = ref([
    {
        title: 'Presión Arterial Durante el Día',
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [
            {
                type: 'bar',
                label: 'Sistólica',
                backgroundColor: '#FF6384',
                data: [120, 118, 115, 113, 110, 108, 120, 125, 130, 135, 140, 138, 137, 135, 132, 130, 128, 126, 125, 124, 122, 121, 120, 119],
                barThickness: 16
            },
            {
                type: 'bar',
                label: 'Diastólica',
                backgroundColor: '#36A2EB',
                data: [80, 78, 76, 75, 73, 72, 78, 80, 82, 85, 87, 86, 85, 83, 82, 80, 79, 78, 77, 76, 75, 74, 73, 72],
                barThickness: 16
            }
        ]
    },
    {
        title: 'Frecuencia Cardíaca Durante el Día',
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [
            {
                type: 'bar',
                label: 'Frecuencia Cardíaca',
                backgroundColor: '#4CAF50',
                data: [70, 68, 65, 64, 62, 60, 65, 72, 78, 85, 90, 88, 86, 83, 80, 78, 76, 75, 74, 73, 72, 71, 70, 68],
                barThickness: 16
            }
        ]
    },
    {
        title: 'Oxigenación en Sangre Durante el Día',
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [
            {
                type: 'bar',
                label: 'Oxigenación (%)',
                backgroundColor: '#FFC107',
                data: [98, 97, 96, 95, 94, 93, 94, 95, 96, 97, 98, 98, 97, 96, 95, 94, 93, 92, 93, 94, 95, 96, 97, 98],
                barThickness: 16
            }
        ]
    }
]);

const currentChartIndex = ref(0);

function nextChart() {
    currentChartIndex.value = (currentChartIndex.value + 1) % charts.value.length;
}

function prevChart() {
    currentChartIndex.value = (currentChartIndex.value - 1 + charts.value.length) % charts.value.length;
}

const chartData = ref(null);
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
    chartData.value = charts.value[currentChartIndex.value];
    chartOptions.value = setChartOptions();
});
</script>

<template>
    <div class="card flex items-center">
        <button @click="prevChart" class="p-2 mr-4 bg-gray-200 rounded">⬅️</button>
        <div class="flex-1">
            <div class="font-semibold text-xl mb-4">{{ charts[currentChartIndex].title }}</div>
            <Chart type="bar" :data="charts[currentChartIndex]" :options="chartOptions" class="h-80" />
        </div>
        <button @click="nextChart" class="p-2 ml-4 bg-gray-200 rounded">➡️</button>
    </div>
</template>
