<template>
    <section class="tienda-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Tienda</h2>
            <p class="text-center mb-8">Explora nuestros productos y agrégalos al carrito para hacer tu pedido.</p>
            <div v-if="loading" class="text-center">Cargando productos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <article
                    v-for="producto in productos"
                    :key="producto.id"
                    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    @click="addToCart(producto)"
                >
                    <img
                        :src="getImage(producto.imagen)"
                        :alt="producto.nombre"
                        class="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 class="text-xl font-semibold mb-2">{{ producto.nombre }}</h3>
                    <p class="text-gray-500 text-sm mb-4">{{ producto.descripcion }}</p>
                    <p class="text-gray-700 font-semibold mb-4">${{ producto.precio.toFixed(2) }}</p>
                    <p class="text-sm italic text-gray-500">Valoración: {{ producto.valoracion }} ★</p>
                </article>
            </div>
            <div v-if="cartTotal > 0" class="text-center mt-6">
                <p class="text-lg font-semibold">Total: ${{ cartTotal.toFixed(2) }}</p>
                <button @click="finalizeOrder" class="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Finalizar Pedido</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "TiendaSection",
    data() {
        return {
            productos: [],
            loading: true,
            error: null,
            cart: [],
            cartTotal: 0,
            corsProxy: "https://cors-anywhere.herokuapp.com/",
            apiUrlProductos: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/productos",
            apiUrlPedidos: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/pedidos"
        };
    },
    methods: {
        // Obtener la lista de productos desde la API
        async fetchProductos() {
            try {
                const response = await axios.get(this.corsProxy + this.apiUrlProductos);
                this.productos = response.data;
            } catch (err) {
                console.error(err);
                this.error = "Error al cargar los productos.";
            } finally {
                this.loading = false;
            }
        },

        // Función para agregar un producto al carrito
        addToCart(producto) {
            this.cart.push(producto);
            this.cartTotal += producto.precio;
        },

        // Finalizar pedido y hacer el POST a la API
        async finalizeOrder() {
            const order = {
                usuario: null, // El usuario se puede asignar aquí si es necesario
                fechaPedido: new Date().toISOString().split("T")[0], // Formato de fecha YYYY-MM-DD
                estadoPedido: "ENVIADO",
                totalPedido: this.cartTotal,
                detallesEnvio: "Dirección de envío 2", // Aquí puedes agregar un formulario para capturar la dirección
            };

            try {
                await axios.post(this.corsProxy + this.apiUrlPedidos, order);
                alert("Pedido realizado con éxito.");
                this.cart = [];
                this.cartTotal = 0;
            } catch (err) {
                console.error(err);
                this.error = "Error al realizar el pedido.";
            }
        },

        // Método para obtener la imagen del producto (validación de URL)
        getImage(imagen) {
            const placeholder = "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg";
            try {
                const url = new URL(imagen);
                return url.href;
            } catch {
                return placeholder;
            }
        },
    },
    mounted() {
        this.fetchProductos(); // Cargar los productos al montar el componente
    },
};
</script>

<style scoped>
.tienda-section {
    background-color: #f9f9f9;
}

article {
    cursor: pointer;
}

button {
    transition: background-color 0.3s ease;
}

button:hover {
    opacity: 0.8;
}

p {
    margin-bottom: 1rem;
    text-align: center;
}

img {
    object-fit: cover;
    border-radius: 0.5rem;
}

button {
    padding: 1rem;
    border-radius: 0.375rem;
}
</style>
