<template >
  <div class="jumbotron">
    <h1 class="display-1">WELCOME TO TODO FANCY!</h1>
    <div class="w3-panel w3-leftbar w3-light-grey">
      <p class="w3-xlarge w3-serif">
      <i>"Before you eat the elephant, make sure you know what parts you want to eat."</i></p>
    </div>
    <hr class="my-4">
    <div class="container">
      <div class="container form-group left ">
        <label >Email address</label>
        <input type="email" class="form-control" v-model="email" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="container form-group left">
        <label >Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>
      <div class="lead">
        <p class="btn btn-primary btn-lg" @click="login" role="button">Login</p>
        <p class="lead">dont have account? register <a href="/register">here</a> or</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    ...mapActions([
      'signIn'
    ]),
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.signIn(payload)
    }
  }
}
</script>

<style>
.left{
  text-align: left;
}
</style>
