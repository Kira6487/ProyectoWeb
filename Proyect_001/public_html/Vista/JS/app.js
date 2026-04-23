/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import { registrarUsuario } from "../../Controlador/registroController.js";
import { iniciarSesion } from "../../Controlador/loginController.js";
import { agendarCita } from "../../Controlador/citaController.js";
import { guardarReclamacion } from "../../Controlador/reclamacionController.js";
import { guardarSugerencia } from "../../Controlador/sugerenciaController.js";
import { inicializarModales } from "./uiController.js"; // ajusta ruta si cambia

/* REGISTRO */
const formRegistro = document.querySelector(".registro-form");

if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = formRegistro.querySelectorAll("input");

        let datos = {
            nombres: inputs[0].value,
            apellidos: inputs[1].value,
            telefono: inputs[2].value,
            correo: inputs[3].value,
            password: inputs[4].value
        };

        registrarUsuario(datos);
    });
}

/* LOGIN */
const formLogin = document.querySelector(".login-form");

if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = formLogin.querySelectorAll("input");

        iniciarSesion(inputs[0].value, inputs[1].value);
    });
}

/* CITA */
const formCita = document.querySelector(".form-cita");

if (formCita) {
    formCita.addEventListener("submit", (e) => {
        e.preventDefault();

        const servicio = document.getElementById("servicio").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;

        if (!servicio || !fecha || !hora) {
            alert("Completa todos los campos");
            return;
        }

        const hoy = new Date().toISOString().split("T")[0];
        if (fecha < hoy) {
            alert("No puedes seleccionar una fecha pasada");
            return;
        }

        let citas = JSON.parse(localStorage.getItem("citas")) || [];

        let existe = citas.find(c => c.fecha === fecha && c.hora === hora);

        if (existe) {
            alert("Ya hay una cita registrada en ese horario");
            return;
        }

        agendarCita(servicio, fecha, hora);
        formCita.reset();
    });
}

/* SUGERENCIAS */
const formSugerencia = document.querySelector(".form-sugerencia");

if (formSugerencia) {

    // autocompletar
    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario) {
        document.getElementById("nombre").value = usuario.nombres + " " + usuario.apellidos;
        document.getElementById("correo").value = usuario.correo;
        document.getElementById("telefono").value = usuario.telefono;
    }

    formSugerencia.addEventListener("submit", (e) => {
        e.preventDefault();

        let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

        if (!usuario) {
            alert("Debes iniciar sesión");
            window.location.href = "login.html";
            return;
        }

        const comentario = document.getElementById("comentario").value;

        if (!comentario) {
            alert("Escribe un comentario");
            return;
        }

        guardarSugerencia(usuario, comentario);
        formSugerencia.reset();
    });
}

/* RECLAMACIONES */
const formReclamacion = document.querySelector(".form-reclamacion");

if (formReclamacion) {

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario) {
        document.getElementById("nombre").value = usuario.nombres + " " + usuario.apellidos;
        document.getElementById("telefono").value = usuario.telefono;
        document.getElementById("correo").value = usuario.correo;
    }

    formReclamacion.addEventListener("submit", (e) => {
        e.preventDefault();

        let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

        if (!usuario) {
            alert("Debes iniciar sesión");
            window.location.href = "login.html";
            return;
        }

        const data = {
            nombre: document.getElementById("nombre").value,
            domicilio: document.getElementById("domicilio").value,
            tipoDoc: document.getElementById("tipoDoc").value,
            numeroDoc: document.getElementById("numeroDoc").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            tipoBien: document.getElementById("tipoBien").value,
            monto: document.getElementById("monto").value,
            descripcion: document.getElementById("descripcion").value,
            tipoReclamo: document.getElementById("tipoReclamo").value,
            detalle: document.getElementById("detalle").value,
            pedido: document.getElementById("pedido").value
        };

        guardarReclamacion(data);
        formReclamacion.reset();
    });
}

/* MODALES */
document.addEventListener("DOMContentLoaded", () => {
    inicializarModales();
});