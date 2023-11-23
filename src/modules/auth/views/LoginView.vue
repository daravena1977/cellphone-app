<template>
    
<form class="login-container p-5 col-10 col-sm-8 col-lg-3 m-auto">
    <h2>Login</h2>
  <!-- Email input -->
  <div class="form-outline mb-4">
    <input v-model="user.email" placeholder="Email" type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1"></label>
  </div>

  <!-- Password input -->
  <div class="form-outline mb-4">
    <input v-model="user.password" placeholder="Password" type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2"></label>
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col">
      <!-- Simple link -->
      <a href="#!">Forgot password?</a>
    </div>
  </div>

  <!-- Submit button -->
  <button @click="onLogin()" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>

  <!-- Register buttons -->
  <div class="text-center">
    <p>Not a member? <router-link to="/auth/signup">Register</router-link></p>
    
  </div>
</form>
  
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions('auth', (['login'])),
      onLogin() {
        this.login(this.user)

      }
      
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    box-shadow: 1px 10px 5px rgba(0, 0, 0, 0.2);
}

</style>