# DEMO CMS 

- Laravel 9 REST API 
- VUE + VUEX Redux Design Pattern 


###Installation proccess


Clone Repository

`git clone https://github.com/artgolwebdev/demo-cms.git`

Define DataBase Connection
rename .env.example to .env

	DB_CONNECTION=mysql
	DB_HOST=127.0.0.1
	DB_PORT=3306
	DB_DATABASE=laravel
	DB_USERNAME=root
	DB_PASSWORD=

Run installation commands

    composer update 
    php artisan key:generate
    php artisan jwt:secret
    php artisan migrate --seed 
	npm install
	npm run build 
	php artisan serve 

## REST API Examples (Protected with JWT Bearer Token)
**Create Customer**

	 curl -X POST http://localhost:8000/api/customer 
     -H "Content-Type: application/json" 
     -H "Authorization: Bearer <token>" 
     -d '{
           "name": "johndoe",
           "email": "johndoe@example.com",
           "phone": "123",
		   "address" : "Street , City , Country"
         }'
		 

**Example Response**

	{
    	"status": "success",
    	"customer": {
        	"name": "test",
        	"email": "test@teswwdsft.coms",
        	"phone": "234",
        	"address": "secret123",
        	"updated_at": "2024-05-18T09:37:51.000000Z",
        	"created_at": "2024-05-18T09:37:51.000000Z",
        	"id": 64
    },
    	"message": "Customer created successfully"
	}

**Update Customer**

	curl -X PUT http://localhost:8000/api/customer/<customer-id>
     -H "Content-Type: application/json" 
     -H "Authorization: Bearer <token>" 
     -d '{
           "name": "johndoe",
           "email": "johndoe@example.com",
           "phone": "123",
		   "address" : "Street , City , Country"
         }'

**Example Response**

		{
    "status": "success",
    "customer": {
        "id": 64,
        "name": "test22",
        "email": "test@teswwdsft.coms",
        "phone": "234",
        "address": "secret123",
        "created_at": "2024-05-18T09:37:51.000000Z",
        "updated_at": "2024-05-18T09:42:12.000000Z"
    },
   		 "message": "Customer updated successfully"
	}

**Delete Customer**

	  curl -X DELETE http://localhost:8000/api/customer/<customer-id>
     -H "Content-Type: application/json" 
     -H "Authorization: Bearer <token>" 

**Example Response**
		
	{
    	"status": "success",
    	"message": "Customer deleted successfully"
	}


**GET Customer**

	curl -X GET http://localhost:8000/api/customer/<customer-id> 
     -H "Content-Type: application/json" 
     -H "Authorization: Bearer <token>" 

**Example Response**

	{
    "status": "success",
    "customer": {
        "id": 22,
        "name": "Gardner Wilderman",
        "email": "hudson.selmer@example.com",
        "phone": "+14792455860",
        "address": "6271 Lubowitz Trail\nLake Titus, AK 41252-8362",
        "created_at": "2024-05-16T14:55:33.000000Z",
        "updated_at": "2024-05-16T14:55:33.000000Z"
    	}
	}

**GET All Customers**

	curl -X GET http://localhost:8000/api/customer?page=1 
     -H "Content-Type: application/json" 
     -H "Authorization: Bearer <token>" 

**Example Response**

	{
    "status": "success",
    "customers": {
        "current_page": 1,
        "data": [
            {
                "id": 62,
                "name": "aSDAsASasasdasda",
                "email": "asdasda@asdasd.com",
                "phone": "1231232333",
                "address": "qweqsd qs dasda sd",
                "created_at": "2024-05-17T12:34:01.000000Z"
            },
            ...
        ],
        "first_page_url": "http://localhost:8000/api/customer?page=1",
        "from": 1,
        "last_page": 10,
        "last_page_url": "http://localhost:8000/api/customer?page=10",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            ...
        ],
        "next_page_url": "http://localhost:8000/api/customer?page=2",
        "path": "http://localhost:8000/api/customer",
        "per_page": 5,
        "prev_page_url": null,
        "to": 5,
        "total": 46
    	}
	}


####Auth Flow 

- **/store/auth.module**
handles global state if user is logged in
- **/services/auth.service.js**
points to correct server request and manipulates JWT token in local storage
- **/services/request.js **
manages server request with fetch api 

```mermaid
graph TD;
    /store/auth.module.js-->/services/auth/service.js;
    /services/auth/service.js-->/services/request.js;
    /services/request.js-->API;
    