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

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          valorTotal = document.querySelectorAll('small'); //puede ser el All o el normal en caso sea el primero




    //Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) =>{
        deck = crearDeck();
        puntosJugadores =[];
        for( let i = 0;i < numJugadores; i++){
            puntosJugadores.push(0);
        }
       
        valorTotal.forEach( elem => elem.innerText = 0 );

        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
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
        return puntosJugadores[turno];

    }
    const crearCarta = (carta, turno ) => {

      const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
            imgCarta.classList.add('carta'); //añadir la clase carta del css para que mantenga el estilo
            divCartasJugadores[turno].append(imgCarta);
           
    }

    const determinarGanador = () =>{

        const [ puntosMinimos, puntosComputadora] = puntosJugadores;

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
    

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();    


    }



    // Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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

        turnoComputadora(puntosJugadores[0]);
    });


    btnNuevo.addEventListener('click', () => {

     inicializarJuego();


        
    });
    // TODO Borrar

    
})();

////////////