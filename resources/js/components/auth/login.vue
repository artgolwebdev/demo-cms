<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Login</h4> 
                </div>
                <div class="card-body">
                    <form @submit.prevent="register">
                        <div class="row">
                       
                            <div class="col-12 mb-2" v-bind:class="{'has-validation': user.email.errorMessage}">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" 
                                        v-on:input="this.user.email.errorMessage = false" class="form-control" 
                                        v-bind:class="{'is-invalid': user.email.errorMessage}" 
                                        v-model="user.email.value">

                                    <div  v-if="user.email.errorMessage" class="invalid-feedback">
                                        {{  user.email.errorMessage }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2" v-bind:class="{'has-validation': user.password.errorMessage}">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" 
                                        v-on:input="this.user.password.errorMessage = false" class="form-control" 
                                        v-bind:class="{'is-invalid': user.password.errorMessage}" 
                                        v-model="user.password.value">

                                    <div  v-if="user.password.errorMessage" class="invalid-feedback">
                                        {{  user.password.errorMessage }}
                                    </div>
                                </div>
                            </div>
                         
                            <div class="col-12 d-flex justify-content-between align-items-center mt-4">
                                <router-link :to='{name:"welcome"}' class="btn btn-secondary">
                                    Cancel
                                </router-link>

                                <button type="submit" class="btn btn-primary" :disabled="isLoading">Login</button>
                            </div>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters  } from "vuex";
import handleErrors  from "../../services/errors";
export default {
    computed: {
        ...mapGetters(["isLoggedIn"])
    },
    created() {
        if(this.isLoggedIn){
            this.$router.push('/home');
        }
    },
    data(){
        return {
            isLoading : false , 
            user:{
                email: {
                    value : "" , 
                    errorMessage : ""
                },
                password:{
                    value : "" , 
                    errorMessage : ""
                },
            }, 
        }
    },
    methods:{
        register(){
            this.isLoading = true;
            this.$store.dispatch('login', {
                email    : this.user.email.value , 
                password : this.user.password.value  
            }).then((response)=>{

                if(response.status == "success" && response.token){
                    this.$router.push('/home');
                }
                this.isLoading = false;
            })
            .catch((response)=>{
                handleErrors(this.user,response);
                this.isLoading = false;
            })
        }
    }
}
</script>