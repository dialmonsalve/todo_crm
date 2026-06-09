<template>
  <div class="min-h-screen bg-bar-black text-bar-off-white p-6">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-bar-gold">Bar Commander</h1>
      <p class="text-bar-gray">Gestiona tu bar como un profesional</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div v-for="(stat, idx) in stats" :key="idx" class="bg-bar-darker p-6 rounded-lg shadow-lg">
        <h3 class="text-bar-steel-light text-lg">{{ stat.label }}</h3>
        <p class="text-3xl font-bold text-bar-gold">{{ stat.value }}</p>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex border-b border-bar-steel">
        <button class="px-4 py-2"
          :class="activeTab === 'orders' ? 'text-bar-gold border-b-2 border-bar-gold' : 'text-bar-gray'"
          @click="setActiveTab('orders')">
          Órdenes
        </button>
        <button class="px-4 py-2"
          :class="activeTab === 'inventory' ? 'text-bar-gold border-b-2 border-bar-gold' : 'text-bar-gray'"
          @click="setActiveTab('inventory')">
          Inventario
        </button>
      </div>
    </div>

    <div class="bg-bar-darker p-6 rounded-lg shadow-lg">
      <table v-if="activeTab === 'orders'" class="w-full text-left">
        <thead>
          <tr class="border-b border-bar-steel">
            <th class="pb-2">Mesa</th>
            <th class="pb-2">Items</th>
            <th class="pb-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border-b border-bar-steel">
            <td class="py-3">{{ order.table }}</td>
            <td class="py-3">{{ order.items.join(', ') }}</td>
            <td class="py-3 font-semibold" :class="order.status === 'Pendiente'
              ? 'text-bar-amber'
              : order.status === 'Listo'
                ? 'text-bar-green'
                : 'text-bar-gray'">
              {{ order.status }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else-if="activeTab === 'inventory'">
        <p class="text-bar-gray">Aquí va la vista de inventario...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'orders' | 'inventory'>('orders')

interface Order { id: number, table: string, items: string[], status:string}


const orders:Order[] = [
  { id: 1, table: 'Mesa 1', items: ['Cerveza', 'Nachos'], status: 'Pendiente' },
  { id: 2, table: 'Mesa 3', items: ['Whisky', 'Hamburguesa'], status: 'Listo' },
  { id: 3, table: 'Barra', items: ['Cóctel'], status: 'Entregado' },
]

const stats = [
  { label: 'Órdenes Pendientes', value: 4 },
  { label: 'Mesas Activas', value: 8 },
  { label: 'Ventas Hoy', value: '$2,450' },
]

const setActiveTab = (tab: 'orders' | 'inventory') => {
  activeTab.value = tab
}
</script>
