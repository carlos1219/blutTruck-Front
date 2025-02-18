<script setup>
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import { useToast } from 'primevue/usetoast';
import * as QRCode from 'qrcode'; // Importación correcta
import { ref } from 'vue';

// Datos estáticos del perfil
const profile = ref({
    name: 'Carlos',
    weight: 70,
    height: 175,
    dateOfBirth: '1990-01-01',
    gender: 'Hombre',
    smoke: false,
    alcohol: false,
    cholesterol: 100,
    hasPredisposition: false,
    imageUrl: '/demo/images/monitoreo/hombre1.jpg', // URL de imagen de ejemplo
    connectionType: 'normal' // Tipo de conexión por defecto
});

const toast = useToast();
// Generar QR al cargar el componente
const qrCodeUrl = ref('');

// Método para generar el QR dinámicamente
const generateQRCode = async () => {
    try {
        const qrData = JSON.stringify({
            name: profile.value.name,
            connectionType: profile.value.connectionType
        });
        qrCodeUrl.value = await QRCode.toDataURL(qrData);
    } catch (error) {
        console.error('Error generando el código QR:', error);
    }
};

// Método para guardar el perfil (simulado)
function saveProfile() {
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil guardado correctamente', life: 3000 });
}

// Método para cerrar sesión (simulado)
function signOut() {
    toast.add({ severity: 'warn', summary: 'Cerrar Sesión', detail: 'Sesión cerrada', life: 3000 });
}

// Generar el QR inicialmente
generateQRCode();
</script>

<template>
    <div class="p-6 bg-surface-100 dark:bg-surface-900 min-h-screen flex items-center justify-center">
        <Toast />
        <!-- Añade el componente Toast aquí -->
        <div class="bg-white dark:bg-surface-800 p-8 rounded-lg shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col items-center md:items-start">
                <h2 class="text-3xl font-bold mb-6 text-center md:text-left text-gray-800 dark:text-gray-200">Bienvenido, {{ profile.name }}</h2>
                <div class="mb-6">
                    <img :src="profile.imageUrl" alt="Foto de perfil" class="w-32 h-32 rounded-full object-cover" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fumador</label>
                    <input type="checkbox" v-model="profile.smoke" class="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Bebe Alcohol</label>
                    <input type="checkbox" v-model="profile.alcohol" class="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Predisposición</label>
                    <input type="checkbox" v-model="profile.hasPredisposition" class="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" readonly />
                </div>
                <div class="mb-4 flex items-center">
                    <div class="w-40">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nivel de Colesterol</label>
                    </div>
                    <div class="flex-1 ml-4">
                        <Slider v-model="profile.cholesterol" :min="0" :max="5" :step="1" class="w-full my-slider" />
                        <div class="text-xs text-gray-600 mt-1">{{ profile.cholesterol * 20 }} mg/dL</div>
                    </div>
                </div>
                <div class="mb-4 relative">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Porcentaje de Alerta</label>
                    <input
                        type="number"
                        v-model="profile.notificationPercentage"
                        min="40"
                        max="80"
                        class="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white w-full"
                        v-tooltip.right="'Cuando llegue a este porcentaje, se enviará un correo a las personas que te monitorizan y a ti.'"
                    />
                </div>
            </div>

            <div class="flex flex-col">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                    <input type="text" v-model="profile.name" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Peso (kg)</label>
                    <input type="number" v-model="profile.weight" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Altura (cm)</label>
                    <input type="number" v-model="profile.height" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Nacimiento</label>
                    <!-- Se utiliza el componente Calendar para seleccionar la fecha -->
                    <Calendar v-model="profile.dateOfBirth" dateFormat="yy-mm-dd" showIcon class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Género</label>
                    <select v-model="profile.gender" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-600 dark:border-surface-600 dark:text-white">
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Conexión</label>
                    <select v-model="profile.connectionType" @change="generateQRCode" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-600 dark:border-surface-600 dark:text-white">
                        <option value="normal">Normal</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div class="mb-4">
                    <button @click="saveProfile" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800">Guardar</button>
                </div>
                <div class="mb-4">
                    <button @click="signOut" as="router-link" to="/" class="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-700 dark:hover:bg-red-800">Cerrar Sesión</button>
                </div>
            </div>
        </div>
        <div class="mt-8 flex justify-center">
            <img :src="qrCodeUrl" alt="Código QR" class="w-32 h-32" />
        </div>
    </div>
</template>

<style scoped>
/* Sobrescribe el color de la barra de rango */
:deep(.my-slider .p-slider-range) {
    background-color: #3498db !important; /* bg-blue-100 de Tailwind */
}

/* Sobrescribe el color del handle (pulgar) */
:deep(.my-slider .p-slider-handle) {
    background-color: #3498db !important;
    border-color: #3498db !important;
}
</style>
