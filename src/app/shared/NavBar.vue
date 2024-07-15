<template>
  <div class="container-navbar">
    <nav class="navbar bg-primary navbar-expand-lg">
  <div class="container-fluid d-flex align-items-end">
    <a class="navbar-brand" href="#"><span>CellApp</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'repair-module'}" class="nav-link">Reparaciones</router-link>
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
        <li class="nav-item logout">
          <router-link :to="{name: 'login'}" class="nav-link">Cerrar sesión</router-link>
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
.container-navbar {
  position:sticky;
  top: 0;
  width: 100%;
  
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-active {
  color: #e74c3c;
}

span {
  color: #e74c3c;
}

.logout {
  background-color: #e74c3c;
  border-radius: 0.5rem;
  box-shadow: 0px 1px 1px 2px rgba($color: #0b0b0b, $alpha: 1.0);
  width: 8rem;
  text-align: center;
  margin-left: 2rem;
}
</style>