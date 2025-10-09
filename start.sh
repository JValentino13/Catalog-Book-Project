#!/bin/bash
cd laravel_backend
composer install
php artisan key:generate
php artisan migrate --force
php artisan serve --host=0.0.0.0 --port=8080
