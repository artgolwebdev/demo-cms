<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Update Customer</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="update">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group" v-bind:class="{'has-validation': customer.name.errorMessage}" >
                                    <label>Name</label>
                                    <input type="text" 
                                        v-on:input="this.customer.name.errorMessage = false" class="form-control"  
                                        v-bind:class="{'is-invalid': customer.name.errorMessage}" v-model="customer.name.value">
                                    <div  v-if="customer.name.errorMessage" class="invalid-feedback">
                                        {{  customer.name.errorMessage }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2" v-bind:class="{'has-validation': customer.email.errorMessage}">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" 
                                        v-on:input="this.customer.email.errorMessage = false" class="form-control" 
                                        v-bind:class="{'is-invalid': customer.email.errorMessage}" v-model="customer.email.value">
                                    <div  v-if="customer.email.errorMessage" class="invalid-feedback">
                                        {{  customer.email.errorMessage }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2" v-bind:class="{'has-validation': customer.phone.errorMessage}">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" 
                                        v-on:input="this.customer.phone.errorMessage = false" class="form-control" 
                                        v-bind:class="{'is-invalid': customer.phone.errorMessage}" v-model="customer.phone.value">
                                    <div  v-if="customer.phone.errorMessage" class="invalid-feedback">
                                        {{  customer.phone.errorMessage }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2" v-bind:class="{'has-validation': customer.address.errorMessage}">
                                <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" 
                                        v-on:input="this.customer.address.errorMessage = false" class="form-control" 
                                        v-bind:class="{'is-invalid': customer.address.errorMessage}" v-model="customer.address.value">
                                    <div  v-if="customer.address.errorMessage" class="invalid-feedback">
                                        {{  customer.address.errorMessage }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 d-flex justify-content-between align-items-center">
                                <button type="submit" class="btn btn-primary">Save</button>

                                <router-link :to='{name:"customerList"}' class="btn btn-secondary">
                                    Cancel
                                </router-link>
                                

                            </div>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import handleErrors  from "../../services/errors";
import CustomerService from '../../services/customer.service'

export default {
    data(){
        return {
            customer:{
                name:{
                    value : "" , 
                    errorMessage : ""
                },
                email:{
                    value : "" , 
                    errorMessage : ""
                },
                phone:{
                    value : "" , 
                    errorMessage : ""
                },
                address:{
                    value : "" , 
                    errorMessage : ""
                }
            }, 
        }
    },
    mounted(){
        this.getCustomer()
    },
    methods:{
         getCustomer(){
        
            CustomerService.getCustomers("customer/"+this.$route.params.id).then(response=>{

                // define current customer
                Object.keys( response.customer).forEach((key)=>{
                    if(this.customer[key]){
                        this.customer[key].value = response.customer[key]
                    }
                })
            }).catch(error=>{
                console.log(error);
                 // handle 404 
                 if(error.status == "error"){
                    $toast.error( error.message,{
                        position : 'top-right'
                    });
                }
                this.customers = []
            })

        },
        async update(){
            CustomerService.edit({
                name : this.customer.name.value , 
                email : this.customer.email.value , 
                phone : this.customer.phone.value , 
                address : this.customer.address.value
            },this.$route.params.id).then(response=>{
                if(response.status == "success"){
                    $toast.success( response.message,{
                        position : 'top-right'
                    });
                    this.$router.push({name:"customerList"})
                }
            }).catch((response)=>{
                handleErrors(this.customer,response);
            })
        }
    }
}
</script>