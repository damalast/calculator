import { AC } from "../App";

export default function OperationDigitButton({dispatch, operation }){
    return <button 
    onClick={() => dispatch 
        ({type: AC.CHOOSE_OPERATION, payload: {operation}})}>
            {operation}</button>
}