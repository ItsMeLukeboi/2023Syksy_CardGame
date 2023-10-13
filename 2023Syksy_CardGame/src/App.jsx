import Card from './components/Card'
import './App.css'
import { useState } from 'react';

const getRandoInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);


const playerCard = {
  image: "http://placekitten.com/120/100?image="+getRandoInt(0,15),
  stats:[
    {name: 'Cuteness', value: getRandoInt(0,100)},
    {name: 'Speed', value: getRandoInt(0,100)}]
};

const enemyCard = {
  image: "http://placekitten.com/120/100?image="+getRandoInt(0,15),
  stats:[
    {name: 'Cuteness', value: getRandoInt(0,100)},
    {name: 'Speed', value: getRandoInt(0,100)}]
};

const createCard = index =>({
  image: "http://placekitten.com/120/100?image="+ index,
  stats:[
    {name: 'Cuteness', value: getRandoInt(0,100)},
    {name: 'Chonk', value: getRandoInt(0,100)},
    {name: 'Speed', value: getRandoInt(0,100)}],
  id:crypto.randomUUID()
})

const deck = Array(16).fill(null).map((_,index) => createCard(index));
const half = Math.ceil(deck.length / 2);
const dealCards = () =>{
  return{
    player: deck.slice(0,half),
    enemy: deck.slice(half)
  };
}


export default function App(){
  const[result, setResult] = useState('');
  const[cards, setCards] = useState(dealCards);
  function compareCards(){
    const playerStat = cards.player[0].stats[0];
    const enemyStat = cards.enemy[0].stats[0];


    if(playerStat.value === enemyStat.value){
      setResult('Draw')
    }

    else if(playerStat.value > enemyStat.value){
      setResult('Win')
    }

    else{
      setResult('Loss')
    }


  }

  return(
   <div>
     <h1>Hello world!</h1>
     <div className='game'>
      <ul className='card-list'>
        {cards.player.map(pCard =>(
          <li className='card-list-item player' key={pCard.id}>
            <Card card = {pCard}/>
          </li>
        ))}
      </ul>
      
      <div className='center'>
        <p>{result || 'Press the button'}</p>
       <button onClick={compareCards} type="button">Play</button>
      </div>
      <Card card = {cards.enemy[0]}/>
     </div>
     {console.log(dealCards())}
   </div>
   );
};