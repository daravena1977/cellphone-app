<template>
  <div class="container-fluid">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EventBus from '@/app/common/EventBus'


export default {
  methods: {
    ...mapActions('auth', ['logout']),
    logOut() {
      this.logout()
      this.$router.push('/login')
    }
  },
  mounted() {
    EventBus.on('logout', () => this.logOut())
  },
  beforeUnmount() {
    EventBus.remove('logout')
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}

span {
  color: #42b983;
}
</style>
