const validarNomApe = (input) => /^[a-zA-ZñÑáéíóú\s]{3,24}$/i.test(input.value) ? 1 : -1;
const validarEmail = (inputEmail) => /^([a-zA-Z0-9]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/.test(inputEmail.value) ? 1 : -1;
export { validarNomApe, validarEmail }