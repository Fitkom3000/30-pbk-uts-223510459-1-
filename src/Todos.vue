<template>
    <div>
      <h2>Todos</h2>
      <form @submit.prevent="$emit('addTodo')">
        <input type="text" v-model="$parent.newTodo" placeholder="Tambah kegiatan baru" required>
        <button @click="$emit('confirmAction', 'Add')" type="submit">Tambah</button>
      </form>
      <div v-for="(todo, index) in filteredTodos" :key="index">
        <input type="checkbox" v-model="todo.completed" @click="$emit('updateTodo', index)">
        <span :class="{ 'completed': todo.completed }">{{ todo.text }}</span>
        <button @click="$emit('confirmAction', 'Remove', index)">Remove</button>
      </div>
      <button @click="$emit('filterTodos')">{{ $parent.showCompleted ? 'Filter Belum Selesai' : 'Tampilkan Semua' }}</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todos: Array,
      newTodo: String,
      showCompleted: Boolean
    },
  
    computed: {
      filteredTodos() {
        if (this.showCompleted) {
          return this.todos;
        } else {
          return this.todos.filter(todo => !todo.completed);
        }
      }
    }
  };
  </script>
  