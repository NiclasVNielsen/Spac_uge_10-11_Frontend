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
      path: '/admin/messages',
      name: 'admin_messages',
      component: () => import('../views/AdminMessagesView.vue'),
    },
    {
      path: '/admin/rooms',
      name: 'admin_rooms',
      component: () => import('../views/AdminRoomsView.vue'),
    },
  ],
})

export default router
