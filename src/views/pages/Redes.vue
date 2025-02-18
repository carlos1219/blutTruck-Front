<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
    name: 'Monitoreo',
    components: {
        Dialog,
        Button
    },
    data() {
        return {
            dialogVisible: false,
            adminDialogVisible: false, // Nuevo diálogo para acción administrativa
            selectedPerson: {}, // Se almacenará el objeto completo de la persona
            // Lista de personas que te monitorean
            personasQueMeMonitorean: [
                { name: 'Carlos Gómez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: true },
                { name: 'María Rodríguez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: false },
                { name: 'Pedro Martínez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: true },
                { name: 'Laura Fernández', img: '/demo/images/monitoreo/mujer2.jpg', administrador: false },
                { name: 'Jorge Ramírez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: true },
                { name: 'Sofía Herrera', img: '/demo/images/monitoreo/hombre1.jpg', administrador: false }
            ],
            // Lista de personas que tú monitoreas
            personasQueMonitoreo: [
                { name: 'Carlos Gómez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: true, hasDialogButton: true },
                { name: 'María Rodríguez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: false, hasDialogButton: false },
                { name: 'Pedro Martínez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: true, hasDialogButton: true },
                { name: 'Laura Fernández', img: '/demo/images/monitoreo/hombre1.jpg', administrador: false, hasDialogButton: false },
                { name: 'Jorge Ramírez', img: '/demo/images/monitoreo/hombre1.jpg', administrador: true, hasDialogButton: true },
                { name: 'Sofía Herrera', img: '/demo/images/monitoreo/hombre1.jpg', administrador: false, hasDialogButton: false }
            ]
        };
    },
    computed: {
        // Esta propiedad computada devuelve "true" si la persona seleccionada es administradora
        isAdmin() {
            return !!(this.selectedPerson && this.selectedPerson.administrador);
        }
    },
    methods: {
        openDialog(person) {
            // Se recibe el objeto completo para poder acceder, por ejemplo, a person.name
            this.selectedPerson = person;
            this.dialogVisible = true;
        },
        confirmDelete(person) {
            console.log('Confirmar eliminación para', person);
        },
        deleteStats() {
            console.log('Eliminar estadísticas de', this.selectedPerson);
            this.dialogVisible = false;
        },
        closeStats() {
            this.dialogVisible = false;
        },
        openAdminDialog() {
            this.adminDialogVisible = true;
        }
    }
};
</script>

<template>
    <div class="min-h-screen flex flex-col dark:bg-surface-900 p-6">
        <!-- Contenedor centrado para las secciones de cards -->
        <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 justify-center items-start dark:bg-surface-900">
            <!-- Sección: Personas que me Monitorean -->
            <div class="flex-1 bg-white p-4 rounded-lg shadow dark:bg-surface-900">
                <h2 class="text-xl font-bold mb-4 text-center">Personas que me Monitorean</h2>
                <div class="space-y-4 dark:bg-surface-900">
                    <div v-for="(persona, index) in personasQueMeMonitorean" :key="'monitoring-me-' + index" class="bg-gray-50 mt-4 w-full sm:max-w dark:bg-surface-800 rounded-lg p-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <!-- Contenido del header -->
                        <div class="flex items-center w-full sm:w-auto">
                            <img :src="persona.img" :alt="'Foto de ' + persona.name" class="w-14 h-14 rounded-full" />
                            <span class="ml-4 self-center text-lg whitespace-nowrap">{{ persona.name }}</span>
                        </div>
                        <!-- Contenedor de botones responsivo -->
                        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <!-- Botón de Administrador -->
                            <button class="px-3 py-1 rounded flex items-center text-white w-full sm:w-auto" :class="persona.administrador ? 'bg-green-500' : 'bg-gray-500'">
                                <span v-if="persona.administrador">✔</span>
                                <span v-else>✖</span>
                                <span class="ml-2">Administrador</span>
                            </button>
                            <!-- Botón de eliminar -->
                            <button @click.stop="confirmDelete(persona)" class="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección: Personas que Monitoreo -->
            <div class="flex-1 bg-white p-4 rounded-lg shadow dark:bg-surface-900">
                <h2 class="text-xl font-bold mb-4 text-center">Personas que Monitoreo</h2>
                <div class="space-y-4">
                    <div
                        v-for="(persona, index) in personasQueMonitoreo"
                        :key="'monitoring-' + index"
                        class="bg-gray-50 mt-4 w-full sm:max-w dark:bg-surface-800 rounded-lg p-2 flex flex-col sm:flex-row items-center justify-between gap-2 cursor-pointer"
                        @click="openDialog(persona)"
                    >
                        <!-- Contenido del header -->
                        <div class="flex items-center w-full sm:w-auto">
                            <img :src="persona.img" :alt="'Foto de ' + persona.name" class="w-14 h-14 rounded-full" />
                            <span class="ml-4 self-center text-lg whitespace-nowrap">{{ persona.name }}</span>
                        </div>
                        <!-- Contenedor de botones responsivo -->
                        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <button @click.stop="confirmDelete(persona)" class="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Diálogo para mostrar los detalles (stats) -->
        <Dialog v-model:visible="dialogVisible" :header="'Detalles de ' + selectedPerson.name" modal dismissableMask class="w-11/12 md:w-3/4 lg:w-1/2">
            <!-- Ejemplo de métricas -->
            <div class="grid grid-cols-12 gap-4">
                <!-- Ejemplo: PASOS -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Pasos</span>
                                <div class="text-gray-900 font-medium text-xl">10,000</div>
                            </div>
                            <div class="flex items-center justify-center bg-blue-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-map text-blue-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Ejemplo: CALORÍAS ACTIVAS -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Calorías Activas</span>
                                <div class="text-gray-900 font-medium text-xl">500</div>
                            </div>
                            <div class="flex items-center justify-center bg-red-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <!-- Ícono de llama -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                    <path
                                        d="M9 4 L10.73 5.91 C10.74 5.93 12.18 7.59 11.95 9.54 C11.8 10.78 10.99 11.93 9.54 12.94 C5.31 15.81 4.02 19.68 5.78 23.43 C7.1 26.25 9.99 28 13.11 28 L14.93 28 L13.79 26.39 C12.88 25.21 12.9 23.87 13.12 22.87 C14.66 24.04 16.47 23.89 17.72 23.09 C18.87 22.36 19.69 21.04 19.71 19.46 C19.97 19.87 20.18 20.34 20.34 20.87 C20.78 22.4 20.72 24.74 19.12 26.28 L17.45 28 L19.03 28 C19.92 28 20.81 27.83 21.61 27.44 C24.1 26.2 25.78 23.95 26.66 20.69 C27.38 18.03 26.92 14.52 25.4 11.79 C21.86 5.44 12 4.3 11.58 4.25 L9 4 Z"
                                        fill="#FF4500"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FC PROMEDIO -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">FC Promedio</span>
                                <div class="text-gray-900 font-medium text-xl">90</div>
                            </div>
                            <div class="flex items-center justify-center bg-pink-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-heart text-pink-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FC MÍNIMA -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">FC Mínima</span>
                                <div class="text-gray-900 font-medium text-xl">60</div>
                            </div>
                            <div class="flex items-center justify-center bg-green-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-arrow-down text-green-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FC MÁXIMA -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">FC Máxima</span>
                                <div class="text-gray-900 font-medium text-xl">130</div>
                            </div>
                            <div class="flex items-center justify-center bg-yellow-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-arrow-up text-yellow-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FC en REPOSO -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">FC en Reposo</span>
                                <div class="text-gray-900 font-medium text-xl">60</div>
                            </div>
                            <div class="flex items-center justify-center bg-red-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <!-- Ícono SVG para FC en reposo -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                                    <g transform="translate(0,50) scale(0.1,-0.1)" fill="#FF4500">
                                        <path
                                            d="M25 388 c-2 -7 -6 -56 -10 -108 -3 -52 -8 -137 -11 -187 l-6 -93 35 0 c31 0 36 3 39 27 l3 28 175 0 175 0 3 -27 c3 -25 8 -28 39 -28 l35 0 -6 103 c-4 56 -10 145 -14 197 l-7 95 -223 3 c-173 2 -223 0 -227 -10z m435 -78 c0 -58 -3 -68 -15 -64 -9 4 -15 19 -15 35 0 41 -21 47 -180 47 -159 0 -180 -6 -180 -47 0 -16 -6 -31 -15 -35 -12 -4 -15 6 -15 64 l0 70 210 0 210 0 0 -70z m-236 -6 c29 -11 17 -24 -21 -24 -21 0 -55 -4 -75 -9 -33 -8 -38 -7 -38 9 0 10 6 21 13 23 18 8 103 8 121 1z m170 0 c9 -3 16 -14 16 -24 0 -16 -5 -17 -37 -9 -21 5 -55 9 -75 9 -37 0 -51 13 -25 23 18 8 103 8 121 1z m28 -68 c24 -11 40 -28 47 -48 21 -61 31 -58 -219 -58 -250 0 -240 -3 -220 57 20 56 80 73 240 69 85 -2 125 -7 152 -20z m58 -171 c0 -33 -4 -45 -15 -45 -8 0 -15 8 -15 18 0 38 -18 42 -200 42 -182 0 -200 -4 -200 -42 0 -10 -7 -18 -15 -18 -11 0 -15 12 -15 45 l0 45 230 0 230 0 0 -45z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PESO -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Peso</span>
                                <div class="text-gray-900 font-medium text-xl">82 kg</div>
                            </div>
                            <div class="flex items-center justify-center bg-indigo-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                                    <g transform="translate(0,50) scale(0.1,-0.1)" fill="#3F51B5">
                                        <path
                                            d="M103 391 c-3 -12 -15 -21 -32 -23 -22 -3 -26 -8 -29 -39 -2 -27 -9 -38 -23 -42 -27 -7 -27 -67 0 -74 14 -4 21 -15 23 -42 3 -31 7 -36 29 -39 17 -2 29 -11 32 -23 5 -17 12 -20 44 -17 l38 3 3 58 3 57 59 0 59 0 3 -57 3 -58 38 -3 c32 -3 39 0 44 17 3 12 15 21 32 23 22 3 26 8 29 39 2 27 9 38 23 42 27 7 27 67 0 74 -14 4 -21 15 -23 42 -3 31 -7 36 -29 39 -17 2 -29 11 -32 23 -5 17 -12 20 -44 17 l-38 -3 -3 -57 -3 -58 -59 0 -59 0 -3 58 -3 57 -38 3 c-32 3 -39 0 -44 -17z m67 -141 l0 -140 -25 0 -25 0 0 140 0 140 25 0 25 0 0 -140z m210 0 l0 -140 -25 0 -25 0 0 140 0 140 25 0 25 0 0 -140z m-280 0 c0 -93 -1 -100 -20 -100 -19 0 -20 7 -20 100 0 93 1 100 20 100 19 0 20 -7 20 -100z m340 0 c0 -93 -1 -100 -20 -100 -19 0 -20 7 -20 100 0 93 1 100 20 100 19 0 20 -7 20 -100z m-400 0 c0 -11 -4 -20 -10 -20 -5 0 -10 9 -10 20 0 11 5 20 10 20 6 0 10 -9 10 -20z m270 0 c0 -18 -7 -20 -60 -20 -53 0 -60 2 -60 20 0 18 7 20 60 20 53 0 60 -2 60 -20z m170 0 c0 -11 -4 -20 -10 -20 -5 0 -10 9 -10 20 0 11 5 20 10 20 6 0 10 -9 10 -20z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ALTURA -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Altura</span>
                                <div class="text-gray-900 font-medium text-xl">182 cm</div>
                            </div>
                            <div class="flex items-center justify-center bg-teal-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                                    <g transform="translate(0,50) scale(0.1,-0.1)" fill="#009688">
                                        <path d="M140 470 c0 -6 43 -10 110 -10 67 0 110 4 110 10 0 6 -43 10 -110 10 -67 0 -110 -4 -110 -10z" />
                                        <path
                                            d="M221 419 c-24 -32 -22 -50 4 -29 13 11 15 -5 15 -140 0 -135 -2 -151 -15 -140 -26 21 -28 3 -4 -29 13 -17 26 -31 29 -31 3 0 16 14 29 31 24 32 22 50 -4 29 -13 -11 -15 5 -15 140 0 135 2 151 15 140 26 -21 28 -3 4 29 -13 17 -26 31 -29 31 -3 0 -16 -14 -29 -31z"
                                        />
                                        <path d="M140 430 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 430 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 390 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 390 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 350 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 350 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 310 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 310 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 270 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 270 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 230 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 230 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 190 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 190 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 150 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 150 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 110 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 110 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 70 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M340 70 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                                        <path d="M140 30 c0 -6 43 -10 110 -10 67 0 110 4 110 10 0 6 -43 10 -110 10 -67 0 -110 -4 -110 -10z" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PRESIÓN SISTÓLICA -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Presión Sistólica</span>
                                <div class="text-gray-900 font-medium text-xl">120 mmHg</div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-arrow-up text-orange-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PRESIÓN DIASTÓLICA -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Presión Diastólica</span>
                                <div class="text-gray-900 font-medium text-xl">60 mmHg</div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-arrow-down text-orange-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SATURACIÓN DE OXÍGENO -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Saturación de Oxígeno</span>
                                <div class="text-gray-900 font-medium text-xl">99 %</div>
                            </div>
                            <div class="flex items-center justify-center bg-blue-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-cloud text-blue-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- GLUCOSA EN SANGRE -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Glucosa en Sangre</span>
                                <div class="text-gray-900 font-medium text-xl">12 mg/dL</div>
                            </div>
                            <div class="flex items-center justify-center bg-red-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" fill="#D1A4E2" stroke="none">
                                        <path
                                            d="M322 418 c-7 -7 -12 -20 -12 -29 0 -38 -10 -48 -35 -37 -61 28 -140 -25 -153 -103 -6 -37 -12 -45 -32 -47 -60 -9 -63 -36 -14 -104 30 -40 41 -49 63 -46 21 2 28 10 35 39 8 35 9 35 62 35 47 -1 57 3 85 30 20 21 32 44 36 71 5 36 9 41 42 49 48 12 51 35 10 93 -46 64 -62 74 -87 49z m58 -60 c23 -31 27 -44 18 -50 -18 -11 -56 -10 -63 1 -5 10 4 91 11 91 2 0 17 -19 34 -42z m-79 -57 c19 -19 29 -39 29 -58 l-1 -28 -22 27 c-62 76 -67 119 -6 59z m-38 -50 c34 -51 43 -71 34 -80 -21 -21 -34 -11 -80 58 -34 51 -43 71 -34 80 21 21 34 11 80 -58z m-50 -71 c23 -39 5 -39 -34 -1 -19 19 -29 39 -29 58 l1 28 22 -27 c12 -15 31 -41 40 -58z m-65 -13 c12 -14 -2 -87 -16 -87 -7 0 -62 74 -62 83 0 5 25 12 56 16 6 0 16 -5 22 -12z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TEMPERATURA -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Temperatura</span>
                                <div class="text-gray-900 font-medium text-xl">36 °C</div>
                            </div>
                            <div class="flex items-center justify-center bg-yellow-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                                    <g transform="translate(0,50) scale(0.1,-0.1)" fill="#FF9800">
                                        <path
                                            d="M207 482 c-14 -15 -17 -41 -17 -137 0 -116 -1 -120 -27 -148 -23 -23 -28 -37 -28 -77 0 -43 5 -54 33 -82 47 -48 117 -48 164 0 28 28 33 39 33 82 0 40 -5 54 -29 79 -28 30 -29 31 -8 31 12 0 22 5 22 10 0 6 -9 10 -20 10 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9 10 -20 10 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9 10 -20 10 -15 0 -20 7 -20 28 0 55 -68 83 -103 44z m67 -8 c10 -4 16 -18 16 -35 0 -27 -3 -29 -40 -29 -38 0 -40 2 -40 29 0 36 26 50 64 35z m16 -170 c0 -79 2 -89 25 -110 59 -54 36 -151 -40 -170 -101 -25 -167 99 -90 170 23 21 25 31 25 110 l0 86 40 0 40 0 0 -86z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FRECUENCIA RESPIRATORIA -->
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 p-3 bg-white rounded-lg shadow">
                        <div class="flex justify-between mb-4">
                            <div>
                                <span class="block text-gray-500 font-medium mb-1">Frecuencia Respiratoria</span>
                                <div class="text-gray-900 font-medium text-xl">40 rpm</div>
                            </div>
                            <div class="flex items-center justify-center bg-teal-100 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-sync text-teal-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <!-- Botón de Ajustes, visible solo si la persona seleccionada es admin -->
                <div v-if="isAdmin" class="col-span-12">
                    <button @click="openAdminDialog" class="p-button p-button-info">Ajustes</button>
                </div>
                <div class="w-full px-4 flex justify-center">
                    <button @click="deleteStats" class="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
                </div>
            </template>
        </Dialog>

        <!-- Diálogo de acción administrativa -->
        <Dialog v-model:visible="adminDialogVisible" header="Acción Administrativa" modal dismissableMask>
            <p>Eres admin</p>
            <div class="flex justify-end">
                <Button label="Cerrar" icon="pi pi-times" @click="adminDialogVisible = false" />
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
/* Estilos personalizados adicionales */
</style>
