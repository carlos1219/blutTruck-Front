<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useUserStore } from '/stores/user';

const userStore = useUserStore();

// Definición de los campos, todos opcionales (inicialmente null)
const form = ref({
    steps: null,
    activeCalories: null,
    heartRates: null,
    restingHeartRate: null,
    weight: null,
    height: null,
    bloodPressureSystolic: null,
    bloodPressureDiastolic: null,
    bloodGlucose: null,
    bodyTemperature: null,
    respiratoryRate: null,
    oxygenSaturation: null,
    date: null, // Nueva propiedad para la fecha
    time: null // Nueva propiedad para la hora
});
// Función para formatear la fecha en YYYY-MM-DD
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
// Mensajes de error
const errors = ref({
    steps: '',
    activeCalories: '',
    heartRates: '',
    restingHeartRate: '',
    weight: '',
    height: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodGlucose: '',
    bodyTemperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    date: '', // Nuevo mensaje de error para la fecha
    time: '' // Nuevo mensaje de error para la hora
});

// Computed para determinar si el formulario está vacío (todos los campos sin valor)
const isFormEmpty = computed(() => Object.values(form.value).every((value) => value === null || value === ''));

// Función para validar el formulario
function validateForm() {
    let isValid = true;

    // Validar que los campos numéricos sean positivos
    const fields = ['steps', 'activeCalories', 'heartRates', 'restingHeartRate', 'weight', 'height', 'bloodPressureSystolic', 'bloodPressureDiastolic', 'bloodGlucose', 'bodyTemperature', 'respiratoryRate', 'oxygenSaturation'];
    fields.forEach((field) => {
        if (form.value[field] !== null && form.value[field] !== '') {
            if (form.value[field] <= 0) {
                errors.value[field] = 'El valor debe ser mayor que 0.';
                isValid = false;
            } else {
                errors.value[field] = '';
            }
        } else {
            errors.value[field] = '';
        }
    });

    // Validaciones específicas
    if (form.value.bodyTemperature !== null && form.value.bodyTemperature !== '' && (form.value.bodyTemperature < 35 || form.value.bodyTemperature > 42)) {
        errors.value.bodyTemperature = 'La temperatura corporal debe estar entre 35°C y 42°C.';
        isValid = false;
    }

    if (form.value.oxygenSaturation !== null && form.value.oxygenSaturation !== '' && (form.value.oxygenSaturation < 70 || form.value.oxygenSaturation > 100)) {
        errors.value.oxygenSaturation = 'La saturación de oxígeno debe estar entre 70% y 100%.';
        isValid = false;
    }

    if (!form.value.date) {
        errors.value.date = 'La fecha es obligatoria.';
        isValid = false;
    } else {
        errors.value.date = '';
    }

    return isValid;
}

