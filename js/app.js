import { createModalTickets } from "./dynamicModal.js";
/* Formulario */
const $modalError = document.querySelector("#modal-error");
const $contenedorModalTicket = document.querySelector("#modalTickets");
const $modalTickets = createModalTickets();
$contenedorModalTicket.appendChild($modalTickets);
const $formTickets = document.forms[1];
const $modalBodyError = document.querySelector("#modal-error-body");
const $textNode = document.createElement("p");
$modalBodyError.appendChild($textNode);
const newModal = new bootstrap.Modal("#modal-error", {keyboard: false});
const $inputCantidad = document.querySelector("#form-cantidad");
const $inputStaticValorFinal = document.querySelector("#valor-final");
const $optionList = document.querySelector("#form-categorias");

$modalTickets.addEventListener("click", (e) => {
    if (e.target.matches("#form-btn-resumen")){
        e.preventDefault();
        if (ValidarCampos() == -1){
            $textNode.textContent = "¡Los campos nombre y apellido no deben estar vacíos!";
            newModal.show($modalError);
            $modalTickets.classList.add("background-hidden");
            $modalError.addEventListener("hide.bs.modal", () => {
                $modalTickets.classList.remove("background-hidden");
            });
        } else if (ValidarCampos() == -2){
            $textNode.textContent = "¡Se debe ingresar un email válido!";
            newModal.show($modalError);
            $modalTickets.classList.add("background-hidden");
            $modalError.addEventListener("hide.bs.modal", () => {
                $modalTickets.classList.remove("background-hidden");
            });
        } else{
            if (parseInt($inputCantidad.value) < 0){
                $textNode.textContent = "No es posible calcular el valor final en base a una cantidad negativa.";
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
        })
    }    
});
function ValidarCampos(){
    const $inputNombre = document.querySelector("#form-nombre");
    const $inputApellido = document.querySelector("#form-apellido");
    const $inputEmail = document.querySelector("#form-email");
    if ($inputNombre.value.length == 0 || $inputApellido.value.length == 0){
        return -1;
    } else if(ValidarEmail($inputEmail)){
        return -2;
    }
}

function ValidarEmail(inputEmail){
    return (inputEmail.value.length == 0 
        || inputEmail.value.split("@")[1] == undefined 
        || inputEmail.value.split("@")[1].length == 0
        || inputEmail.value.split(".")[1] == undefined
        || inputEmail.value.split(".")[1].length == 0)
}

/* ------------------------------------------------- */
/* Boxes descuento - Funcionalidad como botones */
const $contenedorDescuentos = document.querySelector("#categorias-descuento");
const $selectCategorias = document.querySelector("#form-categorias");
const $boxEstudiante = document.querySelector("#box-estudiante");
const $boxTrainee = document.querySelector("#box-trainee");
const $boxJunior = document.querySelector("#box-junior");

ElegirCategoria($boxEstudiante, 1);
ElegirCategoria($boxTrainee, 2);
ElegirCategoria($boxJunior, 3);

if ($contenedorDescuentos != null){
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
}

function ElegirCategoria(emisor, numeroCategoria){
    if (emisor != null){
        emisor.addEventListener("click", event => {
            if (event.target.matches(".text-center")){
                $selectCategorias.value = numeroCategoria;
            }
        });
    }
}
/* ------------------------------------------------- */