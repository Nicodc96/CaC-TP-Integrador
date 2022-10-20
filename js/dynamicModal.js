function createModalTickets(){
    /* Div modal principal */
    const $modalPrincipal = createElementCustom("div", ["modal", "fade"], "", {
        "id":"staticModalTicket", "data-bs-backdrop":"static", "data-bs-keyboard":"false", "tabindex":"-1",
        "aria-labelledby":"staticBackdropLabel", "aria-hidden":"hidden"
    });
    /* Div modal dialog */
    const $modalDialog = createElementCustom("div", ["modal-dialog", "modal-dialog-centered", "modal-dialog-scrolleable"], "", {});
    $modalPrincipal.appendChild($modalDialog);
    /* Div modal content */
    const $modalContent = createElementCustom("div", ["modal-content"], "", {});
    $modalDialog.appendChild($modalContent);
    /* Agrego los elementos creados al modal content */    
    $modalContent.appendChild(modalHeaderTicket());
    $modalContent.appendChild(modalBodyTicket());
    $modalContent.appendChild(modalFooterTicket());
    /* Devuelvo el modal completo */
    return $modalPrincipal;
}

function modalHeaderTicket(){
    const $modalHeader = createElementCustom("div", ["modal-header"], "", {});
    $modalHeader.appendChild(createElementCustom("h1", ["modal-title", "fs-5"], "Compre su Ticket:", {"id":"staticBackdropLabel"}));
    $modalHeader.appendChild(createElementCustom("button", ["btn-close"], "", {"data-bs-dismiss":"modal", "aria-label":"close"}));
    return $modalHeader;
}

function modalBodyTicket(){
    const $modalBody = createElementCustom("div", ["modal-body"], "", {});
    // ---------------- //
    const $divContenedorCategorias = createElementCustom("div", ["d-flex", "gap-1"], "", {"id":"categorias-descuento"});
    for (let i = 0; i < 3; i++){
        $divContenedorCategorias.appendChild(createElementCustom("div", ["box-categoria"], "", {}));
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
    const $formularioTicket = createElementCustom("form", [], "", {"id":"form-tickets"});
    for (let i = 0; i < 4; i++){
        if (i == 0){
            $formularioTicket.appendChild(createElementCustom("div", ["row"], "", {}));
        } else{
            $formularioTicket.appendChild(createElementCustom("div", ["row", "pt-3"], "", {}));
        }
    }
    $formularioTicket.childNodes.forEach((nodo) => {
        if (!nodo.classList.contains("pt-3")){
            const $divColName = createElementCustom("div", ["col", "col-name"], "", {});
            const $inputName = createElementCustom("input", ["form-control"], "", {
                "type":"text", "placeholder":"Nombre", "id":"form-nombre"
            });
            $divColName.appendChild($inputName);
            // --------------- //
            const $divColApellido = createElementCustom("div", ["col", "col-surname"], "", {})
            const $inputApellido = createElementCustom("input", ["form-control"], "", {
                "type":"text", "placeholder":"Apellido", "id":"form-apellido"
            });
            $divColApellido.appendChild($inputApellido);
            // --------------- //
            nodo.appendChild($divColName);
            nodo.appendChild($divColApellido);
        } else{
            nodo.appendChild(createElementCustom("div", ["col"], "", {}));
        }
    });
    $formularioTicket.childNodes[1].childNodes.forEach((nodo) => {
        nodo.appendChild(createElementCustom("input", ["form-control"], "", {
            "type":"email", "placeholder":"Correo", "id":"form-email"
        }));
    });
    $formularioTicket.childNodes[2].appendChild(document.createElement("div"));
    $formularioTicket.childNodes[2].childNodes.forEach((nodo) => {
        if (nodo.classList.contains("col")){
            nodo.appendChild(createElementCustom("label", [], "Cantidad:", {"for":"form-cantidad"}));
            nodo.appendChild(createElementCustom("input", ["form-control"], "", {
                "type":"number", "placeholder":"Cantidad", "id":"form-cantidad", "min":"0", "value":"1"
            }));
        } else{
            nodo.classList.add("col");
            const $selectCategoria = createElementCustom("select", ["form-select"], "", {"id":"form-categorias"});
            for(let i = 0; i < 4; i++){
                switch (i){
                    case 0:
                        $selectCategoria.appendChild(createElementCustom("option", [], "Sin categoría", {"value":i, "selected":""}));
                        break;
                    case 1:
                        $selectCategoria.appendChild(createElementCustom("option", [], "Estudiante", {"value":i}));
                        break;
                    case 2:
                        $selectCategoria.appendChild(createElementCustom("option", [], "Trainee", {"value":i}));
                        break;
                    case 3:
                        $selectCategoria.appendChild(createElementCustom("option", [], "Junior", {"value":i}));
                        break;
                }
            }
            nodo.appendChild(createElementCustom("label", [], "Categoría:", {"for":"form-categorias"}));
            nodo.appendChild($selectCategoria);
        }
    });
    $formularioTicket.childNodes[3].childNodes.forEach((nodo) => {
        nodo.appendChild(createElementCustom("input", ["form-control-plaintext"], "", {
            "type":"text", "id":"valor-final", "value":"Total a pagar: $", "readonly":""
        }));
    });
    // ---------------- //
    $modalBody.appendChild($divContenedorCategorias);
    $modalBody.appendChild(createElementCustom("p", ["fs-6", "text-uppercase", "lh-base", "text-center", "mt-2", "mb-0"], "venta", {}));
    $modalBody.appendChild(createElementCustom("p", ["fs-1", "text-uppercase", "lh-base", "text-center", "fw-semibold", "mt-0", "mb-0"], "valor de ticket $200", {}));
    $modalBody.appendChild($formularioTicket);
    return $modalBody;
}


function modalFooterTicket(){
    const $modalFooter = createElementCustom("div", ["modal-footer", "d-flex", "justify-content-center", "gap-2"], "", {});
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