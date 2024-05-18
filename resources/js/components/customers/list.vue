<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{name:"customerAdd"}' class="btn btn-primary">Create</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4>Customers</h4>
                    <div class="spinner-border" role="status" v-if="isLoading">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">

                        <table class="table table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-if="customers && customers.length > 0">
                                <tr v-for="(customer,key) in customers" :key="key">
                                    <td>{{ customer.id }}</td>
                                    <td>{{ customer.name }}</td>
                                    <td>{{ customer.email }}</td>
                                    <td>{{ customer.phone }}</td>
                                    <td>{{ customer.address }}</td>
                                    <td>
                                        <router-link :to='{name:"customerEdit",params:{id:customer.id}}' class="btn btn-success">Edit</router-link>
                                        <button type="button" @click.prevent="deleteCustomer(customer.id)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6" style="text-align:center">No customers Found.</td>
                                </tr>
                            </tbody>
                            
                        </table>
                     

                        <div v-if="customers && customers.length > 0">
                            <nav class="d-flex justify-content-center align-items-center">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a href="#" class="page-link" v-if="this.pagination.page!=1" @click.prevent="getCustomers(this.pagination.page-1)">Prev</a>
                                    </li>
                                    <li class="page-item" 
                                        v-for="(page,key) in pagination.links" :key="key">
                                        <a href="#" class="page-link"  v-bind:class="{'active': page.active}" v-if="!isNaN(page.label)" @click.prevent="getCustomers(page.label)">{{  page.label }}</a>
                                    </li>
                                    <li class="page-item">
                                        <a href="#" class="page-link"   v-if="this.pagination.page < this.pagination.last_page" @click.prevent="getCustomers(this.pagination.page+1)">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>

                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import CustomerService from '../../services/customer.service'

export default {
 
    data(){
        return {
            isLoading : false ,
            customers:[], 
            pagination : {
                page : 1 ,
                last_page : 0 ,  
                links : []
            }
        }
    },
    mounted(){
        this.getCustomers()
    },
    methods:{
        getCustomers(page=null){
            this.isLoading = true;
            if(page != null)this.pagination.page = parseInt(page);
            CustomerService.getCustomers("customer?page="+this.pagination.page).then(response=>{
                this.customers = response.customers.data;
                this.pagination.links = response.customers.links;
                this.pagination.last_page = response.customers.last_page;
                this.isLoading = false;
            }).catch(error=>{
                this.isLoading = false;
                console.log(error)
                this.customers = []
            })
        },
        deleteCustomer(id){
            if(confirm("Are you sure to delete this customer ?")){
                CustomerService.deleteCustomer(`customer/${id}`).then(response=>{
                    this.getCustomers();
                    if(response.status == "success"){
                        $toast.warning( response.message,{
                            position : 'top-right'
                        });
                        this.$router.push({name:"customerList"})
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }
        }
    }
}
</script>
