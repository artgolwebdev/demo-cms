import authHeader from './auth.header.js'
import sendRequest from './request.js'

class CustomerService {
    getCustomers(url){
        return sendRequest("GET",url,null,authHeader());
    }

    deleteCustomer(url){
        return sendRequest("DELETE",url,null,authHeader());
    }

    create(data){
        return sendRequest("POST","customer",data,authHeader());
    }

    edit(data,id){
        return sendRequest("PATCH","customer/"+id,data,authHeader());
    }
}

export default new CustomerService();