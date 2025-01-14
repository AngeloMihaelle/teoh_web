<template>
    <section class="casos-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Casos</h2>
            <p class="text-center">
                En esta sección se presentan imágenes de casos reales que pueden ser de alto impacto. Se recomienda discreción.
            </p>
            <div v-if="loading" class="text-center">Cargando casos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <article
                    v-for="caso in casos"
                    :key="caso.id"
                    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
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
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "CasosSection",
    data() {
        return {
            casos: [], // Cambiado el nombre de la variable para reflejar el contenido
            loading: true,
            error: null,
        };
    },
    methods: {
        async fetchCasos() {
            try {
                const response = await axios.get(
                    "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/casos" // URL actualizada
                );
                this.casos = response.data;
            } catch (err) {
                console.error(err);
                this.error = "Error al cargar los casos.";
            } finally {
                this.loading = false;
            }
        },
        formatFecha(fecha) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(fecha).toLocaleDateString("es-ES", options);
        },
        getImage(imagen) {
            const placeholder = "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg";
            // Validar si la URL es válida y no está vacía
            try {
                const url = new URL(imagen);
                return url.href; // Si es válida, devolver la URL
            } catch {
                return placeholder; // Si no, usar la imagen de marcador de posición
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
p {
    margin-bottom: 1rem;
    text-align: center;
}
img {
    object-fit: cover;
    border-radius: 0.5rem;
}
</style>
