<template>
    <section class="casos-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Gestión de Casos</h2>

            <!-- Error and Loading States -->
            <div v-if="loading" class="text-center">Cargando casos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>

            <!-- Create Caso Section -->
            <div class="mb-6 text-center">
                <button @click="showCreateForm = !showCreateForm" class="bg-blue-500 text-white py-2 px-4 rounded-md">
                    {{ showCreateForm ? 'Cancelar Crear' : 'Crear Nuevo Caso' }}
                </button>
            </div>

            <!-- Caso Creation Form -->
            <div v-if="showCreateForm" class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4">Nuevo Caso</h3>
                <form @submit.prevent="createCaso">
                    <div class="mb-4">
                        <label for="titulo" class="block">Título</label>
                        <input v-model="newCaso.titulo" type="text" id="titulo" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="descripcion" class="block">Descripción</label>
                        <textarea v-model="newCaso.descripcion" id="descripcion" class="w-full p-2 border rounded-md" rows="4" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="fecha" class="block">Fecha</label>
                        <input v-model="newCaso.fecha" type="date" id="fecha" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="imagenes" class="block">Imagen (URL)</label>
                        <input v-model="newCaso.imagenes" type="url" id="imagenes" class="w-full p-2 border rounded-md" />
                    </div>
                    <div class="mb-4">
                        <label for="testimonio" class="block">Testimonio</label>
                        <textarea v-model="newCaso.testimonio" id="testimonio" class="w-full p-2 border rounded-md" rows="3"></textarea>
                    </div>
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-md">Crear Caso</button>
                </form>
            </div>

            <!-- Casos List -->
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <article
                    v-for="caso in casos"
                    :key="caso.id"
                    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
                >
                    <img
                        :src="getImage(caso.imagenes)"
                        :alt="caso.titulo"
                        class="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 class="text-xl font-semibold mb-2">{{ caso.titulo }}</h3>
                    <p class="text-gray-500 text-sm mb-4">Fecha: {{ formatFecha(caso.fecha) }}</p>
                    <p class="text-gray-700 mb-4">{{ caso.descripcion }}</p>
                    <p class="text-sm italic text-gray-500">Testimonio: "{{ caso.testimonio }}"</p>

                    <!-- Delete Button -->
                    <button @click="deleteCaso(caso.id)" class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full">
                        Eliminar
                    </button>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "AdminCasosSection",
    data() {
        return {
            casos: [],
            loading: true,
            error: null,
            showCreateForm: false, // Toggle for the creation form
            newCaso: {
                titulo: "",
                descripcion: "",
                fecha: "",
                imagenes: "",
                testimonio: "",
            },
            corsProxy: "https://cors-anywhere.herokuapp.com/",
            apiUrlCasos: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/casos",
        };
    },
    methods: {
        // Fetch all cases from the API
        async fetchCasos() {
            try {
                const response = await axios.get(this.corsProxy + this.apiUrlCasos);
                this.casos = response.data;
            } catch (err) {
                this.error = "Error al cargar los casos.";
            } finally {
                this.loading = false;
            }
        },

        // Format date for display
        formatFecha(fecha) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(fecha).toLocaleDateString("es-ES", options);
        },

        // Get image URL or placeholder
        getImage(imagen) {
            const placeholder = "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg";
            try {
                const url = new URL(imagen);
                return url.href;
            } catch {
                return placeholder;
            }
        },

        // Create a new case
        async createCaso() {
            try {
                const response = await axios.post(this.corsProxy + this.apiUrlCasos, this.newCaso);
                this.casos.push(response.data); // Add the new case to the list
                this.newCaso = { titulo: "", descripcion: "", fecha: "", imagenes: "", testimonio: "" }; // Reset form
                this.showCreateForm = false;
                alert("Caso creado con éxito.");
            } catch (err) {
                this.error = "Error al crear el caso.";
            }
        },

        // Delete a case by ID
        async deleteCaso(id) {
            try {
                await axios.delete(this.corsProxy + this.apiUrlCasos + "/" + id);
                this.casos = this.casos.filter(caso => caso.id !== id); // Remove deleted case
                alert("Caso eliminado con éxito.");
            } catch (err) {
                this.error = "Error al eliminar el caso.";
            }
        },
    },
    mounted() {
        this.fetchCasos();
    },
};
</script>

<style scoped>
.casos-section {
    background-color: #f9f9f9;
}

button {
    transition: background-color 0.3s ease;
}

button:hover {
    opacity: 0.8;
}

.relative {
    position: relative;
}
</style>
