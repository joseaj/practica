// Módulo que exporta una con parámetros las opts
// para hacer requests

var http = require('http'),
    qs = require('querystring'),
    assert = require('assert'),
    cheerio = require('cheerio');

require('colors');

module.exports = function (opts) {
    /********
    @param opts {diccionario} con host, port, method, y path para la conexión
    *****/

    return function (n1, n2, resultado, callback, testActual) {
        /********
        @param n1 {número} primer sumando
        @param n2 {número} segundo sumando
        @param resultado {número} resultado esperado de la suma
        @param callback {función} test a realizar (ejemplo: assert.equal)
        @param testActual {string} mensaje con el tipo de test actual
        *****/

        var req1 = http.request(opts, function (res) {
            console.log('Realizada la peticion:'.grey, testActual.blue);

            var cuerpo = '';
            res.on('data', function (chunk) {
                cuerpo += chunk;
            });
            res.on('end', function () {
                var $ = cheerio.load(cuerpo);
                // advertir que assert.equal() hace conversiones
                // automáticas entre cadenas y números
                test($('#n1').text(), n1, 'Primer sumando', assert.equal);
                test($('#n2').text(), n2, 'Segundo sumando', assert.equal);
                test($('#resultado').text(), resultado, 'Resultado', callback);
            });
        });

        req1.on('error', function (e) {
            console.log('Error en la conexión:', e.message);
        });

        req1.write(qs.stringify({ num1: n1, num2: n2 }));
        req1.end();

        function test(valorActual, valorEsperado, mensaje, callback) {
            try {
                callback(valorActual, valorEsperado, mensaje);
                console.log(testActual.blue, ('✓ ' + mensaje).green);
            } catch (err) {
                console.log(testActual.red, mensaje.red, err);
            }
        }
    };
};