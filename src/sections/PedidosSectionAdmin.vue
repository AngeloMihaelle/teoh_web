<template>
    <section class="pedidos-section py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Gestión de Pedidos</h2>

            <!-- Error and Loading States -->
            <div v-if="loading" class="text-center">Cargando pedidos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>

            <!-- Pedidos List -->
            <ul v-if="!loading && !error" class="bg-white rounded-lg shadow-md p-6">
                <li v-for="pedido in pedidos" :key="pedido.id"
                    class="flex justify-between items-center border-b border-gray-200 py-4">
                    <div>
                        <p class="text-lg font-semibold">Pedido ID: {{ pedido.id }}</p>
                        <p class="text-gray-500 text-sm">Fecha: {{ pedido.fechaPedido }}</p>
                        <p class="text-gray-500 text-sm">Estado: {{ pedido.estadoPedido }}</p>
                        <p class="text-gray-500 text-sm">Total: ${{ pedido.totalPedido.toFixed(2) }}</p>
                        <p class="text-gray-500 text-sm">Detalles de Envío: {{ pedido.detallesEnvio }}</p>
                    </div>
                    <div class="flex gap-4">
                        <!-- Edit Estado Button -->
                        <select v-model="pedido.nuevoEstado" @change="updateEstado(pedido)"
                            class="border border-gray-300 rounded-md px-4 py-1">
                            <option value="EN_PROCESO">EN_PROCESO</option>
                            <option value="ENVIADO">ENVIADO</option>
                            <option value="ENTREGADO">ENTREGADO</option>
                        </select>

                        <!-- Delete Pedido Button -->
                        <button @click="deletePedido(pedido.id)" class="bg-red-500 text-white py-1 px-3 rounded-md">
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
    name: "AdminPedidosSection",
    data() {
        return {
            pedidos: [],
            loading: true,
            error: null,
            corsProxy: "https://cors-anywhere.herokuapp.com/",
            apiUrlPedidos: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net/api/pedidos",
        };
    },
    methods: {
        // Fetch all pedidos from the API
        async fetchPedidos() {
            try {
                const response = await axios.get(this.corsProxy + this.apiUrlPedidos);
                this.pedidos = response.data.map(pedido => ({
                    ...pedido,
                    nuevoEstado: pedido.estadoPedido, // Initialize the estado selector with current estado
                }));
            } catch (err) {
                this.error = "Error al cargar los pedidos.";
            } finally {
                this.loading = false;
            }
        },

        // Update the estado of a pedido
        async updateEstado(pedido) {
            try {
                const payload = {
                    id: pedido.id,
                    usuario: pedido.usuario,
                    fechaPedido: pedido.fechaPedido,
                    estadoPedido: pedido.nuevoEstado,
                    totalPedido: pedido.totalPedido,
                    detallesEnvio: pedido.detallesEnvio,
                };
                await axios.put(this.corsProxy + this.apiUrlPedidos + "/" + pedido.id, payload);
                alert(`Estado del pedido ${pedido.id} actualizado a ${pedido.nuevoEstado}.`);
            } catch (err) {
                console.error(err);
                this.error = "Error al actualizar el estado del pedido.";
            }
        },

        // Delete a pedido by ID
        async deletePedido(id) {
            try {
                await axios.delete(this.corsProxy + this.apiUrlPedidos + "/" + id);
                this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
                alert("Pedido eliminado con éxito.");
            } catch (err) {
                this.error = "Error al eliminar el pedido.";
            }
        },
    },
    mounted() {
        this.fetchPedidos();
    },
};
</script>

<style scoped>
.pedidos-section {
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
