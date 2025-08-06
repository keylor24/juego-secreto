let numeroSecreto = 0;
let intentos = 0;
let intentosMaximos = 3;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarNumeroUsuario(numeroIngresado) {
    if(numeroIngresado < 1 || numeroIngresado > numeroMaximo || isNaN(numeroIngresado)) {
        return false; // Retornar false si el numero no es valido
    }
    else{
        return true; // Retornar true si el numero es valido
    }
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Verificar que el numero ingresado sea valido
    if(!verificarNumeroUsuario(numeroDeUsuario)) {
        asignarTextoElemento('p', `El numero ingresado no es valido, debe ser un numero entre 1 y ${numeroMaximo}`);
        limpiarCaja();
        return;
    }

    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Felicidades! Has acertado el numero secreto en ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}`);
        //Reiniciar el juego
        habilitarBoton('reiniciar'); // Habilitar el boton de Nuevo Juego
        deshabilitarBoton('intentar');// Deshabilitar el boton de Intentar
        asignarTextoElemento('#textoSecundario', ''); // Limpiar el texto secundario
    } else{
        let intentosRestantes = intentosMaximos - intentos;
        intentos++;
        asignarTextoElemento('#textoSecundario', `Intentos restantes: ${intentosRestantes}`);

        if(intentos > intentosMaximos){
            asignarTextoElemento('p', `Has agotado tus intentos. El numero secreto era ${numeroSecreto}`);
            asignarTextoElemento('#textoSecundario', ''); // Limpiar el texto secundario
            //Reiniciar el juego
            habilitarBoton('reiniciar'); // Habilitar el boton de Nuevo Juego
            deshabilitarBoton('intentar');// Deshabilitar el boton de Intentar
        }
        else{
            //El usuario no ha acertado el numero secreto
            if(numeroDeUsuario > numeroSecreto){
                asignarTextoElemento('p', 'El numero secreto es menor');
            }
            else {
                asignarTextoElemento('p', 'El numero secreto es mayor');
            }
        }

        //Limpiar caja de texto
        limpiarCaja();
    }

} 

function habilitarBoton(id){
    document.getElementById(id).removeAttribute('disabled');
}

function deshabilitarBoton(id){
    document.getElementById(id).setAttribute('disabled', true);
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo) + 1;

    // Verificar que el numero generado no se haya sorteado antes
    if(listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto(); // Si ya fue sorteado, volver a generar
    }
    else {
        listaNumerosSorteados.push(numeroGenerado); // Agregar el numero sorteado a la lista
        return numeroGenerado; // Retornar el numero generado
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    asignarTextoElemento('#textoSecundario', `Tienes ${intentosMaximos} intentos`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    //Habilitar el boton de Intentar
    habilitarBoton('intentar');
}

function reiniciarJuego(){
    //Limpiar caja
    limpiarCaja();
    //Indicar mensaje de inicio, Generar nuevo numero secreto y Inicializar intentos
    condicionesIniciales();
    //Deshabilitar el boton de Nuevo Juego
    deshabilitarBoton('reiniciar');
}

condicionesIniciales();

