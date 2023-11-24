import Card from './components/Card'
import PlayButton from './components/PlayButton';
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
  shuffle(deck)
  return{
    player: deck.slice(0,half),
    enemy: deck.slice(half)
  };
}

function shuffle(array){
  for(let i = array.length -1; i > 0; i--){
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] =  [array[j], array[i]];
  }
  return array;
}

export default function App(){
  const[result, setResult] = useState('');
  const[cards, setCards] = useState(dealCards);
  const[gameState, setGameState] = useState('play');
  const[selectedStat, setSelectedStat] = useState(0);
    
 if(gameState !== 'game_over' && (!cards.enemy.length || !cards.player.length)){
  setResult(()=>{
    if(!cards.enemy.length) return 'Player win!';
    else if (!cards.player.length) return 'Player loss!';
    return 'Draw';
  })
  setGameState('game_over');
 }   
    

  function compareCards(){
    const playerStat = cards.player[0].stats[selectedStat];
    const enemyStat = cards.enemy[0].stats[selectedStat];


    if(playerStat.value === enemyStat.value){
      setResult('Draw')
    }

    else if(playerStat.value > enemyStat.value){
      setResult('Win')
    }

    else{
      setResult('Loss')
    }
    setGameState('result');

  }

function nextRound(){
  setCards(cards =>{
    const playedCards = [{...cards.player[0]},{...cards.enemy[0]}]
    const player = cards.player.slice(1)
    const enemy = cards.enemy.slice(1)


     if(result == 'Draw'){
      return{
        player,
        enemy
      };
    }
     if(result == 'Win'){
       return{
          player: [...player, ...playedCards],
          enemy
        };
      }
       if(result == 'Loss'){
          return{
            player,
            enemy:[...enemy, ...playedCards],
          };
       }
         return cards;
        
  });
  setGameState('play');
  setResult('');
}

function restartGame(){
  setCards(dealCards);
  setResult('');
  setGameState('play');
}

  return(
   <div>
     <h1>Brawler Cats!</h1>
     <div className='game'>
      <div className='hand player'>
      <ul className='card-list'>
        {cards.player.map((pCard, index) =>(
          <li className='card-list-item player' key={pCard.id}>
            <Card card = {index == 0 ? pCard : null} 
            handleSelect={statIndex => gameState === 'play' && setSelectedStat(statIndex)}
            selectStat={selectedStat}
            />
          </li>
        ))}
      </ul>
      </div>

      <div className='center'>
        <p>{result || 'Press the button'}</p>
        {
          gameState === 'play'?(
            <PlayButton text={'Play'} handleClick={compareCards}/>
          ) 
          : gameState == 'game_over' ?
          (<PlayButton text={'Restart'} handleClick={restartGame}/>)
          :
          (
            <PlayButton text={'Next'} handleClick={nextRound}/>
          )
        }
        
      </div>

      <div className='hand enemy'>
        <ul className='card-list enemy'>
        {cards.enemy.map((eCard,index) =>(
          <li className='card-list-item enemy' key={eCard.id}>
            <Card card = {result && index === 0 ? eCard : null}/>
          </li>
        ))}
       </ul>
       </div>
      
     </div>

   </div>
   );
};