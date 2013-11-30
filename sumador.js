var http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
    PORT = process.env.PORT || 80;

var app = http.createServer();

app.on('request', function (req, res) {
    if ('get' === req.method.toLowerCase() &&
        '/' === req.url) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream('pagina1.html').pipe(res);
    } else if ('post' === req.method.toLowerCase() &&
        '/sumar' === req.url) {
        var cuerpo = '';
        req.on('data', function (chunk) {
            cuerpo += chunk;
        });
        req.on('end', function () {
            console.log(cuerpo);
            var parsedCuerpo = qs.parse(cuerpo),
                num1 = parseFloat(parsedCuerpo.num1),
                num2 = parseFloat(parsedCuerpo.num2);
            console.dir(parsedCuerpo);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h2><span id="n1">' + parsedCuerpo.num1 +
                      '</span> + <span id="n2">' + parsedCuerpo.num2 +
                      '</span> = <span id="resultado">' + (num1 + num2).toString() +
                      '</span></h2>');
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h2>Página desconocida:' + req.url + '</h2>');
        res.write('<h2>Método: ' + req.method + '</h2>');
        res.end();
    }
});

app.listen(PORT, function () {
    console.log('Servidor en puerto', PORT);
});
