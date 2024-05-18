<template>
    <div class="container">
      <p>Home page</p>
      <small>Welcome , {{  userName }}</small>
    </div>
</template>

<script>
  import AuthService from '../services/auth.service';
  import { mapGetters  } from "vuex";
    export default {
      data(){
        return {
          userName : ""
        }
      },
      computed: {
        ...mapGetters(["isLoggedIn"])
      },
      created() {
        this.getUserName();
      },
      methods: {
        getUserName(){
          AuthService.me().then((response)=>{
            this.userName = response.data.name;
          })
        }
      }
    }
</script>