/**
 * 2C = Two of CLubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Swords  (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);
    deck = _.shuffle (deck);
    console.log(deck);
    return deck;

}

crearDeck();