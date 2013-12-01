// versión segunda con copia y pega
// Código muy repetido

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
        assert.equal($('#n1').text(), 23.5, 'Primer sumando');
        assert.equal($('#n2').text(), 13.7, 'Segundo sumando');
        assert.equal($('#resultado').text(), 37.2, 'Resultado');
    });
});

req1.on('error', function (e) {
    console.log('Error en la conexión:', e.message);
});

req1.write(qs.stringify({ num1: '23.5', num2: '13.7' }));
req1.end();

// Repetido pero con otros datos

var req2 = http.request(opts, function (res) {
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
        assert.equal($('#n1').text(), 'hola', 'Primer sumando');
        assert.equal($('#n2').text(), '134', 'Segundo sumando');
        assert(isNaN($('#resultado').text()), 'Resultado');
    });
});

req2.on('error', function (e) {
    console.log('Error en la conexión:', e.message);
});

req2.write(qs.stringify({ num1: 'hola', num2: '134' }));
req2.end();

