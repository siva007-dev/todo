import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"

function App() {

  const [entvalue,setentvalue]=useState()
  const[fruit,setfruit]=useState([])

  useEffect(function()
  {
     axios.get(`${process.env.REACT_APP_API_URL}/fruit`).
     then(function(data)
    {
      setfruit(data.data)
    })
  },[])

  function handlechange(e){
    setentvalue(e.target.value)
  }

  function clicked(){
   
    axios.post(`${process.env.REACT_APP_API_URL}/addfruit`,{newfruit:entvalue})
    setfruit([...fruit,{name:entvalue}])
    setentvalue("")
  }
  return (
    <>
   <input onChange={handlechange} value={entvalue}></input>
   <button onClick={clicked}>Add Fruit</button>

   {
    fruit.map(function(data){
      return <h1>{data.name}</h1>
    })
   }
   </>
  );
}

export default App;
