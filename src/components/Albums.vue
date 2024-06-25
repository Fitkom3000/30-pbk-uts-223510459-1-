<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h2>Albums</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="!selectedUser">
        <h5>Silahkan Pilih User</h5>
        <select v-model="selectedUser" @change="fetchAlbums">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div v-else>
        <h5>Silahkan Pilih Album</h5>
        <ul>
          <li v-for="album in albums" :key="album.id" @click="selectAlbum(album)">
            {{ album.title }}
          </li>
        </ul>
        <div v-if="selectedAlbum">
          <h3>Foto di dalam Album: {{ selectedAlbum.title }}</h3>
          <ul>
            <li v-for="photo in selectedAlbum.photos" :key="photo.id" @click="enlargePhoto(photo)">
              <img :src="photo.thumbnailUrl" :alt="photo.title" />
              <p>{{ photo.title }}</p>
            </li>
          </ul>
        </div>
        <div v-if="enlargedPhoto">
          <div class="modal">
            <span class="close" @click="closeEnlargedPhoto">&times;</span>
            <img class="modal-content" :src="enlargedPhoto.url" />
            <div class="caption">{{ enlargedPhoto.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      albums: [],
      selectedAlbum: null,
      enlargedPhoto: null,
      loading: false
    }
  },
  async mounted() {
    await this.fetchUsers()
  },
  methods: {
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
    async fetchAlbums() {
      this.loading = true
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${this.selectedUser}`
        )
        const albums = await response.json()
        this.albums = await Promise.all(
          albums.map(async (album) => {
            const photoResponse = await fetch(
              `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`
            )
            const photos = await photoResponse.json()
            return { ...album, photos }
          })
        )
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        this.loading = false
      }
    },
    selectAlbum(album) {
      this.selectedAlbum = album
    },
    enlargePhoto(photo) {
      this.enlargedPhoto = photo
    },
    closeEnlargedPhoto() {
      this.enlargedPhoto = null
    }
  }
}
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  cursor: pointer;
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
}
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}
.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
.caption {
  text-align: center;
  color: #ccc;
  padding: 10px 20px;
  height: 150px;
}
</style>
