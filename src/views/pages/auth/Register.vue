<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const checked = ref(false);
const message = ref(null); // Variable para mostrar notificaciones

// URL base de la API
const baseUrl = 'http://localhost:3000/api/WriteData/';

// Expresiones regulares para validaciones
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Función para registrar al usuario
const registerUser = async () => {
    // Validamos que todos los campos tengan valor
    if (!name.value || !email.value || !password.value) {
        message.value = { type: 'error', text: 'Todos los campos son obligatorios.' };
        return;
    }
    // Validamos el formato del correo
    if (!emailRegex.test(email.value)) {
        message.value = { type: 'error', text: 'Ingrese un correo electrónico válido.' };
        return;
    }
    // Validamos la dificultad de la contraseña
    if (!passwordRegex.test(password.value)) {
        message.value = {
            type: 'error',
            text: 'La contraseña debe tener al menos 8 caracteres,\n incluir una letra mayúscula, una minúscula y un número.'
        };
        return;
    }
    if (password.value !== confirmPassword.value) {
        message.value = { type: 'error', text: 'Las contraseñas no coinciden.' };
        return;
    }
    if (!checked.value) {
        message.value = { type: 'error', text: 'Debes aceptar los términos y condiciones.' };
        return;
    }

    // Creamos el objeto a enviar
    const requestBody = {
        Name: name.value,
        Email: email.value,
        Password: password.value
    };

    try {
        const response = await fetch(`${baseUrl}register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            message.value = { type: 'error', text: `Error: ${errorData.Message}` };
            return;
        }

        const data = await response.json();
        message.value = { type: 'success', text: `Registro exitoso. Token: ${data.Token}` };
        // Aquí podrías redirigir al usuario o realizar alguna acción adicional
    } catch (error) {
        console.error('Error en la petición:', error);
        message.value = { type: 'error', text: 'Ha ocurrido un error en el registro.' };
    }
};
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

                    <!-- Mensaje de notificación -->
                    <div v-if="message" :class="{ 'text-green-600': message.type === 'success', 'text-red-600': message.type === 'error' }" class="mb-4 text-center">
                        {{ message.text }}
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
                                <!-- Enlace al PDF en carpeta public -->
                                <label for="terms">
                                    Acepto los
                                    <a href="/Privacidad.pdf" target="_blank" class="text-blue-500 underline"> términos y condiciones </a>
                                </label>
                            </div>
                        </div>
                        <!-- Se llama a la función registerUser al hacer click -->
                        <Button label="Registrarse" class="w-full !bg-blue-500" @click="registerUser"></Button>
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
