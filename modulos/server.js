var tipos = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};

function crear(http, url, fs){
   http.createServer(function(request, response){
      var filePath = devolverRutaArchivo(url, request);
      leerArchivo(fs, filePath, function(numero, contentFile){
         if(numero === 404){
            response.writeHead(numero, 'text/plain');
            response.end('Error 404. El enlace no existe o ha dejado de existir.');
         }else if(numero === 500){
            response.writeHead(numero, 'text/plain');
            response.end('Error interno.');
         }else{
            var extension = filePath.split('.').pop();
            var tipo = tipos[extension];
            response.writeHead(numero, {'Content-Type': tipo});
            response.end(contentFile);
         }
      })
   }).listen(3000, '127.0.0.1');
}

function devolverRutaArchivo(url, request){
   var pathName = (url.parse(request.url).pathname == '/') ? '/index.html' : url.parse(request.url).pathname;
   var filePath = 'contenido/' + pathName;
   return filePath;
}

function leerArchivo(fs, filePath, callback){
   fs.exists(filePath, function(existe){
      if(existe){
         fs.readFile(filePath, function(error, contentFile){
            if(error){
               callback(500, null);
            }else{
               callback(200, contentFile);
            }
         });
      }else{
         callback(404, null);
      }
   });
}

exports.crear = crear;