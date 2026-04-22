/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import { Cita } from "../Modelo/Cita.js";

export function agendarCita(servicio, fecha, hora) {

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario) {
        alert("Debes iniciar sesión primero");
        return;
    }

    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    let nuevaCita = new Cita(usuario.correo, servicio, fecha, hora);

    citas.push(nuevaCita);

    localStorage.setItem("citas", JSON.stringify(citas));

    alert("Cita agendada correctamente");
}