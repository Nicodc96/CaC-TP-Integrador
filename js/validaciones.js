/**
 * Valida si el input nombre e input apellido cumplen los siguientes requisitos:
 * - Tienen menos de 24 caracteres
 * - No tienen números
 * - Tiene la menos 3 caracteres
 * @param {HTMLElement} input referencia del input
 * @returns {Boolean} **true** si se cumplen las condiciones, de lo contrario **false**
 */
export const validarNomApe = (input) => /^[a-zA-ZñÑáéíóú\s]{3,24}$/i.test(input.value);
/**
 * Valida si el input email cumple los siguientes requisitos:
 * - Tiene un texto alfanumérico sin signos especiales
 * - Tiene una arroba (@)
 * - Tiene **solo** letras luego del arroba
 * - Tiene un punto luego de las letras del arroba y como mínimo 2 caracteres y máximo 3
 * @param {HTMLElement} inputEmail referencia del input
 * @returns {Boolean} **true** si se cumplen las condiciones, de lo contrario **false**
 */
export const validarEmail = (inputEmail) => /^([a-zA-Z0-9_._-]+@+[a-zA-Z]+(\.)+[a-zA-Z_.]{2,10})$/.test(inputEmail.value);