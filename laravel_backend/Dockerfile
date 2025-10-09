# Gunakan image PHP dengan Composer
FROM php:8.2-apache

# Install ekstensi yang dibutuhkan Laravel
RUN docker-php-ext-install pdo pdo_mysql

# Salin semua file ke dalam container
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html

# Install Composer secara manual
RUN apt-get update && apt-get install -y unzip git \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Install dependencies Laravel
RUN composer install --no-dev --optimize-autoloader

# Generate APP_KEY Laravel
RUN php artisan key:generate

# Expose port 8080
EXPOSE 8080

# Jalankan server Laravel
CMD php artisan serve --host=0.0.0.0 --port=8080
