# Gunakan PHP 8.2 dengan Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install dependency sistem dan ekstensi PHP yang dibutuhkan
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip

# Install ekstensi GRPC dan Protobuf (untuk Firestore)
RUN pecl install grpc protobuf \
    && docker-php-ext-enable grpc protobuf

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Salin file Composer terlebih dahulu (agar cache efisien)
COPY ./laravel_backend/composer.json ./laravel_backend/composer.lock ./ 

# Install dependency Laravel
RUN composer install --no-dev --optimize-autoloader --ignore-platform-req=ext-grpc

# Salin seluruh source code Laravel
COPY ./laravel_backend ./

# Set permission folder storage dan cache
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Jalankan Laravel (generate key dan cache config di runtime)
CMD php artisan key:generate --force && php artisan config:cache && php artisan serve --host=0.0.0.0 --port=8000
