import './App.css';
import React, {useState, useEffect} from 'react'
import {evaluate} from 'mathjs'
import TheDisplay from './components/TheDisplay';
import TheKeyboard from './components/TheKeyboard';



 
const signs =["AC", "+", "-", "x", "/", "="]
  
const numbs =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const App = ()=> {

  const [input, setInput] = useState(0)
  const [output, setOutput] = useState(0)
  const [result, setResult] = useState("")

  const handleInput = (value)=>{
    const numb = numbs.find((num)=> num === value)
    const sign = signs.find((sig)=> sig === value)
    switch(value) {
      case "=":
        handleEqual()
        break;
      case "AC":
        handleClear()
        break;
        case numb:
          handleNumbs(value)
          break;
          case ".":
          handleDot()
          break;
        case sign:
          handleSigns(value)
          break;
        default: 
    }
   }
  
   const handleOutput = ()=>{
     setOutput(result)
   }

  
  const handleEqual = ()=>{
    const total = evaluate(result)
    setInput(`${total}`)
    setOutput(`${total}`)
    setResult(`${total}`)
  }

 const handleClear = ()=>{
   setInput("0")
   setOutput("")
   setResult("")
 }

 const handleNumbs = (value)=>{
   if(!result.length){
     setInput (`${value}`)
     setResult (`${value}`)
   }
   else{
     if(value === 0 && (result === "0"|| input === 0)){
       setResult(`${result}`)
     }
     else{
      const lastChar = result.charAt(result.length - 1)
      const isLatCharSign = lastChar === "*" || signs.includes(lastChar)

      setInput(isLatCharSign ? `${value}` : `${input}${value}`)
      setResult(`${result}${value}`)
     }
   }
  
 }
 
 const handleDot = ()=>{
  const lastChar = result.charAt(result.length - 1)
  if (!result.length){
  setInput("0.")
  setResult("0.")
  } else{
    if (lastChar === "*" || signs.includes(lastChar)){
      setInput("0.")
      setResult(`${result} 0.`)
    } else{
      setInput(lastChar === "." || input.includes(".") ? `${input}`: `${input}.` )
      const formattedValue= lastChar ==="." || input.includes(".") 
      ? `${result}`
      : `${result}.`  
      setResult(formattedValue)
    }
  }
 }

 const handleSigns = (value)=>{
  if(result.length){
    setInput(`${value}`)
    const beforeLastChar = result.charAt(result.length - 2)
    const beforeLastCharIsSign =signs.includes(beforeLastChar) || beforeLastChar === "*"

    const lastChar = result.charAt(result.length - 1)

    const lastCharSign = signs.includes(lastChar) || lastChar === "*"  

    const validSig = value === "x" ? "*" : value
    if (
      (lastCharSign && value !== "-") || 
      (beforeLastCharIsSign && lastCharSign)
    ){
      if (beforeLastCharIsSign) {
        const updatedValue = `${result.substring(
          0, result.length - 2
        )}${value}` 
        setResult(updatedValue)
      } else{
        setResult(`${result.substring(0, result.length - 1)}${validSig}`)
      }
    } else{
      setResult(`${result}${validSig}`)
    }
  }
 }
  


 
  useEffect(()=>{
    handleOutput(result)
  })
  return (
  <div className='calcBackground'>
  <div className='calculator'>
      <TheDisplay input= {input} output={output}/>
      <TheKeyboard handleInput= {handleInput}/>
  </div>
  </div>
  );
}
export default App;
