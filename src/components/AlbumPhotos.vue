<template>
  <div>
    <h2>Albums</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="album in albums" :key="album.id">
          <strong>{{ album.title }}</strong>
          <ul>
            <li v-for="photo in album.photos" :key="photo.id">
              <img :src="photo.thumbnailUrl" :alt="photo.title" />
              <p>{{ photo.title }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albums: [],
      loading: true
    }
  },
  async mounted() {
    await this.fetchAlbums()
  },
  methods: {
    async fetchAlbums() {
      this.loading = true
      try {
        const albumResponse = await fetch('https://jsonplaceholder.typicode.com/albums')
        const albums = await albumResponse.json()
        for (const album of albums) {
          const photoResponse = await fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`
          )
          const photos = await photoResponse.json()
          album.photos = photos
        }
        this.albums = albums
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        this.loading = false
      }
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
}
</style>
