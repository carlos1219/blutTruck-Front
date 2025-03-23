<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '/stores/user.js';

const email = ref('');
const password = ref('');
const checked = ref(false);
const errorMessage = ref('');
const router = useRouter();

const baseUrl = 'http://localhost:3000';

// Lógica para cargar las credenciales directamente en el bloque setup
const storedEmail = localStorage.getItem('rememberMeEmail');
const storedPassword = localStorage.getItem('rememberMePassword');

if (storedEmail && storedPassword) {
    email.value = storedEmail;
    password.value = storedPassword;
    checked.value = true;
}

const loginUser = async () => {
    if (!email.value || !password.value) {
        errorMessage.value = 'Correo y contraseña son obligatorios.';
        return;
    }
    try {
        const loginResponse = await axios.post(`${baseUrl}/api/WriteData/login`, {
            Email: email.value,
            Password: password.value
        });
        const token = loginResponse.data.token;
        const userId = loginResponse.data.userId;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        if (checked.value) {
            localStorage.setItem('rememberMeEmail', email.value);
            localStorage.setItem('rememberMePassword', password.value);
        } else {
            localStorage.removeItem('rememberMeEmail');
            localStorage.removeItem('rememberMePassword');
        }

        const fullDataResponse = await axios.post(
            `${baseUrl}/api/ReadData/full`,
            {
                UserId: userId,
                IdToken: token
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        localStorage.setItem('fullUserData', JSON.stringify(fullDataResponse.data));

        const userStore = useUserStore();
        userStore.setUserData({ userId, ...fullDataResponse.data });

        router.push('/dashboard');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.Message) {
            errorMessage.value = error.response.data.Message;
        } else {
            errorMessage.value = 'Error al iniciar sesión.';
        }
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
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">¡Bienvenido a BlutTruck!</div>
                        <span class="text-muted-color font-medium">Inicia sesión para continuar</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"> Correo electrónico </label>
                        <InputText id="email1" type="text" placeholder="Correo electrónico" class="w-full md:w-[30rem] mb-8 focus:!border-blue-500" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"> Contraseña </label>
                        <InputText id="password1" type="password" v-model="password" placeholder="Contraseña" class="mb-4 focus:!border-blue-500 w-full" />

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <input type="checkbox" id="rememberme1" v-model="checked" class="mr-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-surface-700 dark:border-surface-600 dark:text-white" />
                                <label for="rememberme1">Recuérdame</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-blue-500"> ¿Has olvidado la contraseña? </span>
                        </div>
                        <Button label="Sign In" class="w-full !bg-blue-500" @click="loginUser"></Button>
                        <div v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</div>
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
