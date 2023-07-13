import React, { useContext, useState,useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import './ValidaLogin.css'

const Login = () => {

  const {
    getToken, erro, load, tipo, setErro } = useContext(AuthContext)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    getToken(username, password, 0)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setErro("");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='container'>
      {/* <h1>Login painel</h1>
      <hr /> */}

      <section className="login">

        <form>
          <div>
            <h4>Login</h4>
            {tipo === '1' ? setErro("Campos devem ser preenchidos") : tipo === '2' ? setErro(" Matrícula ou senha inválida") : ""}
            <div className='msg-topo' > {erro && erro} </div>
            <label>
              <span> Usuário </span>
              <input type="text" value={username} onChange={handleUsernameChange} placeholder='Digite sua matrícula' required />
            </label>
          </div>
          <div>
            <label>
              <span>Senha</span>
              <input type="password" value={password} onChange={handlePasswordChange} placeholder='Digite sua senha' />
            </label>
          </div>
          <button type="button" onClick={handleSubmit}>
            Entrar
          </button>

          <small id="emailHelp" className="form-text text-muted">Se ainda não solicitou a validação de usuário clique no link abaixo "Validar Matrícula"</small> <br /><br />

          <NavLink style={{ padding: '10px 0px', color: 'red' }} to='/validalogin' >Validar Matrícula</NavLink><br />

          <br />
          <div className='msg-botton' > {load && load} </div>
          <br />

          <br />
        </form>
      </section>

    </div>
  )
}

export default Login