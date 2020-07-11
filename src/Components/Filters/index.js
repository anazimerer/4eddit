import React, { useContext } from 'react'
import FiltersContext from '../../Context/FiltersContext'
import useInputValue from '../../Hooks/useInputValue'


export default function Filters (){
    const filtersContext = useContext(FiltersContext);
    const [nameInput, handleChangeNameInput, clearNameInput]=useInputValue(filtersContext.filters.name)
    const [textInput, handleChangeTextInput, clearTextInput]=useInputValue(filtersContext.filters.text)   
    
    const onClickApplyFilters = () => {
        const newFilters = { 
            name: nameInput,
            text: textInput,
        };
        filtersContext.dispatch({ type: "UPDATE_FILTERS", filters: newFilters });
    };
    
    const onClickResetFilters = () => {
        filtersContext.dispatch({ type: "RESET_FILTERS" });
        clearNameInput(nameInput)
        clearTextInput(textInput)
    };

    return (
        <div>
            <input 
            value={nameInput}
            placeholder="Usuário"
            onChange={handleChangeNameInput}
            />
            <input 
            value={textInput}
            placeholder="Texto"
            onChange={handleChangeTextInput}
            />
            <button onClick={onClickApplyFilters}>BUSCAR</button>
            <button onClick={onClickResetFilters}>APAGAR</button>
        </div>
    )
}