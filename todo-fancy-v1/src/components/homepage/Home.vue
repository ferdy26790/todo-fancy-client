<template>
  <div class="hello">
    <div class="row">
      <side-bar/>
      <view-port/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SideBar from '@/components/homepage/SideBar'
import ViewPort from '@/components/homepage/ViewPort'
export default {
  name: 'Home',
  computed: {
    ...mapState([
      'signin'
    ])
  },
  methods: {
    ...mapActions([
      'getTodo'
    ])
  },
  components: {
    SideBar,
    ViewPort
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeCreate: function () {

  },
  mounted () {
    if (!this.signin) {
      window.location = '/'
    } else {
      this.getTodo()
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.left {
  text-align: left;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
