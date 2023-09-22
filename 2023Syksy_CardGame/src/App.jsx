import Card from './components/Card'
import './App.css'


const playerCard = {
  image: "http://placekitten.com/120/100",
  stats:[
    {name: 'Cuteness', value: 8},
    {name: 'Speed', value: 7}]
};

const enemyCard = {
  image: "http://placekitten.com/120/100?image=14",
  stats:[
    {name: 'Cuteness', value: 10},
    {name: 'Speed', value: 5}]
};

export default function App(){
  return(
   <div>
     <h1>Hello world!</h1>
     <Card card = {playerCard}/>
     <Card card = {enemyCard}/>
   </div>
   );
};