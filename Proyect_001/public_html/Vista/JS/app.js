/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import { registrarUsuario } from "../../Controlador/registroController.js";
import { iniciarSesion } from "../../Controlador/loginController.js";
import { agendarCita } from "../../Controlador/citaController.js";

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

        // 🔴 VALIDACIONES

        if (!servicio || !fecha || !hora) {
            alert("Completa todos los campos");
            return;
        }

        // ❌ No permitir fechas pasadas
        const hoy = new Date().toISOString().split("T")[0];
        if (fecha < hoy) {
            alert("No puedes seleccionar una fecha pasada");
            return;
        }

        // ❌ Validar si ya existe una cita en ese horario
        let citas = JSON.parse(localStorage.getItem("citas")) || [];

        let existe = citas.find(c => c.fecha === fecha && c.hora === hora);

        if (existe) {
            alert("Ya hay una cita registrada en ese horario");
            return;
        }

        // ✅ Todo correcto → guardar
        agendarCita(servicio, fecha, hora);

        // 🧹 Limpiar formulario
        formCita.reset();
    });
}

/* SUGERENCIAS */
const formSugerencia = document.querySelector(".form-sugerencia");

if (formSugerencia) {

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    // ✅ Si está logueado → autocompletar
    if (usuario) {
        document.getElementById("nombre").value = usuario.nombres + " " + usuario.apellidos;
        document.getElementById("correo").value = usuario.correo;
        document.getElementById("telefono").value = usuario.telefono;
    }

    formSugerencia.addEventListener("submit", (e) => {
        e.preventDefault();

        let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

        // 🚫 VALIDACIÓN AL ENVIAR (no al entrar)
        if (!usuario) {
            alert("Debes iniciar sesión para enviar una sugerencia");
            window.location.href = "login.html";
            return;
        }

        const comentario = document.getElementById("comentario").value;

        if (!comentario) {
            alert("Escribe un comentario");
            return;
        }

        let sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];

        sugerencias.push({
            usuario: usuario.correo,
            comentario: comentario,
            fecha: new Date().toLocaleString()
        });

        localStorage.setItem("sugerencias", JSON.stringify(sugerencias));

        alert("Gracias por tu sugerencia 💖");

        formSugerencia.reset();

        // 🔁 volver a rellenar datos
        document.getElementById("nombre").value = usuario.nombres + " " + usuario.apellidos;
        document.getElementById("correo").value = usuario.correo;
        document.getElementById("telefono").value = usuario.telefono;
    });
}

/* RECLAMACIONES */
const formReclamacion = document.querySelector(".form-reclamacion");

if (formReclamacion) {

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Autocompletar si está logueado
    if (usuario) {
        document.getElementById("nombre").value = usuario.nombres + " " + usuario.apellidos;
        document.getElementById("telefono").value = usuario.telefono;
        document.getElementById("correo").value = usuario.correo;
    }

    formReclamacion.addEventListener("submit", (e) => {
        e.preventDefault();

        let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

        // Validación de sesión
        if (!usuario) {
            alert("Debes iniciar sesión para enviar una reclamación");
            window.location.href = "login.html";
            return;
        }

        let data = {
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
            pedido: document.getElementById("pedido").value,

            fecha: new Date().toLocaleString()
        };

        let reclamaciones = JSON.parse(localStorage.getItem("reclamaciones")) || [];

        reclamaciones.push(data);

        localStorage.setItem("reclamaciones", JSON.stringify(reclamaciones));

        alert("Reclamación enviada correctamente");

        formReclamacion.reset();

        // volver a rellenar
        document.getElementById("nombre").value = usuario.nombres + " " + usuario.apellidos;
        document.getElementById("telefono").value = usuario.telefono;
        document.getElementById("correo").value = usuario.correo;
    });
}

/* MODALES SERVICIOS */

const servicios = document.querySelectorAll(".servicio");

servicios.forEach(servicio => {
    servicio.addEventListener("click", () => {
        const modalId = servicio.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "block";
    });
});

// cerrar modal
const botonesCerrar = document.querySelectorAll(".cerrar");

botonesCerrar.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal").style.display = "none";
    });
});

// cerrar haciendo click fuera
window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});