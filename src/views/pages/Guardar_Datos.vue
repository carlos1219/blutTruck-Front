<script setup>
import { computed, ref } from 'vue';

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

    return isValid;
}

function handleSubmit() {
    if (isFormEmpty.value) {
        alert('Por favor, ingrese al menos un dato antes de guardar.');
        return;
    }

    if (!validateForm()) {
        alert('Por favor, corrija los errores en el formulario.');
        return;
    }

    // Aquí procesas el payload
    const payload = {};
    if (form.value.steps != null) payload.steps = form.value.steps;
    if (form.value.activeCalories != null) payload.activeCalories = form.value.activeCalories;
    if (form.value.heartRates != null) payload.heartRates = form.value.heartRates;
    if (form.value.restingHeartRate != null) payload.restingHeartRate = form.value.restingHeartRate;
    if (form.value.weight != null) payload.weight = form.value.weight;
    if (form.value.height != null) payload.height = form.value.height;
    if (form.value.bloodPressureSystolic != null) payload.bloodPressureSystolic = form.value.bloodPressureSystolic;
    if (form.value.bloodPressureDiastolic != null) payload.bloodPressureDiastolic = form.value.bloodPressureDiastolic;
    if (form.value.bloodGlucose != null) payload.bloodGlucose = form.value.bloodGlucose;
    if (form.value.bodyTemperature != null) payload.bodyTemperature = form.value.bodyTemperature;
    if (form.value.respiratoryRate != null) payload.respiratoryRate = form.value.respiratoryRate;
    if (form.value.oxygenSaturation != null) payload.oxygenSaturation = form.value.oxygenSaturation;
    if (form.value.date != null) payload.date = form.value.date; // Nuevo campo
    if (form.value.time != null) payload.time = form.value.time; // Nuevo campo

    console.log('Datos a enviar:', payload);
}
</script>

<template>
    <div class="p-6 bg-surface-100 dark:bg-surface-900 min-h-screen flex items-center justify-center">
        <div class="bg-white dark:bg-surface-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Registro de Datos</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Ejemplo para el campo Steps -->
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
                <!-- Active Calories -->
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
                <!-- Heart Rates -->
                <div>
                    <label for="heartRates" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Frecuencias Cardíacas</label>
                    <input
                        id="heartRates"
                        v-model="form.heartRates"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa las frecuencias"
                    />
                    <span class="text-red-500 text-sm">{{ errors.heartRates }}</span>
                </div>
                <!-- Resting Heart Rate -->
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
                <!-- Weight -->
                <div>
                    <label for="weight" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Peso (kg)</label>
                    <input
                        id="weight"
                        v-model="form.weight"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa el peso en kg"
                    />
                    <span class="text-red-500 text-sm">{{ errors.weight }}</span>
                </div>
                <!-- Height -->
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
                <!-- Blood Pressure -->
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
                <!-- Blood Glucose -->
                <div>
                    <label for="bloodGlucose" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Glucosa en Sangre</label>
                    <input
                        id="bloodGlucose"
                        v-model="form.bloodGlucose"
                        type="number"
                        class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                        placeholder="Ingresa la glucosa"
                    />
                    <span class="text-red-500 text-sm">{{ errors.bloodGlucose }}</span>
                </div>
                <!-- Body Temperature -->
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
                <!-- Respiratory Rate -->
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
                <!-- Oxygen Saturation -->
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
                <!-- Date -->
                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
                    <input id="date" v-model="form.date" type="date" class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                    <span class="text-red-500 text-sm">{{ errors.date }}</span>
                </div>

                <!-- Time -->
                <div>
                    <label for="time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
                    <input id="time" v-model="form.time" type="time" class="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                    <span class="text-red-500 text-sm">{{ errors.time }}</span>
                </div>
                <!-- Botón para enviar -->
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
