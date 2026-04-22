const { Given, When, Then, After } = require('cucumber');
const request = require('sync-request');
const assert = require('assert');

let clienteParaEnviar = {};
let respuestaDelServidor = {};

Given(/^que se ingresa el cliente con (.*), "([^"]*)" y "([^"]*)"$/, function (nombre, cuit, observaciones) {
    clienteParaEnviar = {
        nombre: nombre.replace(/"/g, "").trim(),
        cuit: cuit.trim(), 
        observaciones: observaciones || ""
    };
});

When('presiono el botón de guardar', function () {
    const res = request('POST', 'http://backend:8080/empresas', {
        json: clienteParaEnviar
    });
    respuestaDelServidor = JSON.parse(res.getBody('utf8'));
});


Then(/^se espera la siguiente (.*)$/, function (respuestaEsperada) {
    assert.strictEqual(respuestaDelServidor.message.trim(), respuestaEsperada.trim());
});
