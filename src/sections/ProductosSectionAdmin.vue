<template>
    <section class="productos-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Gestión de Productos</h2>

            <!-- Error and Loading States -->
            <div v-if="loading" class="text-center">Cargando productos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>

            <!-- Productos List -->
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <article
                    v-for="producto in productos"
                    :key="producto.id"
                    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
                >
                    <img
                        :src="getImage(producto.imagen)"
                        :alt="producto.nombre"
                        class="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 class="text-xl font-semibold mb-2">{{ producto.nombre }}</h3>
                    <p class="text-gray-500 text-sm mb-4">Categoría: {{ producto.categoria }}</p>
                    <p class="text-gray-500 text-sm mb-4">Precio: ${{ producto.precio.toFixed(2) }}</p>
                    <p class="text-gray-500 text-sm mb-4">Stock: {{ producto.stock }}</p>
                    <p class="text-gray-500 text-sm mb-4">Valoración: {{ producto.valoracion }}</p>
                    <p class="text-gray-700 mb-4">{{ producto.descripcion }}</p>

                    <!-- Edit Button -->
                    <button @click="editProducto(producto)" class="bg-blue-500 text-white py-2 px-4 rounded-md mb-2">
                        Editar
                    </button>

                    <!-- Delete Button -->
                    <button @click="deleteProducto(producto.id)" class="bg-red-500 text-white py-2 px-4 rounded-md">
                        Eliminar
                    </button>
                </article>
            </div>

            <!-- Edit Product Form -->
            <div v-if="editingProducto" class="bg-white p-6 rounded-lg shadow-md mt-8">
                <h3 class="text-2xl font-semibold mb-4">Editar Producto</h3>
                <form @submit.prevent="updateProducto">
                    <div class="mb-4">
                        <label for="nombre" class="block">Nombre</label>
                        <input v-model="currentProducto.nombre" type="text" id="nombre" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="descripcion" class="block">Descripción</label>
                        <textarea v-model="currentProducto.descripcion" id="descripcion" class="w-full p-2 border rounded-md" rows="4" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="categoria" class="block">Categoría</label>
                        <input v-model="currentProducto.categoria" type="text" id="categoria" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="precio" class="block">Precio</label>
                        <input v-model.number="currentProducto.precio" type="number" id="precio" step="0.01" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="stock" class="block">Stock</label>
                        <input v-model.number="currentProducto.stock" type="number" id="stock" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="imagen" class="block">Imagen (URL)</label>
                        <input v-model="currentProducto.imagen" type="url" id="imagen" class="w-full p-2 border rounded-md" />
                    </div>
                    <div class="mb-4">
                        <label for="valoracion" class="block">Valoración</label>
                        <input v-model.number="currentProducto.valoracion" type="number" id="valoracion" step="0.1" class="w-full p-2 border rounded-md" />
                    </div>
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-md">Guardar Cambios</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "AdminProductosSection",
    data() {
        return {
            productos: [],
            loading: true,
            error: null,
            editingProducto: false,
            currentProducto: null, // The product being edited
            corsProxy: "https://cors-anywhere.herokuapp.com/",
            apiUrlProductos: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/productos",
        };
    },
    methods: {
        // Fetch all products from the API
        async fetchProductos() {
            try {
                const response = await axios.get(this.corsProxy + this.apiUrlProductos);
                this.productos = response.data;
            } catch (err) {
                this.error = "Error al cargar los productos.";
            } finally {
                this.loading = false;
            }
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

        // Edit product
        editProducto(producto) {
            this.currentProducto = { ...producto }; // Clone the product to avoid direct mutation
            this.editingProducto = true;
        },

        // Update the product
        async updateProducto() {
            try {
                await axios.put(this.corsProxy + this.apiUrlProductos + "/" + this.currentProducto.id, this.currentProducto);
                this.productos = this.productos.map(producto =>
                    producto.id === this.currentProducto.id ? { ...this.currentProducto } : producto
                );
                this.editingProducto = false;
                this.currentProducto = null;
                alert("Producto actualizado con éxito.");
            } catch (err) {
                this.error = "Error al actualizar el producto.";
            }
        },

        // Delete a product by ID
        async deleteProducto(id) {
            try {
                await axios.delete(this.corsProxy + this.apiUrlProductos + "/" + id);
                this.productos = this.productos.filter(producto => producto.id !== id);
                alert("Producto eliminado con éxito.");
            } catch (err) {
                this.error = "Error al eliminar el producto.";
            }
        },
    },
    mounted() {
        this.fetchProductos();
    },
};
</script>

<style scoped>
.productos-section {
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
