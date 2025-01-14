<template>
    <section class="usuarios-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Gestión de Usuarios</h2>

            <!-- Error and Loading States -->
            <div v-if="loading" class="text-center">Cargando usuarios...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>

            <!-- Usuarios List -->
            <ul v-if="!loading && !error" class="bg-white rounded-lg shadow-md p-6">
                <li v-for="usuario in usuarios" :key="usuario.id"
                    class="flex justify-between items-center border-b border-gray-200 py-4">
                    <div>
                        <p class="text-lg font-semibold">{{ usuario.nombre }}</p>
                        <p class="text-gray-500 text-sm">Correo: {{ usuario.correoElectronico }}</p>
                        <p class="text-gray-500 text-sm">Rol: {{ usuario.rol }}</p>
                    </div>
                    <div class="flex gap-4">
                        <!-- Edit Role Button -->
                        <select v-model="usuario.nuevoRol" @change="updateRol(usuario)"
                            class="border border-gray-300 rounded-md px-7 py-1 ">
                            <option value="CLIENTE">CLIENTE</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>

                        <!-- Delete User Button -->
                        <button @click="deleteUsuario(usuario.id)" class="bg-red-500 text-white py-1 px-3 rounded-md">
                            Eliminar
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "AdminUsuariosSection",
    data() {
        return {
            usuarios: [],
            loading: true,
            error: null,
            corsProxy: "https://cors-anywhere.herokuapp.com/",
            apiUrlUsuarios: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/usuarios",
        };
    },
    methods: {
        // Fetch all users from the API
        async fetchUsuarios() {
            try {
                const response = await axios.get(this.corsProxy + this.apiUrlUsuarios);
                this.usuarios = response.data.map(usuario => ({
                    ...usuario,
                    nuevoRol: usuario.rol, // Initialize the role selector with current role
                }));
            } catch (err) {
                this.error = "Error al cargar los usuarios.";
            } finally {
                this.loading = false;
            }
        },

        // Update the role of a user
        async updateRol(usuario) {
            try {
                const payload = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correoElectronico: usuario.correoElectronico,
                    contrasena: usuario.contrasena, // Include the current password
                    rol: usuario.nuevoRol,
                    historialCompras: usuario.historialCompras,
                    preferencias: usuario.preferencias,
                };
                await axios.put(this.corsProxy + this.apiUrlUsuarios + "/" + usuario.id, payload);
                alert(`Rol de ${usuario.nombre} actualizado a ${usuario.nuevoRol}.`);
            } catch (err) {
                console.error(err);
                this.error = "Error al actualizar el rol del usuario.";
            }
        },



        // Delete a user by ID
        async deleteUsuario(id) {
            try {
                await axios.delete(this.corsProxy + this.apiUrlUsuarios + "/" + id);
                this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
                alert("Usuario eliminado con éxito.");
            } catch (err) {
                this.error = "Error al eliminar el usuario.";
            }
        },
    },
    mounted() {
        this.fetchUsuarios();
    },
};
</script>

<style scoped>
.usuarios-section {
    background-color: #f9f9f9;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

button {
    transition: background-color 0.3s ease;
}

button:hover {
    opacity: 0.8;
}
</style>
