<script>
import Dialog from 'primevue/dialog';

export default {
    name: 'Monitoreo',
    components: {
        Dialog
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

        <Dialog v-model:visible="dialogVisible" :header="'Detalles de ' + selectedPerson.name" modal dismissableMask class="w-11/12 md:w-3/4 lg:w-1/2">
            <div class="grid grid-cols-12 gap-8">
                <StatsWidget />
            </div>
            <template #footer>
                <div class="w-full flex justify-between px-4">
                    <!-- Botón Eliminar abajo a la izquierda -->
                    <button @click="deleteStats" class="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
                    <!-- Botón de Ajustes abajo a la derecha, visible solo si la persona seleccionada es admin -->
                    <div v-if="isAdmin">
                        <button @click="openAdminDialog" class="p-button p-button-info">Ajustes</button>
                    </div>
                </div>
            </template>
        </Dialog>

        <!-- Diálogo de acción administrativa -->
        <Dialog v-model:visible="adminDialogVisible" modal dismissableMask>
            <ProfileCard />
        </Dialog>
    </div>
</template>

<style scoped>
/* Estilos personalizados adicionales */
</style>
