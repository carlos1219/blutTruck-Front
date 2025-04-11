<script setup>
import axios from 'axios'; // Importa Axios
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import { useConfirm } from 'primevue/useconfirm'; // Importar el hook useConfirm
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '/stores/user';
// Usar el hook para obtener el servicio de confirmación
const confirm = useConfirm();

// Acceder al store de Pinia
const userStore = useUserStore();
const router = useRouter();
const profile = ref({
    name: '',
    weight: null,
    height: null,
    dateOfBirth: null,
    gender: '',
    smoke: false,
    alcohol: false,
    cholesterol: 0,
    hasPredisposition: false,
    imageUrl: '/demo/images/monitoreo/hombre1.jpg', // URL de imagen de ejemplo por defecto
    connectionType: 'normal', // Tipo de conexión por defecto
    notificationPercentage: 60, // Valor por defecto para el porcentaje de alerta
    connectionCode: null,
    connectionCodeInput: null
});

const toast = useToast();

// Función para actualizar el ref profile con los datos del store
const updateProfileFromStore = () => {
    // Define la imagen por defecto aquí para fácil acceso
    const defaultImageUrl = '/demo/images/monitoreo/hombre1.png';

    if (userStore.fullUserData && userStore.fullUserData.datosPersonales) {
        const datos = userStore.fullUserData.datosPersonales;
        profile.value.name = datos.name || '';
        profile.value.weight = datos.weight || null;
        profile.value.height = datos.height || null;
        profile.value.dateOfBirth = datos.dateOfBirth ? new Date(datos.dateOfBirth) : null;
        profile.value.gender = datos.gender === 1 ? 'Hombre' : datos.gender === 2 ? 'Mujer' : datos.gender === 3 ? 'Otro' : '';
        profile.value.smoke = !!datos.smoke;
        profile.value.alcohol = !!datos.alcohol;
        profile.value.cholesterol = datos.choresterol || datos.cholesterol || 0;
        profile.value.hasPredisposition = !!datos.hasPredisposition;

        profile.value.imageUrl = datos.photoURL || defaultImageUrl;
    } else {
        profile.value.imageUrl = defaultImageUrl;
    }
};

// Función para validar que los datos sean realistas
function validateProfile() {
    if (!profile.value.name || profile.value.name.trim().length === 0) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'El nombre es obligatorio', life: 3000 });
        return false;
    }
    if (!profile.value.weight || profile.value.weight < 30 || profile.value.weight > 300) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Peso no realista (debe estar entre 30 y 300 kg)', life: 3000 });
        return false;
    }
    if (!profile.value.height || profile.value.height < 100 || profile.value.height > 250) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Altura no realista (debe estar entre 100 y 250 cm)', life: 3000 });
        return false;
    }
    if (!profile.value.dateOfBirth) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'La fecha de nacimiento es obligatoria', life: 3000 });
        return false;
    }
    // Puedes agregar más validaciones según el campo
    return true;
}

onMounted(() => {
    updateProfileFromStore();
    // Ejemplo: if (!userStore.fullUserData) { fetchUserData(); }
});

