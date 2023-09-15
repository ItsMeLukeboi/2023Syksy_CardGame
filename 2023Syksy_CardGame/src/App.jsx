import Card from './components/Card'
import './App.css'


const playerCard = {
  image: "http://placekitten.com/120/100",
  stats:[{name: 'Cuteness', value: 8}],
};

export default function App(){
  return(
   <div>
     <h1>Hello world!</h1>
     <Card />
   </div>
   );
};