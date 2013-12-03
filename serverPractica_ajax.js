var http = require('http'),
    fs = require('fs'),
    PORT = process.env.PORT || 8000;

var app = http.createServer();

app.on('request', function (req, res) {
    var cuerpo = '';
    console.log('recibido método=', req.method, 'url=', req.url);
    if ('get' === req.method.toLowerCase() && '/' === req.url) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream('pagina2.html').pipe(res);
    } else if ('post' === req.method.toLowerCase() &&
        '/sumar' === req.url) {
        cuerpo = '';
        req.on('data', function (chunk) {
            cuerpo += chunk;
        });
        req.on('end', function () {
            console.log(cuerpo);
            var parsedCuerpo = JSON.parse(cuerpo),
                num1 = parseFloat(parsedCuerpo.num1),
                num2 = parseFloat(parsedCuerpo.num2);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.write(JSON.stringify({
                n1: parsedCuerpo.num1,
                n2: parsedCuerpo.num2,
                resultado: (num1 + num2).toString()
            }));
            res.end();
        });
    } else {
        console.log('página desconocida:');
        console.log('método=', req.method,
                    'url=', req.url,
                    'path=', req.path);
        cuerpo = '';
        req.on('data', function (chunk) {
            cuerpo += chunk;
        });
        req.on('end', function () {
            console.log('cuerpo=', cuerpo);
        });
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h2>Página desconocida:' + req.url + '</h2>');
        res.write('<h2>Método: ' + req.method + '</h2>');
        res.end();
    }
});

app.listen(PORT, function () {
    console.log('Sumador, versión con AJAX');
    console.log('Servidor en puerto', PORT);
});

