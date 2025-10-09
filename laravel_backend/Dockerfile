# Gunakan PHP 8.2 dengan Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install ekstensi PHP
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Salin kode Laravel dari folder backend
COPY ./laravel_backend /var/www/html

# Install dependency Laravel
RUN composer install --no-dev --optimize-autoloader

# Generate app key & cache konfigurasi
RUN php artisan key:generate && php artisan config:cache

# Set permission folder storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Jalankan Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
