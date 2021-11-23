//sintaxys del patron modulo

(() => {

    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    //referencias del html
     const btnPedir = document.querySelector('#btnPedir'),
     btnDetener = document.querySelector('#btnDetener'),
     btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
          valorTotal = document.querySelectorAll('small'); //puede ser el All o el normal en caso sea el primero




    //Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) =>{
        deck = crearDeck();
        for( let i = 0;i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        
    }

    // Esta funcion permite crear una baraja nueva
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {

                deck.push(i + tipo);

            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

       return _.shuffle(deck);

    }

    


    // Esta funcion me permite tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay carta en el deck';
        }
            return deck.pop ();
    }


    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;

    }
    //turno 0 = Primer Jugador y el Ultimo sera el de la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno]  + valorCarta(carta);
        valorTotal[turno].innerText = puntosJugadores[turno];

    }

    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();

            // puntosComputadora = puntosComputadora + valorCarta(carta);
            // valorTotal[1].innerText = puntosComputadora;


            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
            imgCarta.classList.add('carta'); //añadir la clase carta del css para que mantenga el estilo
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie Gana =(');

            } else if (puntosMinimos > 21) {
                alert('Computadora Gana');

            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana');
            }
        }, 10);


    }



    // Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        valorTotal[0].innerText = puntosJugador; // evento de el puntaje en el small

        //Creacion de la imangen de la carta de manera dinamica
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
        imgCarta.classList.add('carta'); //añadir la clase carta del css para que mantenga el estilo
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, GENIAL!, Ganaste');
            btnPedir.disabled = true;

        }
    });


    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    });


    btnNuevo.addEventListener('click', () => {

        console.clear();

        inicializarJuego();

        // deck = [];
        // deck = crearDeck();


        puntosComputadora = 0;
        puntosJugador = 0;

        valorTotal[0].innerText = 0;
        valorTotal[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
    // TODO Borrar


})();

////////////