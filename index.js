var http = require('http');
var url = require('url');
var fs = require('fs');
var tipos = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};

http.createServer(function(request, response){
   var pathName = (url.parse(request.url).pathname == '/') ? '/index.html' : url.parse(request.url).pathname;
   var pathFile = 'contenido/' + pathName;
   fs.exists(pathFile, function(existe){
      if(existe){
         fs.readFile(pathFile, function(error, fileContent){
            if(error){
               response.writeHead(500, 'text/plain');
               response.end('Error interno.');
            }else{
               var extension = pathFile.split('.').pop();
               var tipo = tipos[extension];
               response.writeHead(200, {'Content-Type': tipo});
               response.end(fileContent);
            }
         });
      }else{
         response.writeHead(404, 'text/plain');
         response.end('Error 404. El enlace no existe o ha dejado de existir.');
      }
   });
}).listen(3000, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en http://localhost:3000/');