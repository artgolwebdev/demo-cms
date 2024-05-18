import Welcome from './components/welcome.vue'
import Home from './components/home.vue'
import CustomerList from './components/customers/list.vue'
import CustomerCreate from './components/customers/add.vue'
import CustomerEdit from './components/customers/edit.vue'
import RegisterPage from './components/auth/register.vue'
import LoginPage from './components/auth/login.vue'
import  { createRouter, createWebHistory }  from 'vue-router'


/**
 *  Routes 
 */
export const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            name : 'welcome' , 
            path : '/' , 
            component : Welcome
        }, 
        {
            name : 'register' , 
            path : '/register' , 
            component : RegisterPage
        },
        {
            name : 'login' , 
            path : '/login' , 
            component : LoginPage
        },
        {
            name : 'home' , 
            path : '/home' , 
            component : Home
        }, 
        {
            name : 'customerList' ,
            path : '/customers' , 
            component : CustomerList
        },
        {
            name : 'customerEdit' , 
            path : '/customer/:id/edit',
            component : CustomerEdit 
        },
        {
            name : 'customerAdd' , 
            path : '/customer/add',
            component : CustomerCreate
        }
    ]
});


