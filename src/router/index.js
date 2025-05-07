import { createRouter, createWebHistory } from 'vue-router'
import { token } from '@/data/token';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignupView.vue'),
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/LogoutView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/messages',
            name: 'admin_messages',
            component: () => import('../views/AdminMessagesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/messages/:id',
            name: 'admin_messages_edit',
            component: () => import('../views/AdminEditMessagesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/rooms',
            name: 'admin_rooms',
            component: () => import('../views/AdminRoomsView.vue'),
            meta: { requiresAuth: true }
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        // This route requires authentication
        if (token.value != "") {
            // User has a token, proceed to the route
            next();
        } else {
            // User doesn't have a token, redirect to the login page
            next('/login');
        }
    } else {
        // This route does not require authentication, proceed
        next();
    }
})

export default router
