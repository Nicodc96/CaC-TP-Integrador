function createModalTickets(){
    const $modalPrincipal = document.createElement("div");
    /* Div modal principal */
    $modalPrincipal.setAttribute("id", "staticModalTicket");
    $modalPrincipal.setAttribute("data-bs-backdrop", "static");
    $modalPrincipal.setAttribute("data-bs-keyboard", "false");
    $modalPrincipal.setAttribute("tabindex", "-1");
    $modalPrincipal.setAttribute("aria-labelledby", "staticBackdropLabel");
    $modalPrincipal.setAttribute("aria-hidden", "hidden");
    $modalPrincipal.classList.add("modal", "fade");
    /* ------------------- */
    const $modalDialog = document.createElement("div");
    $modalPrincipal.appendChild($modalDialog);
    /* Div modal dialog */
    $modalDialog.classList.add("modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable");
    /* Div modal content */
    const $modalContent = document.createElement("div");
    $modalContent.classList.add("modal-content");
    $modalDialog.appendChild($modalContent);
    /* Agrego los elementos creados al modal content */    
    $modalContent.appendChild(modalHeaderTicket());
    $modalContent.appendChild(modalBodyTicket());
    $modalContent.appendChild(modalFooterTicket());
    /* Devuelvo el modal completo */
    return $modalPrincipal;
}

function modalHeaderTicket(){
    const $modalHeader = document.createElement("div");
    const $h1 = document.createElement("h1");
    const $botonCerrar = document.createElement("button");
    // ---------------- //
    $h1.classList.add("modal-title", "fs-5");
    $h1.setAttribute("id", "staticBackdropLabel");
    $h1.textContent = "Compre su Ticket:";
    // ---------------- //
    $botonCerrar.classList.add("btn-close");
    $botonCerrar.setAttribute("data-bs-dismiss", "modal");
    $botonCerrar.setAttribute("aria-label", "close");
    // ---------------- //
    $modalHeader.classList.add("modal-header");
    $modalHeader.appendChild($h1);
    $modalHeader.appendChild($botonCerrar);
    return $modalHeader;
}

