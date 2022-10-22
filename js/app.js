import { createModalTickets, createElementCustom } from "./dynamicModal.js";
import { validarEmail, validarNomApe } from "./validaciones.js";
/* Formulario */
const $modalError = document.querySelector("#modal-error");
const $contenedorModalTicket = document.querySelector("#modalTickets");
const $modalTickets = createModalTickets();
$contenedorModalTicket.appendChild($modalTickets);
const $formTickets = document.forms[1];
const $modalBodyError = document.querySelector("#modal-error-body");
const $textNode1 = createElementCustom("p", [], "", {});
const $textNode2 = createElementCustom("p", [], "", {});
const $textNode3 = createElementCustom("p", [], "", {});
const $textNode4 = createElementCustom("p", [], "", {});
$modalBodyError.appendChild($textNode1);
$modalBodyError.appendChild($textNode2);
$modalBodyError.appendChild($textNode3);
$modalBodyError.appendChild($textNode4);
const newModal = new bootstrap.Modal("#modal-error", {keyboard: false});
const $inputCantidad = document.querySelector("#form-cantidad");
const $inputStaticValorFinal = document.querySelector("#valor-final");
const $optionList = document.querySelector("#form-categorias");
const $inputNombre = document.querySelector("#form-nombre");
const $inputApellido = document.querySelector("#form-apellido");
const $inputEmail = document.querySelector("#form-email");

$modalTickets.addEventListener("click", (e) => {
    if (e.target.matches("#form-btn-resumen")){
        e.preventDefault();
        if (validarNomApe($inputNombre) == -1 || validarNomApe($inputApellido) == -1){
            $textNode1.textContent = "Los campos nombre y apellido deben tener:";
            $textNode2.textContent = "- Mínimo 3 caracteres y máximo 24.";
            $textNode3.textContent = "- Puede contener acentos y mayúsculas.";
            $textNode4.textContent = "";
            newModal.show($modalError);
            $modalTickets.classList.add("background-hidden");
            $modalError.addEventListener("hide.bs.modal", () => {
                $modalTickets.classList.remove("background-hidden");
            });
        } else if (validarEmail($inputEmail) == -1){
            $textNode1.textContent = "El campo email debe cumplir los siguientes requisitos:";
            $textNode2.textContent = "- Debe tener @.";
            $textNode3.textContent = "- Debe contener un dominio correcto.";
            $textNode4.textContent = "- No debe tener puntos el nombre del correo.";
            newModal.show($modalError);
            $modalTickets.classList.add("background-hidden");
            $modalError.addEventListener("hide.bs.modal", () => {
                $modalTickets.classList.remove("background-hidden");
            });
        } else{
            if (parseInt($inputCantidad.value) < 0){
                $textNode1.textContent = "No es posible calcular el valor final en base a una cantidad negativa.";
                newModal.show($modalError);
                $modalTickets.classList.add("background-hidden");
                $modalError.addEventListener("hide.bs.modal", () => {
                    $modalTickets.classList.remove("background-hidden");
                });
            } else{
                $inputStaticValorFinal.value = "Total a pagar: $";
                let valorFinalBruto = parseInt($inputCantidad.value) * 200;
                switch ($optionList.selectedIndex){
                    case 0:
                        $inputStaticValorFinal.value += valorFinalBruto;
                        break;
                    case 1:
                        $inputStaticValorFinal.value += valorFinalBruto - (valorFinalBruto * 0.8);
                        break;
                    case 2:
                        $inputStaticValorFinal.value += valorFinalBruto - (valorFinalBruto * 0.5);
                        break;
                    case 3:
                        $inputStaticValorFinal.value += valorFinalBruto - (valorFinalBruto * 0.15);
                        break;
                }
            }
        }        
    }
    if (e.target.matches("#form-btn-borrar")){
        e.preventDefault();
        /* Totalmente innecesario esta parte, ya que podría haber accedido por ID a cada uno de los elementos
           y setear los valores que correspondiera para vaciarlos. Pero quería accederlo haciendo uso de las
           NodeList, utilizando forEach y entendiendo un poco más del DOM. 
        */
        $formTickets.childNodes.forEach((nodeRow) => {
            if (nodeRow.nodeName == "DIV" && nodeRow.classList.contains("row")){
                nodeRow.childNodes.forEach((nodeCol) => {
                    if (nodeCol.nodeName == "DIV"){
                        if (nodeCol.classList.contains("col-name")){
                            nodeCol.firstElementChild.value = "";
                        }
                        if (nodeCol.classList.contains("col-surname")){
                            nodeCol.firstElementChild.value = "";
                        }
                        if (nodeCol.classList.contains("col")){
                            switch(nodeCol.firstElementChild.id){
                                case "form-email":
                                    nodeCol.firstElementChild.value = "";
                                    break;
                                case "valor-final":
                                    nodeCol.firstElementChild.value = "Total a pagar: $";
                                    break;
                            }
                            switch(nodeCol.lastElementChild.id){
                                case "form-cantidad":
                                    nodeCol.lastElementChild.value = 1;
                                    break;
                                case "form-categorias":
                                    nodeCol.lastElementChild.options.selectedIndex = 0;
                                    break;
                            }
                        }
                    }
                })
            }
        });
    }
});

/* Boxes descuento - Funcionalidad como botones */
const $contenedorDescuentos = document.querySelector("#categorias-descuento");
const $selectCategorias = document.querySelector("#form-categorias");
const $boxEstudiante = document.querySelector("#box-estudiante");
const $boxTrainee = document.querySelector("#box-trainee");
const $boxJunior = document.querySelector("#box-junior");

ElegirCategoria($boxEstudiante, 1);
ElegirCategoria($boxTrainee, 2);
ElegirCategoria($boxJunior, 3);

$contenedorDescuentos.addEventListener("click", e => {
    if (e.target.matches("#box-estudiante")){
        $selectCategorias.value = 1;
    }
    if(e.target.matches("#box-trainee")){
        $selectCategorias.value = 2;
    }
    if(e.target.matches("#box-junior")){
        $selectCategorias.value = 3;
    }
});

function ElegirCategoria(emisor, numeroCategoria){
    if (emisor != null){
        emisor.addEventListener("click", event => {
            if (event.target.matches(".text-center")){
                $selectCategorias.value = numeroCategoria;
            }
        });
    }
}