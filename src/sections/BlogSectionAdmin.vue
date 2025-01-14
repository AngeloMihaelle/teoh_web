<template>
    <section class="blog-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Gestión de Blog</h2>

            <!-- Error and Loading States -->
            <div v-if="loading" class="text-center">Cargando artículos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>

            <!-- Create Blog Entry Section -->
            <div class="mb-6 text-center">
                <button @click="showCreateForm = !showCreateForm" class="bg-blue-500 text-white py-2 px-4 rounded-md">
                    {{ showCreateForm ? 'Cancelar Crear' : 'Crear Nuevo Artículo' }}
                </button>
            </div>

            <!-- Blog Creation Form -->
            <div v-if="showCreateForm" class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4">Nuevo Artículo</h3>
                <form @submit.prevent="createBlog">
                    <div class="mb-4">
                        <label for="titulo" class="block">Título</label>
                        <input v-model="newBlog.titulo" type="text" id="titulo" class="w-full p-2 border rounded-md"
                            required />
                    </div>
                    <div class="mb-4">
                        <label for="contenido" class="block">Contenido</label>
                        <textarea v-model="newBlog.contenido" id="contenido" class="w-full p-2 border rounded-md"
                            rows="4" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="categoria" class="block">Categoría</label>
                        <input v-model="newBlog.categoria" type="text" id="categoria"
                            class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="etiquetas" class="block">Etiquetas</label>
                        <input v-model="newBlog.etiquetas" type="text" id="etiquetas"
                            class="w-full p-2 border rounded-md" />
                    </div>
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-md">Crear Artículo</button>
                </form>
            </div>

            <!-- Blog Articles List -->
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <article v-for="articulo in articulos" :key="articulo.id"
                    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
                    <h3 class="text-xl font-semibold mb-2">{{ articulo.titulo }}</h3>
                    <p class="text-gray-500 text-sm mb-4">Publicado el {{ formatFecha(articulo.fechaPublicacion) }}</p>
                    <p class="text-gray-700 mb-4">{{ articulo.contenido }}</p>
                    <p class="text-sm text-gray-500">Categoría: {{ articulo.categoria }}</p>
                    <p class="text-sm text-gray-500">Etiquetas: {{ articulo.etiquetas }}</p>

                    <!-- Delete Button (visible only to admins) -->
                    <button @click="deleteBlog(articulo.id)"
                        class="absolute top-2 right-2 bg-red-500 text-red p-2 rounded-full">
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
    name: "AdminBlogSection",
    data() {
        return {
            articulos: [],
            loading: true,
            error: null,
            showCreateForm: false, // Toggle for the blog creation form
            newBlog: {
                titulo: "",
                contenido: "",
                categoria: "",
                etiquetas: "",
            },
            corsProxy: "https://cors-anywhere.herokuapp.com/",
            apiUrlArticulos: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/articulos",
        };
    },
    methods: {
        // Fetch articles from the API
        async fetchArticulos() {
            try {
                const response = await axios.get(this.corsProxy + this.apiUrlArticulos);
                this.articulos = response.data;
            } catch (err) {
                this.error = "Error al cargar los artículos del blog.";
            } finally {
                this.loading = false;
            }
        },

        // Format date to display in a readable format
        formatFecha(fecha) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(fecha).toLocaleDateString("es-ES", options);
        },

        // Create a new blog post
        async createBlog() {
            try {
                const response = await axios.post(this.corsProxy + this.apiUrlArticulos, this.newBlog);
                this.articulos.push(response.data); // Add the new article to the list
                this.newBlog = { titulo: "", contenido: "", categoria: "", etiquetas: "" }; // Reset form
                this.showCreateForm = false; // Hide the create form
                alert("Artículo creado con éxito.");
            } catch (err) {
                this.error = "Error al crear el artículo.";
            }
        },

        // Delete an article by its ID
        async deleteBlog(id) {
            try {
                await axios.delete(this.corsProxy + this.apiUrlArticulos + "/" + id);
                this.articulos = this.articulos.filter(articulo => articulo.id !== id); // Remove the deleted article from the list
                alert("Artículo eliminado con éxito.");
            } catch (err) {
                this.error = "Error al eliminar el artículo.";
            }
        },
    },
    mounted() {
        this.fetchArticulos(); // Load articles when component is mounted
    },
};
</script>

<style scoped>
.blog-section {
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
