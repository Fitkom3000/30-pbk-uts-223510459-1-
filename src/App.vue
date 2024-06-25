<template>
  <div id="app">
    <header>
      <nav>
        <ul style="display: flex">
          <li :class="{ 'active-todos': currentView === 'todos' }" @click="switchView('todos')">
            <router-link to="/todos">Todos</router-link>
          </li>
          <li :class="{ 'active-posts': currentView === 'posts' }" @click="switchView('posts')">
            <router-link to="/posts">Posts</router-link>
          </li>
          <li :class="{ 'active-albums': currentView === 'albums' }" @click="switchView('albums')">
            <router-link to="/albums">Albums</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <div class="container">
      <Todos
        v-if="currentView === 'todos'"
        :todos="todos"
        :newTodo="newTodo"
        :showCompleted="showCompleted"
        @addTodo="addTodo"
        @updateTodo="updateTodo"
        @removeTodo="removeTodo"
        @filterTodos="filterTodos"
        @confirmAction="confirmAction"
      />
      <Post
        v-else-if="currentView === 'posts'"
        :users="users"
        :selectedUser="selectedUser"
        :posts="posts"
        :loading="loading"
        @fetchPosts="fetchPosts"
      />
      <Albums v-else-if="currentView === 'albums'" :albums="albums" :loading="loading" />
      <AlbumPhotos
        v-else-if="currentView === 'albumPhotos'"
        :photos="photos"
        :loading="loading"
        @viewPhoto="viewPhoto"
      />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import Post from './components/Post.vue'
import Albums from './components/Albums.vue'
import AlbumPhotos from './components/AlbumPhotos.vue'

export default {
  data() {
    return {
      todos: [
        { text: 'Bismillah', completed: false },
        { text: 'UAS PBK', completed: false }
      ],
      newTodo: '',
      currentView: 'todos',
      showCompleted: false,
      users: [],
      selectedUser: null,
      posts: [],
      loading: false,
      albums: [],
      photos: []
    }
  },

  components: {
    Todos,
    Post,
    Albums,
    AlbumPhotos
  },

  mounted() {
    this.fetchUsers()
  },

  methods: {
    switchView(view) {
      this.currentView = view
      if (view === 'albums') {
        this.fetchAlbums()
      }
    },
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false })
        this.newTodo = ''
      }
    },
    updateTodo(index) {
      this.todos[index].completed = !this.todos[index].completed
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    filterTodos() {
      this.showCompleted = !this.showCompleted
    },
    async fetchUsers() {
      this.loading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        this.users = await response.json()
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        this.loading = false
      }
    },
    confirmAction(action, index = null) {
      let message = ''
      switch (action) {
        case 'Remove':
          message = 'Apakah Anda yakin ingin menghapus kegiatan ini?'
          break
        case 'Add':
          message = 'Apakah Anda yakin ingin menambah kegiatan ini?'
          break
        default:
          break
      }

      if (window.confirm(message)) {
        switch (action) {
          case 'Update':
            this.updateTodo(index)
            break
          case 'Remove':
            this.removeTodo(index)
            break
          case 'Filter':
            this.filterTodos()
            break
          default:
            break
        }
      }
    },
    async fetchPosts() {
      this.loading = true
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`
        )
        this.posts = await response.json()
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchAlbums() {
      this.loading = true
      console.log('Fetching albums...')
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums')
        this.albums = await response.json()
        console.log('Albums fetched:', this.albums)
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchPhotos(albumId) {
      this.loading = true
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        )
        this.photos = await response.json()
      } catch (error) {
        console.error('Error fetching photos:', error)
      } finally {
        this.loading = false
      }
    },
    viewPhoto(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style src="./Style.css"></style>
