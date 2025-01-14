import { createRouter, createWebHistory } from 'vue-router';
import Main from '../layouts/Main.vue' // Replace with your actual component paths
import Blog from '../layouts/Blog.vue'; // Blog component
import Casos from '../layouts/Casos.vue'; // Casos component
import Tienda from '../layouts/Tienda.vue';
import Login from '../layouts/Login.vue'; // Login component
import MainAdmin from '../layouts/Main_admin.vue'; // MainAdmin component
import LoginAdmin from '../layouts/LoginAdmin.vue'; // LoginAdmin component
import BlogAdmin from '../layouts/BlogAdmin.vue'; // BlogAdmin component
import CasosAdmin from '../layouts/CasosAdmin.vue';
import UsuariosAdmin from '../layouts/UsuariosAdmin.vue';
import PedidosAdmin from '../layouts/PedidosAdmin.vue';
import ProductosAdmin from '../layouts/ProductosAdmin.vue';
const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/admin',
        name: 'LoginAdmin',
        component: LoginAdmin,
    },
    {
        path: '/admin/main',
        name: 'MainAdmin',
        component: MainAdmin,
    },
    {
        path: '/admin/blog',
        name: 'BlogAdmin',
        component: BlogAdmin,
    },
    {
        path: '/admin/pedidos',
        name: 'PedidosAdmin',
        component: PedidosAdmin,
    },
    {
        path: '/admin/usuarios',
        name: 'UsuariosAdmin',
        component: UsuariosAdmin,
    },
    {
        path: '/admin/casos',
        name: 'CasosAdmin',
        component: CasosAdmin,
    },
    {
        path: '/admin/productos',
        name: 'ProductosAdmin',
        component: ProductosAdmin,

    },

    {
        path: '/blog',
        name: 'Blog',
        component: Blog,
    },
    {
        path: '/casos',
        name: 'Casos',
        component: Casos,
    },
    {
        path: '/tienda',
        name: 'Tienda',
        component: Tienda,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
];

const router = createRouter({
    history: createWebHistory(), // Ensure history mode is used
    routes
  });

export default router;