import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin/messages',
      name: 'admin_messages',
      component: () => import('../views/AdminMessagesView.vue'),
    },
    {
      path: '/admin/messages/:id',
      name: 'admin_messages_edit',
      component: () => import('../views/AdminEditMessagesView.vue'),
    },
    {
      path: '/admin/rooms',
      name: 'admin_rooms',
      component: () => import('../views/AdminRoomsView.vue'),
    },
  ],
})

export default router
