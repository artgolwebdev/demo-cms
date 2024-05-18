# DEMO CMS 

- Laravel 9 REST API 
- VUE + VUEX Redux Design Pattern 

**Installation proccess**

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

