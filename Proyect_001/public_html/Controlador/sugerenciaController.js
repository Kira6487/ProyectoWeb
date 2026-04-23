/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import { Sugerencia } from "../Modelo/Sugerencia.js";

export function guardarSugerencia(usuario, comentario) {

    const nueva = new Sugerencia(usuario.correo, comentario);

    let sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];

    sugerencias.push(nueva);

    localStorage.setItem("sugerencias", JSON.stringify(sugerencias));

    alert("Gracias por tu sugerencia 💖");
}