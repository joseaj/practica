// Refactorizando el código repetido
// principio DRY (Dont Repeat Yourself)

var http = require('http'),
    qs = require('querystring'),
    assert = require('assert'),
    // https://github.com/MatthewMueller/cheerio
    cheerio = require('cheerio');  // html parser a la jquery

var opts = {
    host: 'localhost',
    port: 8000,
    path: '/sumar',
    method: 'POST'
};

var peticion = function (n1, n2, resultado, callback) {
    console.log('entrada en peticion:');
    console.log('n1 = ', n1);
    console.log('n2 = ', n2);
    console.log('resultado = ', resultado);
    console.log('callback = ', callback);
    var req1 = http.request(opts, function (res) {
        var cuerpo = '';
        res.on('data', function (chunk) {
            cuerpo += chunk;
        });
        res.on('end', function () {
            console.log(cuerpo);
            var $ = cheerio.load(cuerpo);
            console.log('n1 =', $('#n1').text());
            console.log('n2 =', $('#n2').text());
            console.log('resultado =', $('#resultado').text());
            // advertir que assert.equal() hace conversiones
            // automáticas entre cadenas y números
            assert.equal($('#n1').text(), n1, 'Primer sumando');
            console.log('pasado primer test');
            assert.equal($('#n2').text(), n2, 'Segundo sumando');
            console.log('pasado segundo test');
            callback($('#resultado').text(), resultado, 'Resultado');
            console.log('pasado tercer test');
        });
    });

    req1.on('error', function (e) {
        console.log('Error en la conexión:', e.message);
    });

    req1.write(qs.stringify({ num1: n1, num2: n2 }));
    req1.end();
};

peticion(23.5, 13.7,  37.2, assert.equal);

peticion('hola', 134, null, function (valorReal, valorEsperado, mensaje) {
    assert(isNaN(valorReal), mensaje);
});

peticion(2, 3,  7, assert.equal);

peticion(-1.5, 34, 32.5, assert.equal);
