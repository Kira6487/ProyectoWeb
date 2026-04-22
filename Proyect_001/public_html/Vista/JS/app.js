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