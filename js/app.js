import { validarEmail, validarNomApe } from "./validaciones.js";
import { addCustomPToModalError,
        textoValidarNomApe,
        textoValidarEmail,
        textoValidarNegativo,
        elegirCategoria,
        mostrarModalError,
        setValorFinalPorCategoria } from "./auxFunctions.js";

/* Referencias a formularios error y de tickets */
const $modalError = document.querySelector("#modal-error");
const $modalTicket = document.querySelector("#staticModalTicket");
const $modalBodyError = document.querySelector("#modal-error-body");

/* Referencia de elementos del formulario de Tickets */
const $inputCantidad = document.querySelector("#form-cantidad");
const $inputStaticValorFinal = document.querySelector("#valor-final");
const $optionList = document.querySelector("#form-categorias");
const $inputNombre = document.querySelector("#form-nombre");
const $inputApellido = document.querySelector("#form-apellido");
const $inputEmail = document.querySelector("#form-email");

/* Referencias a los boxes de descuento y el select del formulario tickets */
const $contenedorDescuentos = document.querySelector("#categorias-descuento");
const $selectCategorias = document.querySelector("#form-categorias");
const $boxEstudiante = document.querySelector("#box-estudiante");
const $boxTrainee = document.querySelector("#box-trainee");
const $boxJunior = document.querySelector("#box-junior");

/* Creo un modal que servirá para mostrar encima del modal de tickets (manejo de errores) */
addCustomPToModalError($modalBodyError);
const newModal = new bootstrap.Modal("#modal-error", { keyboard: false });

/* Referencia a los parrafos internos del modal Error*/
const $pText1 = document.querySelector("#text-node1");
const $pText2 = document.querySelector("#text-node2");
const $pText3 = document.querySelector("#text-node3");
const $pText4 = document.querySelector("#text-node4");

$modalTicket.addEventListener("click", (e) => {
    if (e.target.matches("#form-btn-resumen")){
        e.preventDefault();
        if (!validarNomApe($inputNombre) || !validarNomApe($inputApellido)){
            // Si falla al validar nombre o apellido, muestro el modal error con el texto correspondiente
            textoValidarNomApe($pText1, $pText2, $pText3, $pText4);
            mostrarModalError($modalError, $modalTicket, newModal);
        } else if (!validarEmail($inputEmail)){
            // Si falla al validar email, muestro el modal error con el texto correspondiente
            textoValidarEmail($pText1, $pText2, $pText3, $pText4);
            mostrarModalError($modalError, $modalTicket, newModal);
        } else{
            if (Number($inputCantidad.value) < 0){
                // Si falla al validar cantidad positiva, muestro el modal error con el texto correspondiente
                textoValidarNegativo($pText1, $pText2, $pText3, $pText4);
                mostrarModalError($modalError, $modalTicket, newModal);
            } else{
                // Si pasa las validaciones, realizo el cálculo correspondiente según cada descuento
                setValorFinalPorCategoria($optionList, $inputStaticValorFinal, $inputCantidad);
            }
        }        
    }
    if (e.target.matches("#form-btn-borrar")){
        e.preventDefault();
        // Limpio todos los inputs y el optionlist por defecto
        $inputNombre.value = "";
        $inputApellido.value = "";
        $inputEmail.value = "";
        $inputStaticValorFinal.value = "Total a pagar: $";
        $inputCantidad.value = 1;
        $optionList.options.selectedIndex = 0;
    }
});

/* Boxes descuento - Funcionalidad como botones */
elegirCategoria($boxEstudiante, 1, $selectCategorias);
elegirCategoria($boxTrainee, 2, $selectCategorias);
elegirCategoria($boxJunior, 3, $selectCategorias);

$contenedorDescuentos.addEventListener("click", e => {
    if (e.target.matches("#box-estudiante")) $selectCategorias.value = 1;
    if (e.target.matches("#box-trainee")) $selectCategorias.value = 2;
    if (e.target.matches("#box-junior")) $selectCategorias.value = 3;
});

/* Sección para navbar */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}