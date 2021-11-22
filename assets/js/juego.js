/**
 * 2C = Two of CLubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Swords  (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora =0;

//referencias del html
const btnPedir = document.querySelector('#btnPedir');
var valorTotal = document.querySelectorAll('small');  //puede ser el All o el normal en caso sea el primero



// Esta funcion permite crear una baraja nueva
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {

            deck.push(i + tipo);

        }
    }

    for ( let tipo of tipos){
        for (let especial of especiales){
            deck.push (especial + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle (deck);
    console.log(deck);
    return deck;

}

crearDeck();


// Esta funcion me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0){
        throw 'No hay carta en el deck';
    }

        const carta = deck.pop();
        return carta; 
}


const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN (valor))?
        ( valor === 'A' ) ?11 :10
        : valor * 1;

    // let puntos = 0;
    // if( isNaN(valor) ){
    //     puntos = (valor === 'A') ? 11 : 10;
    // }else{
        
    //     puntos = valor * 1;
    // }
    // console.log(puntos);
}

// Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta (carta);
    valorTotal[0].innerText = puntosJugador; // evento de el puntaje en el small
    console.log(puntosJugador);

});