async function handleSubmit() {
    const apiError = ref(null);
    const apiSuccessMessage = ref(null);
    if (isFormEmpty.value) {
        alert('Por favor, ingrese al menos un dato antes de guardar.');
        return;
    }

    if (!validateForm()) {
        alert('Por favor, corrija los errores en el formulario.');
        return;
    }

    // Construir el payload con los datos del formulario
    const payload = {};
    const time = form.value.time ? `${form.value.date}T${form.value.time}` : new Date().toISOString();

    if (form.value.steps != null && form.value.steps !== '') payload.steps = parseInt(form.value.steps);
    if (form.value.activeCalories != null && form.value.activeCalories !== '') payload.activeCalories = parseInt(form.value.activeCalories);
    if (form.value.heartRates != null && form.value.heartRates !== '') payload.avgHeartRate = parseInt(form.value.heartRates);
    if (form.value.restingHeartRate != null && form.value.restingHeartRate !== '') payload.restingHeartRate = parseInt(form.value.restingHeartRate);
    if (form.value.weight != null && form.value.weight !== '') payload.weight = parseFloat(form.value.weight);
    if (form.value.height != null && form.value.height !== '') payload.height = parseFloat(form.value.height);

    if (form.value.bloodPressureSystolic != null && form.value.bloodPressureSystolic !== '') {
        if (!payload.bloodPressureData) payload.bloodPressureData = [];
        payload.bloodPressureData.push({ time, systolic: parseInt(form.value.bloodPressureSystolic) });
    }
    if (form.value.bloodPressureDiastolic != null && form.value.bloodPressureDiastolic !== '') {
        if (!payload.bloodPressureData) payload.bloodPressureData = [];
        const lastBpEntry = payload.bloodPressureData.at(-1);
        if (lastBpEntry && !lastBpEntry.diastolic) {
            lastBpEntry.diastolic = parseInt(form.value.bloodPressureDiastolic);
        } else {
            payload.bloodPressureData.push({ time, diastolic: parseInt(form.value.bloodPressureDiastolic) });
        }
    }
    if (form.value.bloodGlucose != null && form.value.bloodGlucose !== '') {
        if (!payload.bloodGlucoseData) payload.bloodGlucoseData = [];
        payload.bloodGlucoseData.push({ time, bloodGlucose: parseFloat(form.value.bloodGlucose) });
    }
    if (form.value.bodyTemperature != null && form.value.bodyTemperature !== '') {
        if (!payload.temperatureData) payload.temperatureData = [];
        payload.temperatureData.push({ time, temperature: parseFloat(form.value.bodyTemperature) });
    }
    if (form.value.respiratoryRate != null && form.value.respiratoryRate !== '') {
        if (!payload.respiratoryRateData) payload.respiratoryRateData = [];
        payload.respiratoryRateData.push({ time, rate: parseInt(form.value.respiratoryRate) });
    }
    if (form.value.oxygenSaturation != null && form.value.oxygenSaturation !== '') {
        if (!payload.oxygenSaturationData) payload.oxygenSaturationData = [];
        payload.oxygenSaturationData.push({ time, percentage: parseInt(form.value.oxygenSaturation) });
    }

    const selectedDate = form.value.date;
    const formattedDate = formatDate(selectedDate);

    // Obtener la estructura actual de 'dias' desde la tienda
    const currentDias = { ...userStore.dias };

    if (currentDias[formattedDate]) {
        // Si el día ya existe, fusiona los datos que no son listas
        const existingData = currentDias[formattedDate];
        currentDias[formattedDate] = {
            ...existingData,
            ...Object.fromEntries(Object.entries(payload).filter(([, value]) => !Array.isArray(value)))
        };

        // Para los datos en forma de array (por ejemplo, bloodPressureData), se concatenan los nuevos datos
        for (const key in payload) {
            if (Array.isArray(payload[key])) {
                currentDias[formattedDate][key] = [...(currentDias[formattedDate][key] || []), ...payload[key]];
            }
        }
    } else {
        // Si el día no existe, crea una nueva entrada en 'dias'
        currentDias[formattedDate] = payload;
    }

    userStore.updateDiasInUserData(currentDias);

    try {
        apiError.value = null;
        apiSuccessMessage.value = null;

        const userId = userStore.fullUserData?.userId; // Assuming user ID is stored in fullUserData
        if (!userId) {
            console.error('No se pudo obtener el ID del usuario.');
            apiError.value = 'No se pudo obtener el ID del usuario.';
            return;
        }

        // Construir el objeto de healthData con la misma estructura que Flutter
        const healthDataForApi = {
            UserId: userId, // Asegúrate de incluirlo si es requerido en HealthData
            Steps: payload.steps,
            ActiveCalories: payload.activeCalories,
            HeartRates: payload.avgHeartRate ? [payload.avgHeartRate] : [], // O el arreglo completo de pulsaciones
            HeartRateData: form.value.heartRateData || [], // Asegúrate de formatear cada registro con Time y BPM
            RestingHeartRate: payload.restingHeartRate,
            Weight: payload.weight,
            Height: payload.height,
            BloodPressureData: payload.bloodPressureData
                ? payload.bloodPressureData.map((bp) => ({
                      Time: bp.time,
                      Systolic: bp.systolic,
                      Diastolic: bp.diastolic
                  }))
                : [],
            OxygenSaturationData: payload.oxygenSaturationData
                ? payload.oxygenSaturationData.map((ox) => ({
                      Time: ox.time,
                      Percentage: ox.percentage
                  }))
                : [],
            BloodGlucoseData: payload.bloodGlucoseData
                ? payload.bloodGlucoseData.map((bg) => ({
                      Time: bg.time,
                      BloodGlucose: bg.bloodGlucose
                  }))
                : [],
            BodyTemperature: payload.temperatureData ? payload.temperatureData.at(-1)?.temperature : null,
            TemperatureData: payload.temperatureData
                ? payload.temperatureData.map((temp) => ({
                      Time: temp.time,
                      Temperature: temp.temperature
                  }))
                : [],
            RespiratoryRateData: payload.respiratoryRateData
                ? payload.respiratoryRateData.map((rr) => ({
                      Time: rr.time,
                      Rate: rr.rate
                  }))
                : [],
            SleepData: payload.sleepData
                ? payload.sleepData.map((sd) => ({
                      StartTime: sd.startTime,
                      EndTime: sd.endTime,
                      Stages: sd.stages
                          ? sd.stages.map((stage) => ({
                                Type: stage.type,
                                StartTime: stage.startTime,
                                EndTime: stage.endTime
                            }))
                          : []
                  }))
                : []
        };

        const requestBodyForApi = {
            Credentials: {
                UserId: userId, // Asegúrate de usar la misma propiedad que espera el endpoint
                IdToken: 'string' // Si el backend no lo utiliza directamente, se reemplazará por uno generado
            },
            HealthData: healthDataForApi
        };

        const apiUrl = 'http://localhost:3000/api/WriteData/write';
        const response = await axios.post(apiUrl, requestBodyForApi);

        if (response.status === 200) {
            apiSuccessMessage.value = 'Datos de salud guardados exitosamente en la API.';
            console.log('Respuesta de la API:', response.data);
            // Optionally reset the form or navigate to another page
            Object.keys(form.value).forEach((key) => {
                form.value[key] = null;
            });
            // router.push('/some-success-page');
        } else {
            apiError.value = `Error al guardar los datos de salud en la API: ${response.data}`;
            console.error('Error en la API:', response.data);
        }
    } catch (error) {
        apiError.value = `Error en la solicitud a la API: ${error.message}`;
        console.error('Error en la solicitud a la API:', error);
    }
}
</script>

