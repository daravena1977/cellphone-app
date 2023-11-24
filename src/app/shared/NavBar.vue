<template>
  <div class="">
    <nav class="navbar bg-primary navbar-expand-lg">
  <div class="container d-flex align-items-end">
    <a class="navbar-brand" href="#"><span>CellApp</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Reparaciones</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Repuestos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Accesorios</a>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'setup'}" class="nav-link">Configuracion</router-link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

  </div>
</template>

<script>
export default {

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