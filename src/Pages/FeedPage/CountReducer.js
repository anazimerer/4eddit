import React, {useReducer} from 'react'

const initialState={
    count: 0
};

function reducer(state, action){
    switch (action.type) {
        case "LIKE":
          return { count: state.count + 1 };
        case "UNLIKE":
          return { count: state.count - 1 };
        default:
          return state;
    }
}

export default function CountReducer(props){    
    const [state, dispatch] = useReducer(reducer, initialState);
    const addLike = () => dispatch({ type: "LIKE" }); 
    const removeLike = () => dispatch({ type: "UNLIKE" });   
    const totalOfLikes= (props.value) + (state.count)   
    return(
        <div>
            <button onClick={addLike}>+</button>
            <span>{totalOfLikes}</span>
            <button onClick={removeLike}>-</button>            
        </div>
    );
};