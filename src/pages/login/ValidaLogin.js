import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

import './ValidaLogin.css'

const ValidaLogin = () => {

  const {
    getToken, erro, load, tipo, setErro } = useContext(AuthContext)

  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };




  const handleSubmitValida = (e) => {
    getToken(username, "", 1)
  }

  return (
    <div className='container'>

      <section className="login">
        <form>
          <div>
            <h4>Validar matrícula</h4>
            {tipo === '1' ? setErro("Campos devem ser preenchido") : tipo === '2' ? setErro(" Matrícula ou senha inválida") : ""}
            <div className='msg-topo' > {erro && erro} </div>
            <label>
              <span> Usuário </span>
              <input type="text" value={username} onChange={handleUsernameChange} placeholder='Digite sua matrícula' required />
            </label>
          </div>

          <button type="button" onClick={handleSubmitValida}>
            Solicitar validação
          </button>

          <p>
          </p>
          <br />
          <br />
          <div className='msg-botton' > {load && load} </div>
        </form>
      </section>

    </div>
  )
}

export default ValidaLogin