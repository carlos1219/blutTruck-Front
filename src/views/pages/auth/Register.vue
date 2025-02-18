<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const checked = ref(false);
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #3498db 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 !border-blue-500" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <img src="/demo/images/logo.png" class="h-24 mx-auto" />
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">¡Regístrate en BlutTruck!</div>
                        <span class="text-muted-color font-medium">Crea una cuenta para continuar</span>
                    </div>

                    <div>
                        <label for="name" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nombre</label>
                        <InputText id="name" type="text" placeholder="Nombre" class="w-full md:w-[30rem] mb-8" v-model="name" />

                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Correo electrónico</label>
                        <InputText id="email1" type="text" placeholder="Correo electrónico" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="password" placeholder="Contraseña" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <label for="confirmPassword" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Confirmar contraseña</label>
                        <Password id="confirmPassword" v-model="confirmPassword" placeholder="Confirmar contraseña" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="terms" binary class="mr-2"></Checkbox>
                                <label for="terms">Acepto los términos y condiciones</label>
                            </div>
                        </div>
                        <Button label="Registrarse" class="w-full !bg-blue-500" as="router-link" to="/"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
