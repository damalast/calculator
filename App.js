import { useReducer } from "react";
import DigitButton from "./Buttons/DButton";
import ODButton from "./Buttons/ODButton";
import "./style.css";


 export const AC = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation', 
  CLEAR: 'clear',
  DEL_DIGIT: 'delete-digit',
  EVALUATE: 'EVALUATE'
}

function reduce(state, {type, payload}){
    // eslint-disable-next-line default-case
    switch(type) {
      case AC.ADD_DIGIT:
        if(state.overwrite) {
          return {
            ...state,
            activeOperand: payload.digit,
            overwrite: false,
          }
        }
        if(payload.digit === "0" && state.activeOperand === "0") return state
        if(payload.digit === "." && state.activeOperand.includes(".")) return state
        return{
          ...state,
          activeOperand: `${state.activeOperand || ""}${payload.digit}`,
        }
        case AC.CHOOSE_OPERATION: 
        if(state.activeOperand == null && state.lastOperand == null) {
          return state
        }

        if(state.activeOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }

        if (state.lastOperand == null){
          return{
            ...state,
            operation: payload.operation,
            lastOperand: state.activeOperand,
            activeOperand: null
          }
        }
        
        return{
          ...state,
          lastOperand: evaluate(state),
          operation: payload.operation,
          activeOperand: null,
        }
        case AC.DEL_DIGIT: 
        if(state.overwrite) {
          return {
            ...state,
            overwrite: false,
            activeOperand: null,

          }
        } 
        if(state.activeOperand == null) return state
        if(state.activeOperand.length === 1) {
          return {
            ...state, 
            activeOperand: null,
          }
        }     
        return {
          ...state,
          activeOperand: state.activeOperand.slice(0, -1)
        }
        // eslint-disable-next-line no-fallthrough
        case AC.CLEAR:
          return {}
        case AC.EVALUATE:
          if(state.operation == null || state.activeOperand == null || state.lastOperand == null) {
          return state
          }
          return {
            ...state,
            overwrite: true,
            lastOperand: null,
            operation: null, 
            activeOperand: evaluate(state)
          }
    }
}
function evaluate( { activeOperand, lastOperand, operation}) {
  const prev = parseFloat(lastOperand)
  const current = parseFloat(activeOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  // eslint-disable-next-line default-case
  switch(operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break      
  }
  return computation.toString()
}
// const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
//   maximumFractionDigits: 0,
// })
// function formatOperand(operand){
//   if(operand == null) return 
//   const [integer, decimal] = operand.split(".")
//   if(decimal === null) return INTEGER_FORMATTER.format(integer)
// }

function App(){
  const [{activeOperand, lastOperand, operation}, dispatch] = useReducer(reduce, 
    {}
    )
  
  return(
    <div className="title">
        <h1>Hey, make a count!</h1>
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{lastOperand} {operation}</div>
        <div className="current-operand">{activeOperand}</div>
      </div>
      <button className="span-one" onClick={() => dispatch ({type : AC.CLEAR})}>AC</button>
      <button onClick={() => dispatch ({type : AC.DEL_DIGIT})}>DEL</button>
      <ODButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <ODButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <ODButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <ODButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      
      <button className="span-two" onClick={() => dispatch ({type : AC.EVALUATE})}>=</button>

     </div>
    </div>  
  )
}
export default App