import { useReducer } from "react";
import { createContext } from "react";
//import { dispatch } from "react";

export const AuthContext = createContext()


const userReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN' :
            return {...state, user: action.payload};
        case 'LOGOUT':
            return {...state, user: null};
        default:
            return state;
    }
  }
  
  export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(userReducer,{user:null});

    console.log(typeof dispatch)
  
    return (
      <AuthContext.Provider value={{ ...state, dispatch}}>
        {children}
      </AuthContext.Provider>
    );
  }
  
// const userReducer = (state, action) => {
//     switch(action.type){
//         case 'LOGIN' :
//             return {...state,user:action.payload}
//         case 'LOGOUT':
//             return {...state, user:null}
//         default:
//             return state
//     }
// }

// export const AuthContextProvider = ({children}) => {
    
//     const [state,dispatch] = useReducer(userReducer,{user:null})

//     return(
//         <AuthContext.Provider value={{...state,dispatch}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }