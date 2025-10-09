#!/bin/bash

# Jalankan sekali saja
if [ ! -f /var/www/html/.installed ]; then
    composer install --no-dev --optimize-autoloader
    php artisan key:generate
    php artisan migrate
    touch /var/www/html/.installed
fi

# Jalankan Laravel
php artisan serve --host=0.0.0.0 --port=$PORT