function modalBodyTicket(){
    const $modalBody = document.createElement("div");
    // ---------------- //
    const $divContenedorCategorias = document.createElement("div");
    $divContenedorCategorias.classList.add("d-flex", "gap-1");
    $divContenedorCategorias.setAttribute("id", "categorias-descuento");
    for (let i = 0; i < 3; i++){
        let newDiv = document.createElement("div");
        newDiv.classList.add("box-categoria");
        $divContenedorCategorias.appendChild(newDiv);
    }
    $divContenedorCategorias.childNodes[0].classList.add("categoria-estudiante");
    $divContenedorCategorias.childNodes[1].classList.add("categoria-trainee");
    $divContenedorCategorias.childNodes[2].classList.add("categoria-junior");
    /* ---------------------------- */
    $divContenedorCategorias.childNodes.forEach((nodo) => {
        if (nodo.classList.contains("categoria-estudiante")){
            nodo.setAttribute("id", "box-estudiante");
            nodo.appendChild(createElementCustom("p", ["text-center", "fw-semibold", "pt-3"], "Estudiante", {}));
            nodo.appendChild(createElementCustom("p", ["text-center"], "Tienen un descuento", {}));
            nodo.appendChild(createElementCustom("p", ["text-center", "fw-bold"], "80%", {}));
            nodo.appendChild(createElementCustom("p", ["text-center", "text-secondary"], "* presentar documentación", {"id":"text-documentacion"}));
        }
        if (nodo.classList.contains("categoria-trainee")){
            nodo.setAttribute("id", "box-trainee");
            nodo.appendChild(createElementCustom("p", ["text-center", "fw-semibold", "pt-3"], "Trainee", {}));
            nodo.appendChild(createElementCustom("p", ["text-center"], "Tienen un descuento", {}));
            nodo.appendChild(createElementCustom("p", ["text-center", "fw-bold"], "50%", {}));
            nodo.appendChild(createElementCustom("p", ["text-center", "text-secondary"], "* presentar documentación", {"id":"text-documentacion"}));
        }
        if (nodo.classList.contains("categoria-junior")){
            nodo.setAttribute("id", "box-junior");
            nodo.appendChild(createElementCustom("p", ["text-center", "fw-semibold", "pt-3"], "Junior", {}));
            nodo.appendChild(createElementCustom("p", ["text-center"], "Tienen un descuento", {}));
            nodo.appendChild(createElementCustom("p", ["text-center", "fw-bold"], "15%", {}));
            nodo.appendChild(createElementCustom("p", ["text-center", "text-secondary"], "* presentar documentación", {"id":"text-documentacion"}));
        }
    });
    // ---------------- //
    const $formularioTicket = document.createElement("form");
    $formularioTicket.setAttribute("id", "form-tickets");
    for (let i = 0; i < 4; i++){
        if (i == 0){
            let divRow = document.createElement("div");
            divRow.classList.add("row");
            $formularioTicket.appendChild(divRow);
        } else{
            let divRowPt3 = document.createElement("div");
            divRowPt3.classList.add("row", "pt-3");
            $formularioTicket.appendChild(divRowPt3);
        }
    }
    $formularioTicket.childNodes.forEach((nodo) => {
        if (!nodo.classList.contains("pt-3")){
            const $divColName = document.createElement("div");
            const $inputName = document.createElement("input");
            $divColName.classList.add("col", "col-name");
            $inputName.classList.add("form-control");
            $inputName.setAttribute("type", "text");
            $inputName.setAttribute("placeholder", "Nombre");
            $inputName.setAttribute("id", "form-nombre");
            $divColName.appendChild($inputName);
            // --------------- //
            const $divColApellido = document.createElement("div");
            const $inputApellido = document.createElement("input");
            $divColApellido.classList.add("col", "col-surname");
            $inputApellido.classList.add("form-control");
            $inputApellido.setAttribute("type", "text");
            $inputApellido.setAttribute("placeholder", "Apellido");
            $inputApellido.setAttribute("id", "form-apellido");
            $divColApellido.appendChild($inputApellido);
            // --------------- //
            nodo.appendChild($divColName);
            nodo.appendChild($divColApellido);
        } else{
            let $divCol = document.createElement("div");
            $divCol.classList.add("col");
            nodo.appendChild($divCol);
        }
    });
    $formularioTicket.childNodes[1].childNodes.forEach((nodo) => {
        const $inputEmail = document.createElement("input");
        $inputEmail.classList.add("form-control");
        $inputEmail.setAttribute("type", "email");
        $inputEmail.setAttribute("placeholder", "Correo");
        $inputEmail.setAttribute("id", "form-email");
        nodo.appendChild($inputEmail);
    });
    $formularioTicket.childNodes[2].appendChild(document.createElement("div"));
    $formularioTicket.childNodes[2].childNodes.forEach((nodo) => {
        if (nodo.classList.contains("col")){
            const $labelCantidad = document.createElement("label");
            const $inputCantidad = document.createElement("input");
            $labelCantidad.setAttribute("for", "form-cantidad");
            $labelCantidad.textContent = "Cantidad:";
            $inputCantidad.classList.add("form-control");
            $inputCantidad.setAttribute("type", "number");
            $inputCantidad.setAttribute("placeholder", "Cantidad");
            $inputCantidad.setAttribute("id", "form-cantidad");
            $inputCantidad.setAttribute("min", "0");
            $inputCantidad.setAttribute("value", "1");
            nodo.appendChild($labelCantidad);
            nodo.appendChild($inputCantidad);
        } else{
            nodo.classList.add("col");
            const $labelCategoria = document.createElement("label");
            const $selectCategoria = document.createElement("select");
            $labelCategoria.setAttribute("for", "form-categorias");
            $labelCategoria.textContent = "Categoría:";
            $selectCategoria.classList.add("form-select");
            $selectCategoria.setAttribute("id", "form-categorias");
            for(let i = 0; i < 4; i++){
                let $option = document.createElement("option");
                $option.setAttribute("value", i);
                switch (i){
                    case 0:
                    $option.setAttribute("selected", "");
                    $option.textContent = "Sin categoría";
                    break;
                    case 1:
                        $option.textContent = "Estudiante";
                        break;
                    case 2:
                        $option.textContent = "Trainee";
                        break;
                    case 3:
                        $option.textContent = "Junior";
                        break;
                }
                $selectCategoria.appendChild($option);
            }
            nodo.appendChild($labelCategoria);
            nodo.appendChild($selectCategoria);
        }
    });
    $formularioTicket.childNodes[3].childNodes.forEach((nodo) => {
        const $inputTextPlano = document.createElement("input");
        $inputTextPlano.classList.add("form-control-plaintext");
        $inputTextPlano.setAttribute("type", "text");
        $inputTextPlano.setAttribute("id", "valor-final");
        $inputTextPlano.setAttribute("value", "Total a pagar: $");
        $inputTextPlano.setAttribute("readonly", "");
        nodo.appendChild($inputTextPlano);
    });
    // ---------------- //
    $modalBody.classList.add("modal-body");
    $modalBody.appendChild($divContenedorCategorias);
    $modalBody.appendChild(createElementCustom("p", ["fs-6", "text-uppercase", "lh-base", "text-center", "mt-2", "mb-0"], "venta", {}));
    $modalBody.appendChild(createElementCustom("p", ["fs-1", "text-uppercase", "lh-base", "text-center", "fw-semibold", "mt-0", "mb-0"], "valor de ticket $200", {}));
    $modalBody.appendChild($formularioTicket);
    return $modalBody;
}


function modalFooterTicket(){
    const $modalFooter = document.createElement("div");
    $modalFooter.classList.add("modal-footer", "d-flex", "justify-content-center", "gap-2");
    $modalFooter.appendChild(createElementCustom("button", ["btn", "btn-success"], "Borrar", {"id":"form-btn-borrar"}));
    $modalFooter.appendChild(createElementCustom("button", ["btn", "btn-success"], "Resumen", {"id":"form-btn-resumen"}));
    return $modalFooter;
}

function createElementCustom(tipoElemento, clases, contenidoTexto, atributos){
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

export {createModalTickets};