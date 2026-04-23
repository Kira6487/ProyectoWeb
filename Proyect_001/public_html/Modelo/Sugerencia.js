/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


export class Sugerencia {
    constructor(usuario, comentario) {
        this.usuario = usuario;
        this.comentario = comentario;
        this.fecha = new Date().toLocaleString();
    }
}