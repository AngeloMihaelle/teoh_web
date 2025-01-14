<template>
    <section class="blog-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Blog</h2>
            <div v-if="loading" class="text-center">Cargando artículos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <article v-for="articulo in articulos" :key="articulo.id"
                    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-2">{{ articulo.titulo }}</h3>
                    <p class="text-gray-500 text-sm mb-4">Publicado el {{ formatFecha(articulo.fechaPublicacion) }}</p>
                    <p class="text-gray-700 mb-4">{{ articulo.contenido }}</p>
                    <p class="text-sm text-gray-500">Categoría: {{ articulo.categoria }}</p>
                    <p class="text-sm text-gray-500">Etiquetas: {{ articulo.etiquetas }}</p>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "BlogSection",
    data() {
        return {
            articulos: [],
            loading: true,
            error: null,
        };
    },
    methods: {
        async fetchArticulos() {
            try {
                const response = await axios.get(
                    "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/articulos"
                );
                this.articulos = response.data;
            } catch (err) {
                console.error(err);
                this.error = "Error al cargar los artículos del blog.";
            } finally {
                this.loading = false;
            }
        },
        formatFecha(fecha) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(fecha).toLocaleDateString("es-ES", options);
        },
    },
    mounted() {
        this.fetchArticulos();
    },
};
</script>

<style scoped>
.blog-section {
    background-color: #f9f9f9;
}
</style>