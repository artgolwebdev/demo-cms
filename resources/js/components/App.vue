<template>
    <main>

        <nav class="navbar  navbar-dark bg-dark">
           <div class="container-fluid">
                <router-link class="navbar-brand"  exact-active-class="active" to="/" href="#">DEMO - CMS</router-link>
        
                <div class="">
                    <ul class="nav">
                        <li class="nav-item" v-if="this.isLoggedIn">
                            <router-link exact-active-class="active" to="/home" class="nav-item nav-link  text-light">Home</router-link>
                        </li>
                        <li class="nav-item" v-if="this.isLoggedIn" >
                            <router-link exact-active-class="active" to="/customers" class="nav-item nav-link text-light">Customers</router-link>
                        </li>
                        <li class="nav-item" v-if="this.isLoggedIn" >
                            <a href="#" class="nav-item nav-link text-light" v-on:click="logout">Logout</a>
                        </li>
                        <li class="nav-item" v-if="!this.isLoggedIn">
                            <router-link  exact-active-class="active" to="/login"  class="nav-item nav-link  text-light" href="#" >Login</router-link>
                        </li>
                        <li class="nav-item" v-if="!this.isLoggedIn">
                            <router-link  exact-active-class="active" to="/register"  class="nav-item nav-link  text-light"  href="#">Register</router-link>
                        </li>
                    </ul>
                </div>
           </div>
        </nav>


        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </main>
</template>
 

<script>
  import { mapGetters  } from "vuex";
    export default {
      computed: {
        ...mapGetters(["isLoggedIn"])
      },
      created() {
        if(!this.isLoggedIn){
            this.$router.push('/')
        }
      },
      methods : {
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/');
        }
      }
    }
</script>
