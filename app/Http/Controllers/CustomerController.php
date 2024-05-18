<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCustomerRequest;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::select(['id','name','email','phone','address','created_at'])->orderBy('id','desc')->paginate(5);
        return response()->json([
            "status" => "success" , 
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create($request->post());
        return response()->json([
            'status' => 'success' , 
            'customer' => $customer , 
            'message'  => 'Customer created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        if(!$customer){
            return response()->json([
                "status" => "error" , 
                "message" => "Customer not found"
            ]);
        }

        return response()->json([
            "status" => "success" , 
            "customer" => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(StoreCustomerRequest $request, Customer $customer)
    {
        $customer->fill($request->post())->save();
        return response()->json([
            'status' => 'success' , 
            'customer' => $customer ,
            'message' => 'Customer updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json([
            'status' => 'success' , 
            'message'=> 'Customer deleted successfully'
        ]);
    }
}