<template>
    <div class="p-6 bg-surface-100 dark:bg-surface-900 min-h-screen flex items-center justify-center">
        <div class="bg-white dark:bg-surface-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Registro de Datos</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div>
                    <label for="steps" class="block text-sm font-medium text-surface-700 dark:text-gray-300">Pasos</label>
                    <input
                        id="steps"
                        v-model="form.steps"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa los pasos"
                    />
                    <span class="text-red-500 text-sm">{{ errors.steps }}</span>
                </div>
                <div>
                    <label for="activeCalories" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Calorías Activas</label>
                    <input
                        id="activeCalories"
                        v-model="form.activeCalories"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa las calorías activas"
                    />
                    <span class="text-red-500 text-sm">{{ errors.activeCalories }}</span>
                </div>
                <div>
                    <label for="heartRates" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Frecuencia Cardíaca Promedio</label>
                    <input
                        id="heartRates"
                        v-model="form.heartRates"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la frecuencia promedio"
                    />
                    <span class="text-red-500 text-sm">{{ errors.heartRates }}</span>
                </div>
                <div>
                    <label for="restingHeartRate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Frecuencia Cardíaca en Reposo</label>
                    <input
                        id="restingHeartRate"
                        v-model="form.restingHeartRate"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la frecuencia en reposo"
                    />
                    <span class="text-red-500 text-sm">{{ errors.restingHeartRate }}</span>
                </div>
                <div>
                    <label for="weight" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Peso (kg)</label>
                    <input
                        id="weight"
                        v-model="form.weight"
                        type="number"
                        step="0.1"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa el peso en kg"
                    />
                    <span class="text-red-500 text-sm">{{ errors.weight }}</span>
                </div>
                <div>
                    <label for="height" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Altura (cm)</label>
                    <input
                        id="height"
                        v-model="form.height"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la altura en cm"
                    />
                    <span class="text-red-500 text-sm">{{ errors.height }}</span>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label for="bloodPressureSystolic" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Presión Sistólica</label>
                        <input
                            id="bloodPressureSystolic"
                            v-model="form.bloodPressureSystolic"
                            type="number"
                            class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                            placeholder="Sistólica"
                        />
                        <span class="text-red-500 text-sm">{{ errors.bloodPressureSystolic }}</span>
                    </div>
                    <div>
                        <label for="bloodPressureDiastolic" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Presión Diastólica</label>
                        <input
                            id="bloodPressureDiastolic"
                            v-model="form.bloodPressureDiastolic"
                            type="number"
                            class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                            placeholder="Diastólica"
                        />
                        <span class="text-red-500 text-sm">{{ errors.bloodPressureDiastolic }}</span>
                    </div>
                </div>
                <div>
                    <label for="bloodGlucose" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Glucosa en Sangre</label>
                    <input
                        id="bloodGlucose"
                        v-model="form.bloodGlucose"
                        type="number"
                        step="0.1"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la glucosa"
                    />
                    <span class="text-red-500 text-sm">{{ errors.bloodGlucose }}</span>
                </div>
                <div>
                    <label for="bodyTemperature" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Temperatura Corporal (°C)</label>
                    <input
                        id="bodyTemperature"
                        v-model="form.bodyTemperature"
                        type="number"
                        step="0.1"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la temperatura"
                    />
                    <span class="text-red-500 text-sm">{{ errors.bodyTemperature }}</span>
                </div>
                <div>
                    <label for="respiratoryRate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Frecuencia Respiratoria</label>
                    <input
                        id="respiratoryRate"
                        v-model="form.respiratoryRate"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la frecuencia respiratoria"
                    />
                    <span class="text-red-500 text-sm">{{ errors.respiratoryRate }}</span>
                </div>
                <div>
                    <label for="oxygenSaturation" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Saturación de Oxígeno (%)</label>
                    <input
                        id="oxygenSaturation"
                        v-model="form.oxygenSaturation"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la saturación"
                    />
                    <span class="text-red-500 text-sm">{{ errors.oxygenSaturation }}</span>
                </div>
                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
                    <input id="date" v-model="form.date" type="date" class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                    <span class="text-red-500 text-sm">{{ errors.date }}</span>
                </div>

                <div>
                    <label for="time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
                    <input id="time" v-model="form.time" type="time" class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                    <span class="text-red-500 text-sm">{{ errors.time }}</span>
                </div>

                <div>
                    <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800" :disabled="isFormEmpty">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Puedes ajustar los estilos según tus necesidades */
</style>
