/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import { Usuario } from "../Modelo/Usuario.js";

export function registrarUsuario(datos) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe
    let existe = usuarios.find(u => u.correo === datos.correo);
    if (existe) {
        alert("El correo ya está registrado");
        return;
    }

    let nuevoUsuario = new Usuario(
        datos.nombres,
        datos.apellidos,
        datos.telefono,
        datos.correo,
        datos.password
    );

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");
    window.location.href = "login.html";
}