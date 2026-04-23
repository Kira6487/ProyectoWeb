/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import { Reclamacion } from "../Modelo/Reclamacion.js";

export function guardarReclamacion(data) {

    const nueva = new Reclamacion(data);

    let reclamaciones = JSON.parse(localStorage.getItem("reclamaciones")) || [];

    reclamaciones.push(nueva);

    localStorage.setItem("reclamaciones", JSON.stringify(reclamaciones));

    alert("Reclamación enviada correctamente");
}