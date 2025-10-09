FROM php:8.2-apache

RUN apt-get update && apt-get install -y unzip git curl \
    && docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

COPY . .

RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer install --no-dev --optimize-autoloader \
    && php artisan key:generate

EXPOSE 8080

CMD php artisan serve --host=0.0.0.0 --port=8080
