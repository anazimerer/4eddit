import React from 'react'
import useInputValue from "../../Hooks/useInputValue";

export default function Login(){
    const [user, handleChangeUser] = useInputValue("");
    const [password, handleChangePassword] = useInputValue("");
    
    return(
        <div>
        	<forms>			
        	  	<label>user:</label> 
				  <input 
				  value={user} 
				  type="user"
				  name="user" 
				  pattern="{5,}"
				  title="Digite no mínimo 5 caracteres"
				  onChange={handleChangeUser}
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
			</forms>
		</div>
    );
}
