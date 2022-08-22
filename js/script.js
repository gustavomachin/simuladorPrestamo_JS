
/* Calcular préstamo */
const btnAbrirModalPrestamo = document.querySelector("#btn-abrir-modal-prestamo");
const btnCerrarModalPrestamo = document.querySelector("#btn-cerrar-modal-prestamo");
const modalPrestamo = document.querySelector("#modal-prestamo");
/* Solicitar préstamo*/
const btnAbirModalAplicar = document.querySelector("#btn-abrir-modal-aplicar");
const btnCerrarModalAplicar = document.querySelector("#btn-cerrar-modal-aplicar");
const modalAplicar = document.querySelector("#modal-aplicar");
const btnEnviarLink = document.querySelector("#btn-enviar-link");
const flexSwitch = document.querySelector("#flexSwitchCheckDefault");
const divAgregado = document.querySelector("#datosCalculados");

/* Función calcular monto final y cuota*/
function calculoPrestamo(dineroPrestado, cantidadCuotas) {
    let interes = 10 /*aca quisiera conectar con una API*/
    let cuota = (dineroPrestado*(interes/100))/(1-(1+(interes/100))**(-cantidadCuotas));
    let totalAdevolver = cuota * cantidadCuotas;
    return {
        montoPorCuota: cuota,
        montoFinal: totalAdevolver
    }
}
/* Función para visualizar la simulación del préstamo*/
function modalAgregado(resultado, dineroPrestado, cantidadCuotas) {
    const titulo = document.querySelector("#titulo")
    const primera = document.querySelector("#primera");
    const segunda = document.querySelector("#segunda");
    const tercera = document.querySelector("#tercera");
    const cuarta = document.querySelector("#cuarta");
    titulo.textContent = "Datos del credito simulado";
    primera.textContent = "Monto solicitado: $" + dineroPrestado;
    segunda.textContent = "Cantidad de cuotas: " + cantidadCuotas;
    tercera.textContent = "Monto a devolver: $" + resultado.montoFinal.toFixed(2);
    cuarta.textContent = "Tus cuotas seran de: $" + resultado.montoPorCuota.toFixed(2);
}
/* Función para mostrar u ocultar en la sección Solicitar préstamo los datos calculados en la sección de simular préstamo */
function mostrarDatos() {
    const datosRecuperados = JSON.parse(sessionStorage.getItem("datosCalculo"));
    if (datosRecuperados) {
        let htmlagregado = `<ul id="remove">
   <li>Dinero solicitado: $${datosRecuperados.montoPrestado}</li>
   <li>Cuotas elegidas : $${datosRecuperados.cuotasElegidas}</li>`;
        divAgregado.innerHTML = htmlagregado;
    } else {
        let noDatos = `<p class="no-datos" id="remove">No calculaste ningun préstamo todavía.</p>`
        divAgregado.innerHTML = noDatos;
    }
}
function ocultarDatos() {
    const divRemove = document.getElementById("remove");
    divRemove.remove();
}

/* Botones */

btnAbrirModalPrestamo.addEventListener("click", () => {
    let dineroPrestado = document.getElementById("inputmonto").value;
    let cantidadCuotas = document.getElementById("inputcuotas").value;
    const resultado = calculoPrestamo(dineroPrestado, cantidadCuotas);
    modalAgregado(resultado, dineroPrestado, cantidadCuotas);
    const datosCalculo = {
        "montoPrestado": dineroPrestado,
        "cuotasElegidas": cantidadCuotas
    }
    sessionStorage.setItem("datosCalculo", JSON.stringify(datosCalculo));
})

btnEnviarLink.addEventListener("click", () => {
    let nombreSolicitante = document.getElementById("inputnombre").value;
    let apellidoSolicitante = document.getElementById("inputapellido").value;
    let emailSolicitante = document.getElementById("inputemail").value;
    const datosSolicitante = {
        "Nombre": nombreSolicitante,
        "apellido": apellidoSolicitante,
        "email": emailSolicitante
    }
    sessionStorage.setItem("datosSolicitante", JSON.stringify(datosSolicitante));
    //Librería Sweet Alert
    Swal.fire({
        icon: 'success',
        title: 'Tus datos se registraron correctamente',
        text: 'En los siguientes minutos te llegara un mail',
        showConfirmButton: false,
        timer: 2500
    })
    modalAplicar.close();
})

flexSwitch.addEventListener("click", (event) => {
    const checkboxtrue = event.currentTarget.checked;
    checkboxtrue ? mostrarDatos() : ocultarDatos();
})

btnAbrirModalPrestamo.addEventListener("click", () => {
    modalPrestamo.showModal();
});

btnCerrarModalPrestamo.addEventListener("click", () => {
    modalPrestamo.close();
})

btnAbirModalAplicar.addEventListener("click", () => {
    modalAplicar.showModal();
})

btnCerrarModalAplicar.addEventListener("click", () => {
    modalAplicar.close();
})