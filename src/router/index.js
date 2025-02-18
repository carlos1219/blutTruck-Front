import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/Redes', // Ruta para la nueva página
                    name: 'Redes',
                    component: () => import('@/views/pages/Redes.vue') // Importa el componente de la página Redes
                },
                {
                    path: '/Guardar_Datos', // Ruta para la nueva página
                    name: 'Guardar_Datos',
                    component: () => import('@/views/pages/Guardar_Datos.vue') // Importa el componente de la página Redes
                },
                {
                    path: '/Perfil', // Ruta para la nueva página
                    name: 'Perfil',
                    component: () => import('@/views/pages/Perfil.vue') // Importa el componente de la página Redes
                },
                {
                    path: '/Prediccion', // Ruta para la nueva página
                    name: 'Prediccion',
                    component: () => import('@/views/pages/Prediccion.vue') // Importa el componente de la página Redes
                },
                {
                    path: '/Quiz', // Ruta para la nueva página
                    name: 'Quiz',
                    component: () => import('@/views/pages/Quiz.vue') // Importa el componente de la página Redes
                },
                {
                    path: '/Aprende', // Ruta para la nueva página
                    name: 'Aprende',
                    component: () => import('@/views/pages/Aprende.vue') // Importa el componente de la página Redes
                }
            ]
        },
        {
            path: '/',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
