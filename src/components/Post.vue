<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h2>Posts</h2>
    <select v-model="$parent.selectedUser" @change="$emit('fetchPosts')">
      <option value="null" disabled selected>Silahkan pilih user</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="loading">Loading....</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p class="center-text">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    selectedUser: Number,
    posts: Array,
    loading: Boolean
  }
}
</script>
