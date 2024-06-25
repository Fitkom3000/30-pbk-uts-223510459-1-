import { defineStore } from 'pinia'

export const useAlbumStore = defineStore('albums', {
  state: () => ({
    albums: [],
    photos: [],
    loading: false
  }),
  actions: {
    async fetchAlbums() {
      this.loading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums')
        this.albums = await response.json()
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
    }
  }
})
