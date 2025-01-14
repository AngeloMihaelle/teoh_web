<template>
    <div class="login-container">
        <div class="login-form">
            <h2 class="text-center text-2xl font-semibold mb-4">Iniciar sesión</h2>
            <div v-if="error" class="text-center text-red-500 mb-4">{{ error }}</div>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label for="correoElectronico" class="block">Correo Electrónico</label>
                    <input
                        v-model="email"
                        type="email"
                        id="correoElectronico"
                        placeholder="Introduce tu correo electrónico"
                        class="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="contrasena" class="block">Contraseña</label>
                    <input
                        v-model="password"
                        type="password"
                        id="contrasena"
                        placeholder="Introduce tu contraseña"
                        class="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-md">Iniciar sesión</button>
            </form>
            <div class="text-center mt-4">
                <button @click="showRegister" class="text-blue-500">¿No tienes cuenta? Regístrate aquí</button>
            </div>
        </div>

        <div v-if="isRegistering" class="register-form">
            <h2 class="text-center text-2xl font-semibold mb-4">Registro</h2>
            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label for="nombre" class="block">Nombre</label>
                    <input
                        v-model="newUser.nombre"
                        type="text"
                        id="nombre"
                        placeholder="Introduce tu nombre completo"
                        class="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="correo" class="block">Correo Electrónico</label>
                    <input
                        v-model="newUser.correoElectronico"
                        type="email"
                        id="correo"
                        placeholder="Introduce tu correo electrónico"
                        class="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block">Contraseña</label>
                    <input
                        v-model="newUser.contrasena"
                        type="password"
                        id="password"
                        placeholder="Introduce tu contraseña"
                        class="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-md">Registrar</button>
            </form>
            <div class="text-center mt-4">
                <button @click="cancelRegister" class="text-red-500">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    data() {
        return {
            email: "",
            password: "",
            error: null,
            isRegistering: false,
            newUser: {
                nombre: "",
                correoElectronico: "",
                contrasena: "",
                rol: "CLIENTE",
            },
            usuarios: [],
            corsProxy: "https://cors-anywhere.herokuapp.com/",
            apiUrlUsuarios: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/usuarios",
        };
    },
    methods: {
        // Fetch users from API with CORS proxy
        async fetchUsuarios() {
            try {
                const response = await axios.get(this.corsProxy + this.apiUrlUsuarios);
                this.usuarios = response.data;
            } catch (err) {
                this.error = "Error al cargar los usuarios.";
            }
        },

        // Handle login with CORS proxy
        handleLogin() {
            const user = this.usuarios.find(
                (user) => user.correoElectronico === this.email && user.contrasena === this.password
            );
            if (user) {
                this.$router.push({ name: "Tienda" }); // Redirect to the store
            } else {
                this.error = "Credenciales incorrectas.";
            }
        },

        showRegister() {
            this.isRegistering = true;
        },

        // Register a new user with CORS proxy
        async handleRegister() {
            try {
                const response = await axios.post(
                    this.corsProxy + this.apiUrlUsuarios,
                    this.newUser
                );
                alert("Usuario registrado con éxito.");
                this.isRegistering = false;
            } catch (err) {
                this.error = "Error al registrar el usuario.";
            }
        },

        cancelRegister() {
            this.isRegistering = false;
        },
    },

    created() {
        this.fetchUsuarios(); // Load users on component creation
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
    transition: background-color 0.3s ease;
}

button:hover {
    opacity: 0.8;
}
</style>
