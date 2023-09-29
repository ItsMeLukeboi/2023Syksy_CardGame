import Card from './components/Card'
import './App.css'


const playerCard = {
  image: "http://placekitten.com/120/100",
  stats:[
    {name: 'Cuteness', value: 10},
    {name: 'Speed', value: 7}]
};

const enemyCard = {
  image: "http://placekitten.com/120/100?image=14",
  stats:[
    {name: 'Cuteness', value: 10},
    {name: 'Speed', value: 5}]
};

export default function App(){

  function compareCards(){
    const playerStat = playerCard.stats[0];
    const enemyStat = enemyCard.stats[0];

    let result = '';

    if(playerStat.value === enemyStat.value){
      result = 'draw'
    }

    else if(playerStat.value > enemyStat.value){
      result = 'victory'
    }

    else{
      result = 'defeat'
    }


    console.log(result);
  }

  return(
   <div>
     <h1>Hello world!</h1>
     <div className='game'>
      <Card card = {playerCard}/>
      <button onClick={compareCards} type="button">Play</button>
      <Card card = {enemyCard}/>
     </div>
   </div>
   );
};