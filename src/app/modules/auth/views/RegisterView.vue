<template>
  <!-- Section: Design Block -->
<section class="text-center text-lg-start">
  

  <!-- Jumbotron -->
  <div class="container">
    <div class="row g-0 align-items-center">
      <div class="col-lg-6 mb-5 mb-lg-0">
        <div class="card cascading-right" style="
            background: hsla(0, 0%, 100%, 0.55);
            backdrop-filter: blur(30px);
            ">
          <div class="card-body p-5 shadow-5 text-center">
            <h2 class="fw-bold mb-5">Sign up now</h2>
            <form>
              <!-- DNI input -->
              <div class="form-outline mb-4 w-50">
                <input v-model="newUser.dni" placeholder="DNI" type="text" id="form3Example5" class="form-control" />
              </div>

              <!-- 2 column grid layout with text inputs for the first and last names -->
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <input v-model="newUser.firstName" placeholder="First name" type="text" id="form3Example1" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <input v-model="newUser.lastName" placeholder="Last name" type="text" id="form3Example2" class="form-control" />
                  </div>
                </div>
              </div>

              <!-- Email input -->
              <div class="form-outline mb-4">
                <input v-model="newUser.email" placeholder="Email address" type="email" id="form3Example3" class="form-control" />
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <input v-model="newUser.password" placeholder="Password" type="password" id="form3Example4" class="form-control" />
              </div>

              <!-- Phone input -->
              <div class="form-outline mb-4">
                <input v-model="newUser.phoneNumber" placeholder="Phone Number" type="text" id="form3Example6" class="form-control" />
              </div>

              <!-- Submit button -->
              <button @click="signUp" type="button" class="btn btn-primary btn-block mb-4">
                Sign up
              </button>

              
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-6 mb-5 mb-lg-0">
        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" class="w-100 rounded-4 shadow-4"
          alt="" />
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</section>
<!-- Section: Design Block -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      newUser: {
        dni: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }      
    }
  },

  methods: {
    ...mapActions('auth', (['register'])),
    signUp(){
      this.register(this.newUser)
    }
  }

}
</script>

<style lang="scss" scoped>
.cascading-right {
      margin-right: -50px;
    }

    @media (max-width: 991.98px) {
      .cascading-right {
        margin-right: 0;
      }
    }
</style>