import { AC } from "../App";

export default function DigitButton({dispatch, digit }){
    return <button 
    onClick={() => dispatch 
        ({type: AC.ADD_DIGIT, payload: {digit}})}>{digit}</button>
}