async function saveProfile() {
    // Primero validamos los datos
    if (!validateProfile()) {
        return; // Se detiene el guardado si hay error en la validación
    }

    const userId = userStore.fullUserData.userId;
    const apiUrl = 'http://localhost:3000/api/WriteData/save-profile';

    const profileDataToSend = {
        Credentials: {
            UserId: userId,
            IdToken: 'string'
        },
        profile: {
            Conexion: {
                ConnectionStatus: 0
            },
            DateOfBirth: profile.value.dateOfBirth,
            HasPredisposition: profile.value.hasPredisposition,
            Height: parseInt(profile.value.height) || null,
            Weight: parseInt(profile.value.weight) || null,
            Gender: profile.value.gender === 'Hombre' ? 1 : profile.value.gender === 'Mujer' ? 2 : profile.value.gender === 'Otro' ? 3 : null,
            Smoke: profile.value.smoke ? 1 : 0,
            Alcohol: profile.value.alcohol ? 1 : 0,
            Choresterol: profile.value.cholesterol,
            PhotoURL: profile.value.imageUrl || null,
            Name: profile.value.name || null,
            Active: true
        }
    };

    try {
        const response = await axios.post(apiUrl, profileDataToSend);

        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil guardado correctamente', life: 3000 });
            console.log('Perfil guardado en el backend', response.data);
            // Supongamos que la respuesta incluye los datos actualizados del perfil:
            if (response.data && response.data.datosPersonales) {
                userStore.fullUserData.datosPersonales = { ...response.data.datosPersonales };
            } else {
                // Como alternativa, actualizamos el store con los valores locales:
                userStore.fullUserData.datosPersonales = {
                    name: profile.value.name,
                    weight: profile.value.weight,
                    height: profile.value.height,
                    dateOfBirth: profile.value.dateOfBirth,
                    gender: profile.value.gender === 'Hombre' ? 1 : profile.value.gender === 'Mujer' ? 2 : profile.value.gender === 'Otro' ? 3 : null,
                    smoke: profile.value.smoke,
                    alcohol: profile.value.alcohol,
                    choresterol: profile.value.cholesterol,
                    hasPredisposition: profile.value.hasPredisposition,
                    imageUrl: profile.value.imageUrl
                };
            }
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: `Error al guardar el perfil: ${response.data?.message || 'Error desconocido'}`, life: 3000 });
            console.error('Error al guardar el perfil:', response.status, response.data);
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al guardar el perfil: ${error.message || error}`, life: 3000 });
        console.error('Error al guardar el perfil:', error);
        if (error.response) {
            console.error('Datos de la respuesta:', error.response.data);
            console.error('Estado de la respuesta:', error.response.status);
            console.error('Cabeceras de la respuesta:', error.response.headers);
        } else if (error.request) {
            console.error('Datos de la solicitud:', error.request);
        } else {
            console.error('Error al configurar la solicitud:', error.message);
        }
    }
}

function signOut() {
    userStore.$reset(); // Resetea el store del usuario
    toast.add({ severity: 'warn', summary: 'Cerrar Sesión', detail: 'Sesión cerrada', life: 3000 });

    // Redirige al usuario a la página principal
    router.push('/');
}

// Función hash simple (djb2)
function generateDeterministicCode(userId, type) {
    // Combina el ID de usuario y el tipo
    const input = `${userId}-${type}`;
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) + hash + input.charCodeAt(i); // hash * 33 + c
    }
    // Convierte el hash a un número positivo, luego a base36 y toma los primeros 8 caracteres
    return Math.abs(hash).toString(36).toUpperCase().substr(0, 8);
}

function generateConnectionCode(type) {
    profile.value.connectionType = type;
    // Asume que el ID de usuario se obtiene del store
    const userId = userStore.fullUserData.userId;
    profile.value.connectionCode = generateDeterministicCode(userId, type);
    registerConnectionCode(); // Llama a la función que registra el código en el backend
    toast.add({
        severity: 'info',
        summary: 'Código Generado',
        detail: `Código de conexión (${type}): ${profile.value.connectionCode}`,
        life: 5000
    });
}

async function getConnectionUserId() {
    if (!profile.value.connectionCodeInput) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Introduce un código válido', life: 3000 });
        return null;
    }

    const apiUrl = 'http://localhost:3000/api/WriteData/GetCodeConnection'; // Ajusta la URL según tu API
    const payload = {
        Code: profile.value.connectionCodeInput,
        IdToken: 'string' // Se usa "string" para que el backend genere el token si es necesario
    };

    try {
        const response = await axios.post(apiUrl, payload);
        // Se asume que la respuesta tiene la propiedad Result.id que contiene el userId
        const userIdFromCode = response.data.result.id;
        return userIdFromCode;
    } catch (error) {
        const errorMsg = error.response?.data?.Message || 'Error al obtener el código de conexión.';
        toast.add({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
        return null;
    }
}

async function connectWithCode() {
    if (!profile.value.connectionCodeInput) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Introduce un código válido', life: 3000 });
        return;
    }

    // Obtener el ID del usuario conectado a través del código
    const connectedUserId = await getConnectionUserId();
    if (connectedUserId) {
        // Registrar la conexión entre el usuario actual y el usuario obtenido
        const registered = await registerConnection(connectedUserId);
        if (registered) {
            toast.add({
                severity: 'success',
                summary: 'Conexión establecida',
                detail: `Conexión entre ${userStore.fullUserData.userId} y ${connectedUserId} establecida correctamente`,
                life: 3000
            });
            // Luego eliminar el código de conexión
            await deleteConnectionCode();
        }
    }
}

async function registerConnection(connectedUserId) {
    const currentUserId = userStore.fullUserData.userId;
    const apiUrl = 'http://localhost:3000/api/WriteData/registerConnection'; // Ajusta la URL según tu API
    const payload = {
        CurrentUserId: currentUserId,
        ConnectedUserId: connectedUserId,
        IdToken: 'string' // Se usa "string" para que el backend genere el token si es necesario
    };

    try {
        const response = await axios.post(apiUrl, payload);
        toast.add({ severity: 'success', summary: 'Conexión registrada', detail: response.data.Message, life: 3000 });
        console.log('Conexión registrada:', response.data);
        return true;
    } catch (error) {
        const errorMsg = error.response?.data?.Message || 'Error al registrar la conexión.';
        toast.add({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
        console.error('Error en registerConnection:', error);
        return false;
    }
}

async function registerConnectionCode() {
    // Verifica que se haya generado un código
    if (!profile.value.connectionCode) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se ha generado ningún código de conexión.', life: 3000 });
        return;
    }

    // URL del endpoint (ajústala según corresponda a tu API)
    const apiUrl = 'http://localhost:3000/api/WriteData/registerCodeConnection';
    const payload = {
        CurrentUserId: userStore.fullUserData.userId,
        Code: profile.value.connectionCode,
        IdToken: 'string'
    };

    try {
        const response = await axios.post(apiUrl, payload);
        // Si la llamada fue exitosa, muestra un mensaje y registra la respuesta en consola
        toast.add({ severity: 'success', summary: 'Éxito', detail: response.data.Message, life: 3000 });
    } catch (error) {
        // Manejo de errores: muestra el mensaje del error si existe o un mensaje genérico
        const errorMsg = error.response?.data?.Message || 'Error al registrar el código de conexión.';
        toast.add({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
    toast.add({ severity: 'warn', summary: 'Eliminar Datos', detail: 'Simulando la eliminación de todos los datos.', life: 3000 });
    userStore.$reset();
    updateProfileFromStore();
}

async function deleteConnectionCode(codeToDelete) {
    // Usamos el código que se pasó como parámetro o, por defecto, el de profile.value.connectionCodeInput
    const code = codeToDelete || profile.value.connectionCodeInput;
    if (!code) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No hay un código de conexión para eliminar.', life: 3000 });
        return;
    }

    const apiUrl = 'http://localhost:3000/api/WriteData/deleteCodeConnection'; // Ajusta la URL según corresponda
    const payload = {
        Code: code,
        IdToken: 'string'
    };

    try {
        await axios.post(apiUrl, payload);
        // Limpiamos el campo de entrada
        profile.value.connectionCodeInput = null;
    } catch (error) {
        const errorMsg = error.response?.data?.Message || 'Error al eliminar el código de conexión.';
        toast.add({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
}

async function deleteAllData() {
    confirm.require({
        message: '¿Estás seguro de eliminar todos tus datos?',
        header: 'Confirmar eliminación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar', // Texto en español para el botón de aceptar
        rejectLabel: 'Cancelar', // Texto en español para el botón de rechazar
        accept: async () => {
            const apiUrl = 'http://localhost:3000/api/Writedata/deletedata';
            const payload = {
                UserId: userStore.fullUserData.userId,
                Token: 'string'
            };
            try {
                const response = await axios.delete(apiUrl, { data: payload });
                if (response.status === 200 && response.data.success) {
                    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos eliminados correctamente', life: 3000 });
                    userStore.$reset();
                    updateProfileFromStore();
                } else {
                    toast.add({ severity: 'error', summary: 'Error', detail: response.data?.ErrorMessage || 'No se pudieron eliminar los datos', life: 3000 });
                }
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Error', detail: error.message || 'Error al eliminar los datos', life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Cancelado', detail: 'Eliminación cancelada', life: 3000 });
        }
    });
}

async function downloadPdf() {
    // URL del endpoint, ajústala según la configuración de tu API
    const apiUrl = 'http://localhost:3000/api/ReadData/get-pdf';
    const payload = {
        Credentials: {
            UserId: userStore.fullUserData.userId,
            IdToken: 'string'
        }
    };

    try {
        // Importante: se configura responseType: 'blob' para manejar archivos binarios
        const response = await axios.post(apiUrl, payload, { responseType: 'blob' });
        // Se crea el blob a partir de la respuesta
        const blob = new Blob([response.data], { type: 'application/pdf' });
        // Se genera una URL temporal para el blob
        const url = window.URL.createObjectURL(blob);
        // Se crea un enlace (elemento 'a') y se simula un clic para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'datosSalud.pdf');
        document.body.appendChild(link);
        link.click();
        // Limpieza: se revoca la URL y se elimina el enlace
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error('Error al descargar el PDF:', error);
    }
}
</script>

<template>
    <div class="p-6 bg-surface-100 dark:bg-surface-900 min-h-screen flex items-center justify-center">
        <ConfirmDialog />
        <Toast />
        <div class="bg-white dark:bg-surface-800 p-8 rounded-lg shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col items-center md:items-start">
                <h2 class="text-3xl font-bold mb-6 text-center md:text-left text-gray-800 dark:text-gray-200">Bienvenido, {{ profile.name }}</h2>
                <div class="mb-6">
                    <img :src="profile.imageUrl" alt="Foto de perfil" class="w-32 h-32 rounded-full object-cover" />
                </div>
                <!-- Checkbox y slider permanecen iguales -->
                <div class="mb-4 flex items-center">
                    <input type="checkbox" v-model="profile.smoke" class="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                    <label class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Fumador</label>
                </div>
                <div class="mb-4 flex items-center">
                    <input type="checkbox" v-model="profile.alcohol" class="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                    <label class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Bebe Alcohol</label>
                </div>
                <div class="mb-4 flex items-center">
                    <input type="checkbox" v-model="profile.hasPredisposition" class="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                    <label class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Predisposición</label>
                </div>
                <div class="mb-4 w-full">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nivel de Colesterol</label>
                    <Slider v-model="profile.cholesterol" :min="1" :max="5" :step="1" class="w-full my-slider" />
                    <div class="text-xs text-gray-600 mt-1">{{ profile.cholesterol * 20 }} mg/dL</div>
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
                    <input type="text" v-model="profile.name" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Peso (kg)</label>
                    <input type="number" v-model="profile.weight" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Altura (cm)</label>
                    <input type="number" v-model="profile.height" class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Nacimiento</label>
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
                    <button @click="saveProfile" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800">Guardar</button>
                </div>
            </div>
            <div class="col-span-1 md:col-span-2 flex flex-col items-center mt-6">
                <div class="col-span-1 md:col-span-2 flex justify-center mt-6 space-x-4">
                    <button @click="() => generateConnectionCode('admin')" class="bg-green-500 hover:bg-green-600 text-white p-3 rounded-md shadow-sm">Generar Código Admin</button>
                    <button @click="() => generateConnectionCode('normal')" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-sm">Generar Código Normal</button>
                </div>
                <div v-if="profile.connectionCode" class="mt-4 p-3 border rounded-md bg-gray-100 dark:bg-gray-700">
                    Código de conexión ({{ profile.connectionType }}): <strong>{{ profile.connectionCode }}</strong>
                </div>
            </div>

            <div class="col-span-1 md:col-span-2 flex flex-col items-center mt-6">
                <h3 class="text-xl font-bold mb-4">Conectar con otra persona</h3>
                <input
                    type="text"
                    v-model="profile.connectionCodeInput"
                    placeholder="Introduce el código de conexión"
                    class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white"
                />
                <button @click="connectWithCode" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-sm mt-2">Conectar</button>
            </div>
            <div class="col-span-1 md:col-span-2 flex justify-center mt-4 space-x-4">
                <button @click="downloadPdf" class="bg-purple-500 hover:bg-purple-100 text-white p-3 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-100 dark:bg-purple-900 dark:hover:bg-purple-950">Obtener Todos los Datos</button>
                <button @click="signOut" class="bg-red-500 hover:bg-red-600 text-white p-3 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-700 dark:hover:bg-red-800">Cerrar Sesión</button>
                <button @click="deleteAllData" class="bg-orange-400 hover:bg-orange-600 text-white p-3 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:hover:bg-orange-800">Eliminar Todos los Datos</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.my-slider .p-slider-range) {
    background-color: #3498db !important;
}
:deep(.my-slider .p-slider-handle) {
    background-color: #3498db !important;
    border-color: #3498db !important;
}
</style>
