<template>

  <v-form as="form" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, validateField }"
    class="login-container p-5 col-10 col-sm-8 col-lg-3 m-auto">
    <h2>Login</h2>
    <!-- Email input -->
    <div class="form-outline mb-4">
      <Field v-model="user.email" name="email" placeholder="Email" type="email" id="email" class="form-control"
        :class="{ 'is-invalid': errors.email }" @input="() => validateField('email')" />
      <div class="invalid-feedback">{{ errors.email }}</div>
      <label class="form-label" for="form2Example1"></label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <Field v-model="user.password" name="password" placeholder="Password" type="password" id="form2Example2" class="form-control"
        :class="{ 'is-invalid': errors.password }"  @input="() => validateField('password')"/>
      <div class="invalid-feedback">{{ errors.password }}</div>
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
    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

    <!-- Register buttons -->
    <div class="text-center">
      <p>Not a member? <router-link to="/auth/signup">Register</router-link></p>

    </div>
  </v-form>

</template>

<script>
import { mapActions } from 'vuex'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'



export default {
  components: {
    VForm: Form,
    Field,
  },


  data() {  
    return {
      user: {
        email: '',
        password: '',
      },
      schema: Yup.object().shape({
        email: Yup.string()
          .email('Ingrese un correo electrónico válido')
          .required('El correo electrónico es obligatorio'),
        password: Yup.string()
        .required('La contraseña es obligatoria')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
      }),
    }
  },

  methods: {
    ...mapActions('auth', (['login'])),
    

    onSubmit(values) {
      this.login(this.user)
      .then(() => {
        this.$router.push({name: 'workorder'})
        console.log(values)
      })
      .catch(err => console.log(err))
    }

  }
}
</script>

<style lang="scss" scoped>
.login-container {
  box-shadow: 1px 10px 5px rgba(0, 0, 0, 0.2);
}
</style>