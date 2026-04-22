/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


export function iniciarSesion(correo, password) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert("Bienvenido " + usuario.nombres);
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
}