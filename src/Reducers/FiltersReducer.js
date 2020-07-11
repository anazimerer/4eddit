export const initialState= {
    filters: {
        name: null,
        text: null
    }
};

export default function FiltersReducer(state, action){  

    switch(action.type){
        case "UPDATE_FILTERS":                     
            return{
                ...state,
                filters: action.filters,                
            };              
        case "RESET_FILTERS":
            return{
                ...state,
                filters: initialState.filters
            };
        default:
            return state
    }

   
}