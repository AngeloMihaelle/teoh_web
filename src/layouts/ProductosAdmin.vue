<template>
    <section class="productos-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Gestión de Productos</h2>

            <!-- Error and Loading States -->
            <div v-if="loading" class="text-center">Cargando productos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>

            <!-- Create Producto Section -->
            <div class="mb-6 text-center">
                <button @click="showCreateForm = !showCreateForm" class="bg-blue-500 text-white py-2 px-4 rounded-md">
                    {{ showCreateForm ? 'Cancelar Crear' : 'Crear Nuevo Producto' }}
                </button>
            </div>

            <!-- Producto Creation Form -->
            <div v-if="showCreateForm" class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4">Nuevo Producto</h3>
                <form @submit.prevent="createProducto">
                    <div class="mb-4">
                        <label for="nombre" class="block">Nombre</label>
                        <input v-model="newProducto.nombre" type="text" id="nombre" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="descripcion" class="block">Descripción</label>
                        <textarea v-model="newProducto.descripcion" id="descripcion" class="w-full p-2 border rounded-md" rows="4" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="categoria" class="block">Categoría</label>
                        <input v-model="newProducto.categoria" type="text" id="categoria" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="precio" class="block">Precio</label>
                        <input v-model="newProducto.precio" type="number" step="0.01" id="precio" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="stock" class="block">Stock</label>
                        <input v-model="newProducto.stock" type="number" id="stock" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="imagen" class="block">Imagen (URL)</label>
                        <input v-model="newProducto.imagen" type="url" id="imagen" class="w-full p-2 border rounded-md" />
                    </div>
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-md">Crear Producto</button>
                </form>
            </div>

            <!-- Productos List -->
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <article
                    v-for="producto in productos"
                    :key="producto.id"
                    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
                >
                    <img
                        :src="producto.imagen || placeholderImage"
                        :alt="producto.nombre"
                        class="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 class="text-xl font-semibold mb-2">{{ producto.nombre }}</h3>
                    <p class="text-gray-700 mb-2">{{ producto.descripcion }}</p>
                    <p class="text-gray-500 text-sm mb-2">Categoría: {{ producto.categoria }}</p>
                    <p class="text-gray-500 text-sm mb-2">Precio: ${{ producto.precio.toFixed(2) }}</p>
                    <p class="text-gray-500 text-sm mb-2">Stock: {{ producto.stock }}</p>
                    <div class="flex justify-between items-center">
                        <!-- Edit Button -->
                        <button @click="editProducto(producto)" class="bg-yellow-500 text-white py-1 px-3 rounded-md">
                            Editar
                        </button>
                        <!-- Delete Button -->
                        <button @click="deleteProducto(producto.id)" class="bg-red-500 text-white py-1 px-3 rounded-md">
                            Eliminar
                        </button>
                    </div>
                </article>
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
            showCreateForm: false,
            newProducto: {
                nombre: "",
                descripcion: "",
                categoria: "",
                precio: 0,
                stock: 0,
                imagen: "",
            },
            placeholderImage: "https://via.placeholder.com/150", // Fallback image
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

        // Create a new product
        async createProducto() {
            try {
                const response = await axios.post(this.corsProxy + this.apiUrlProductos, this.newProducto);
                this.productos.push(response.data);
                this.newProducto = { nombre: "", descripcion: "", categoria: "", precio: 0, stock: 0, imagen: "" }; // Reset form
                this.showCreateForm = false;
                alert("Producto creado con éxito.");
            } catch (err) {
                this.error = "Error al crear el producto.";
            }
        },

        // Edit an existing product
        async editProducto(producto) {
            try {
                const updatedProducto = { ...producto }; // Clone to prevent accidental modifications
                const response = await axios.put(this.corsProxy + this.apiUrlProductos + "/" + producto.id, updatedProducto);
                const index = this.productos.findIndex(p => p.id === producto.id);
                if (index !== -1) {
                    this.productos[index] = response.data; // Update the product in the local list
                }
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
