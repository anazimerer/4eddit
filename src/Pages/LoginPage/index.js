import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import useInputValue from "../../Hooks/useInputValue";
import api from '../../Sevice/api'

const Container =styled.div`
	display: flex;
	justify-content: center;
	flex-direction:column;
	align-items: center;
	form{
		display: flex;
		flex-direction: column;
		input, label{
			margin: 5px;
			width: 20vw;
		}
	}
	h1{
  		margin-bottom: 10px;
  		font-size: 2.5vw;
	}
	div{
		display: flex;
		flex-direction: row;
		justify-content: center;
		button{
			margin: 10px 10px;
		}
	}
`

export default function Login(){
    const [email, handleChangeEmail, clearEmailInput] = useInputValue("");
	const [password, handleChangePassword, clearPasswordInput] = useInputValue("");
	const history=useHistory();
	
	const onClickLogin=((event)=>{
		event.preventDefault()
		const body={
			email: email,
			password: password
		}
		api
			.post('/login', body)
			.then((response)=>{
				localStorage.setItem('token', (response.data.token)); 
				localStorage.setItem('login', (true))
				clearEmailInput(email)
				clearPasswordInput(password)
				alert(`O usuario ${email} está logado! `)
				history.push('/feed')				
			})
			.catch((error)=>{
				history.push('/')
				alert(`Este email ou senha não são válidos. Erro:${error} `)
				clearPasswordInput(password)
			})			
	})	

	const goToSignupPage = () =>{
		history.push('/signup')	
	}

    return(
        <Container>
			<h1>Login</h1>
        	<form>			
        	  	<label>Email:</label> 
				<input 
					value={email} 
					type="email"
					name="email" 
					pattern="{5,}"
					title="Digite no mínimo 5 caracteres"
					onChange={handleChangeEmail}
					required
				/>
        	  	<label>Senha:</label>
				<input 
				  	value={password} 
				  	type="password" 
				  	name="password" 
				  	pattern="{6,}"
				  	title="Sua senha deve ter no mínimo 6 caracteres"			 
				  	onChange={handleChangePassword}
				  	required
				/> 
				<div>
					<button onClick={onClickLogin}>ENTRAR</button> 
					<button onClick={goToSignupPage}>CADASTRAR</button>  
				</div>
				               
			</form>
		</Container>
    );
}
