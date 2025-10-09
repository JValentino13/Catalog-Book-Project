#!/bin/bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan serve --host=0.0.0.0 --port=$PORT
