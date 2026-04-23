/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


export function inicializarModales() {

    const servicios = document.querySelectorAll(".servicio");

    servicios.forEach(servicio => {
        servicio.addEventListener("click", () => {
            const modalId = servicio.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            if (modal) modal.style.display = "block";
        });
    });

    // cerrar con botón
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
}