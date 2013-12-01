// Por último construimos un módulo
// y lo utilizamos

var assert = require('assert');

var peticion = require('./peticion')({
    host: 'powerful-dawn-4690.herokuapp.com',
    port: 80,
    path: '/sumar',
    method: 'POST'
});

peticion(23.5, 13.7,  37.2, assert.equal, '23.5 + 13.7 = 37.2');

peticion('hola', 134, null, function (valorReal, valorEsperado, mensaje) {
    assert(isNaN(valorReal), mensaje);
}, 'hola + 134 isNaN');

peticion(2, 3,  7, assert.equal, '2 + 3 = 7 ¡¡¡ debe fallar !!!');

peticion(-1.5, 34, 32.5, assert.equal, '-1.5 + 34 = 32.5');
