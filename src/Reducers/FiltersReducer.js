export const initialState= {
    filters: {
        name:"",
        text:""
    }
};

export default function FiltersReducer(state, action){
    switch(action.type){
        case "UPDATE_FILTERS":
            return{
                name:action.name,
                text: action.text 
            };
                          
        case "RESET_FILTERS":
            return{
                name:"",
                text: "" 
            };
        default:
            return state
    }
}