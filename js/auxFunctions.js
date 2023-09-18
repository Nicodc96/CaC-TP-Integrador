const addCustomPToModalError = (modalErrorReference) => {
    const $textNode1 = createElementCustom("p", [], "", {"id":"text-node1"});
    const $textNode2 = createElementCustom("p", [], "", {"id":"text-node2"});
    const $textNode3 = createElementCustom("p", [], "", {"id":"text-node3"});
    const $textNode4 = createElementCustom("p", [], "", {"id":"text-node4"});
    modalErrorReference.appendChild($textNode1);
    modalErrorReference.appendChild($textNode2);
    modalErrorReference.appendChild($textNode3);
    modalErrorReference.appendChild($textNode4);
}
const createElementCustom = (tipoElemento, clases, contenidoTexto, atributos) => {
    const newElement = document.createElement(tipoElemento);
    if (Array.isArray(clases) && clases.length > 0){
        newElement.classList.add(...clases);
    }
    if (contenidoTexto.length > 0 && contenidoTexto != null && contenidoTexto != undefined){
        newElement.textContent = contenidoTexto;
    }
    if (typeof(atributos) == "object"){
        Object.keys(atributos).forEach((atributo) => {
            newElement.setAttribute(atributo, atributos[atributo]);
        })
    }
    return newElement;
}
const textoValidarNomApe = (textNode1, textNode2, textNode3, textNode4) => {
    textNode1.textContent = "Los campos nombre y apellido deben tener:";
    textNode2.textContent = "- Mínimo 3 caracteres y máximo 24.";
    textNode3.textContent = "- Puede contener acentos y mayúsculas.";
    textNode4.textContent = "";
}
const textoValidarEmail = (textNode1, textNode2, textNode3, textNode4) => {
    textNode1.textContent = "El campo email debe cumplir los siguientes requisitos:";
    textNode2.textContent = "- Debe tener @.";
    textNode3.textContent = "- Debe contener un dominio correcto.";
    textNode4.textContent = "- No debe tener puntos el nombre del correo.";
}
const textoValidarNegativo = (textNode1, textNode2, textNode3, textNode4) => {
    textNode1.textContent = "No es posible calcular el valor final en base a una cantidad negativa.";
    textNode2.textContent = "";
    textNode3.textContent = "";
    textNode4.textContent = "";
}
const elegirCategoria = (emisor, numeroCategoria, referenciaSelectCategorias) => {
    if (emisor){
        emisor.addEventListener("click", event => {
            if (event.target.matches(".text-center")){
                referenciaSelectCategorias.value = numeroCategoria;
            }
        });
    }
}
const mostrarModalError = (referenciaModalError, referenciaModalTicket, nuevoModal) => {
    nuevoModal.show(referenciaModalError);
    referenciaModalTicket.classList.add("background-hidden");
    referenciaModalError.addEventListener("hide.bs.modal", () => {
        referenciaModalTicket.classList.remove("background-hidden");
    });
}
const setValorFinalPorCategoria = (referenciaOptionList, referenciaInputValorFinal, referenciaInputCantidad) => {
    referenciaInputValorFinal.value = "Total a pagar: $";
    let valorFinalBruto = Number(referenciaInputCantidad.value) * 200;
    switch (referenciaOptionList.selectedIndex){
        case 0:
            referenciaInputValorFinal.value += valorFinalBruto;
            break;
        case 1:
            referenciaInputValorFinal.value += valorFinalBruto - (valorFinalBruto * 0.8);
            break;
        case 2:
            referenciaInputValorFinal.value += valorFinalBruto - (valorFinalBruto * 0.5);
            break;
        case 3:
            referenciaInputValorFinal.value += valorFinalBruto - (valorFinalBruto * 0.15);
            break;
    }
}

export { addCustomPToModalError, 
    createElementCustom, 
    textoValidarNomApe, 
    textoValidarEmail, 
    textoValidarNegativo, 
    elegirCategoria, 
    mostrarModalError, 
    setValorFinalPorCategoria }