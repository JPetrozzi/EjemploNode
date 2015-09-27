var http = require('http');
var url = require('url');
var fs = require('fs');
var server = require('./modulos/server');

server.crear(http, url, fs);

console.log('El servidor esta funcionando correctamente en http://localhost:3000/');