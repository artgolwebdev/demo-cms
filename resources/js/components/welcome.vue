<template>
  <div class="container">
    <div class="jumbotron">
      <h2 class="display-4">DEMO - CMS</h2>
      <p class="d-flex justify-content-end">Please create an account or login with existing</p>
      <p class="lead d-flex justify-content-end align-items-center">
        <router-link  exact-active-class="active" to="/login"  class="btn btn-primary btn-lg mx-2" href="#" >Login</router-link>
        <router-link  exact-active-class="active" to="/register"  class="btn btn-secondary btn-lg mx-2" href="#" >Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters  } from "vuex";
    export default {
      computed: {
        ...mapGetters(["isLoggedIn"])
      },
      created() {
        if(this.isLoggedIn){
          this.$router.push('/home');
        }
      },
    }
</script>