# uploader

> uploader for space whale

## Build Setup

``` bash

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

## Инструкция

Для загрузки файлов кликните по главной (и единственной) кнопке 'UPLOAD', 
либо же переместите нужные файлы в зону 'Drop files'.
(Загружаться будут только файлы с форматом 'png', 'jpg', 'pdf' в обоих случаях).

После загрузки файлов на странице появится их список, с возможностью удаления из него.

Кнопка меняется на 'POST'. По ее нажатию происходит отправка файлов на адрес 'example.com/upload'.
Далее список обновляется, а кнопка снова меняется на 'UPLOAD' для новых загрузок.


