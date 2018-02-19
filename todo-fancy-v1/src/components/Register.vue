<template >
  <form class="container left">
    <fieldset>
      <legend>Register</legend>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="email" class="form-control" v-model="name" aria-describedby="emailHelp" placeholder="Enter Name">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="password"  placeholder="Password">
      </div>
      <button type="button" @click="register" class="btn btn-primary">Register</button>
    </fieldset>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    ...mapActions([
      'signUp'
    ]),
    register () {
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.signUp(payload)
    }
  }
}
</script>

<style lang="css">
.left {
  text-align: left;
  margin-top: 10px;
}

</style>
