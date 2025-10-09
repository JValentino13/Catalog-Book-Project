# Gunakan PHP 8.2 dengan Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install dependency sistem dan ekstensi PHP yang dibutuhkan
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip

# Install ekstensi GRPC dan Protobuf (dibutuhkan oleh Firebase dan Firestore)
RUN pecl install grpc protobuf \
    && docker-php-ext-enable grpc protobuf

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Salin kode Laravel dari folder backend
COPY ./laravel_backend /var/www/html

# Install dependency Laravel
COPY ./laravel_backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --ignore-platform-req=ext-grpc
COPY ./laravel_backend ./

# Generate app key & cache konfigurasi
RUN php artisan key:generate && php artisan config:cache

# Set permission folder storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Jalankan Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
