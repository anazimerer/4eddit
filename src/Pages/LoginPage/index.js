import React from 'react'
import { useHistory } from 'react-router-dom'
import useInputValue from "../../Hooks/useInputValue";
import api from '../../Sevice/api'

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

    return(
        <div>
        	<forms>			
        	  	<label>email:</label> 
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
				<button onClick={onClickLogin}>ENTRAR</button> 
				<button>CADASTRAR</button>                 
			</forms>
		</div>
    );
}
