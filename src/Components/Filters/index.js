import React, { useContext } from 'react'
import FiltersContext from '../../Context/FiltersContext'
import useInputValue from '../../Hooks/useInputValue'
import styled from 'styled-components';

const Container=styled.div`
    display: flex;
    flex-direction: row;
`
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
        <Container>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <input 
                value={nameInput}
                placeholder="Busca por usuário"
                onChange={handleChangeNameInput}
            />
            <input 
                value={textInput}
                placeholder="Busca por postagem"
                onChange={handleChangeTextInput}
            />
            <button onClick={onClickApplyFilters}><i class="material-icons">search</i></button>
            <button onClick={onClickResetFilters}><i class="material-icons">delete</i></button>
        </Container>
    )
}