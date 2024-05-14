<template>
  <div id="app">
    <header>
      <nav>
        <ul style="display: flex;">
          <li :class="{ 'active-todos': currentView === 'todos' }" @click="switchView('todos')">Todos</li>
          <li :class="{ 'active-posts': currentView === 'posts' }" @click="switchView('posts')">Post</li>
        </ul>
      </nav>
    </header>

    <div class="container">
      <Todos v-if="currentView === 'todos'" :todos="todos" :newTodo="newTodo" :showCompleted="showCompleted" @addTodo="addTodo" @updateTodo="updateTodo" @removeTodo="removeTodo" @filterTodos="filterTodos" @confirmAction="confirmAction" />
      <Post v-else-if="currentView === 'posts'" :users="users" :selectedUser="selectedUser" :posts="posts" :loading="loading" @fetchPosts="fetchPosts" />
    </div>
  </div>
</template>

<script>
import Todos from './Todos.vue';
import Post from './Post.vue';

export default {
  data() {
    return {
      todos: [
        { text: 'Susah banget', completed: false },
        { text: 'Woila', completed: false }
      ],
      newTodo: '',
      currentView: 'todos',
      showCompleted: false,
      users: [],
      selectedUser: null,
      posts: [],
      loading: false
    };
  },

  components: {
    Todos,
    Post
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    switchView(view) {
      this.currentView = view;
    },
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    updateTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    filterTodos() {
      this.showCompleted = !this.showCompleted;
    },
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },
    confirmAction(action, index = null) {
      let message = '';
      switch (action) {
        case 'Remove':
          message = `Apakah Anda yakin ingin menghapus kegiatan ini?`;
          break;
        case 'Add':
          message = `Apakah Anda yakin ingin menambah kegiatan ini?`;
          break;
        default:
          break;
      }

      if (window.confirm(message)) {
        switch (action) {
          case 'Update':
            this.updateTodo(index);
            break;
          case 'Remove':
            this.removeTodo(index);
            break;
          case 'Filter':
            this.filterTodos();
            break;
          default:
            break;
        }
      }
    },
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.posts = await response.json();
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style src="./Style.css"></style>
