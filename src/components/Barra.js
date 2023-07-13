import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'
import './Barra.css'
const Barra = () => {
    const { logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
    }
    const getUsuarioLogado = Number(localStorage.getItem("logado"))

    const handleMOstraMenu = () => {
        document.querySelector("#menu2").classList.toggle("mostra")
    }

    return (
        <div>
            {getUsuarioLogado === 1 ?
                <img className='menuamburger' onClick={() => handleMOstraMenu()} width={20} src="/assets/img/menu_icon.png" alt="menu" />
                : ""}
            {getUsuarioLogado === 1 ?
                <div className="menu-geral " id='menu2'>
                    <nav>
                        <ul>
                            <li onClick={() => handleMOstraMenu()}><NavLink to="/">home</NavLink></li>
                            <li onClick={() => handleMOstraMenu()}><NavLink to="11">MES 1.0</NavLink></li>                            
                            <li onClick={() => handleMOstraMenu()}><NavLink to="/painel">MES 2.0</NavLink></li>
                            <li className='' onClick={handleLogout} > <NavLink to="#">Sair</NavLink></li>
                        </ul>

                    </nav>

                </div>
                : ""}
            {getUsuarioLogado === 1 ?
                <header>
                    <div className='container' >
                        <div className='logo'>Solution 2.0</div>
                        <nav>
                            <ul>
                                <li className='sair'><NavLink to="/">home</NavLink></li>
                                <li className='envase'><NavLink to="11">MES 1.0</NavLink></li>                            
                                <li className='mes'><NavLink to="/painel">MES 2.0</NavLink></li>
                                <li className='sair' onClick={handleLogout} > <NavLink to="#">Sair</NavLink></li>
                            </ul>
                        </nav>
                        <div></div>
                    </div>
                </header>

                : ""}

        </div>
    )
}

export default Barra