import React, { useContext } from 'react'
import FiltersContext from '../../Context/FiltersContext'
import useInputValue from '../../Hooks/useInputValue'

export default function Filters (){
    const {filters, dispatch } = useContext(FiltersContext);
    const [name, handleChangeNameInput]=useInputValue(filters.name)
    const [text, handleChangeTextInput]=useInputValue(filters.text)
   
    
    const onClickApplyFilters = () => {
        const newFilters = { 
            name: name,
            text: text,
        };
    
        dispatch({ type: "UPDATE_FILTERS", filters: newFilters });
      };
    
      const onClickResetFilters = () => {
        dispatch({ type: "RESET_FILTERS" });
        //clearMinValue(minValue)
        //clearMaxValue(maxValue)
        //clearName(name)
      };

    return (
        <div>
            <input 
            value={name}
            placeholder="Usuário"
            onChange={handleChangeNameInput}
            />
            <input 
            value={text}
            placeholder="Texto"
            onChange={handleChangeTextInput}
            />
            <button onClick={onClickApplyFilters}>BUSCAR</button>
            <button onClick={onClickResetFilters}>APAGAR</button>
        </div>
    )
}