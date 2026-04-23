/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


export class Reclamacion {
    constructor(data) {
        this.nombre = data.nombre;
        this.domicilio = data.domicilio;
        this.tipoDoc = data.tipoDoc;
        this.numeroDoc = data.numeroDoc;
        this.telefono = data.telefono;
        this.correo = data.correo;

        this.tipoBien = data.tipoBien;
        this.monto = data.monto;
        this.descripcion = data.descripcion;

        this.tipoReclamo = data.tipoReclamo;
        this.detalle = data.detalle;
        this.pedido = data.pedido;

        this.fecha = new Date().toLocaleString();
    }
}