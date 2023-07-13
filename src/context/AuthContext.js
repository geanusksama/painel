import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [erro, setErro] = useState('')
    const [load, setload] = useState('')
    const [tipo, setTipo] = useState('')

    useEffect(() => {
        console.log("Verifica usuário")
        const getUsuarioLogado = Number(localStorage.getItem("logado"))
        if (getUsuarioLogado != 1) {
            navigate("/login")
        }

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
          setErro("");
        }, 4000);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

    const getToken = async (username, password, key) => {
        try {
            setload("Validando dados...")
            const response = await fetch(process.env.REACT_APP_URL_TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_API_key
                },
                body: JSON.stringify({
                    "user": process.env.REACT_APP_USER,
                    "password": process.env.REACT_APP_PASSOWRD
                }),
            });

            if (response.ok) {
                setload("")
                setErro('')
                setTipo('')
                console.log(key)
                const data = await response.json();
                localStorage.setItem("token", data.accessToken)
                key === 0 ? handleValidaLogin(username, password) : getTokenValidacao(username)

            } else {
                setErro('Erro ao obter Token')

            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }

    }
    const getTokenValidacao = async (username) => {
        try {
            setload("Validando matrícula...")
            const response = await fetch(process.env.REACT_APP_ADD_GROUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_API_key,
                    'Authorization': localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "user": username,
                    "password": "",
                    "groupID": process.env.REACT_APP_GROUP_ID,
                    "applicationName": "LAB40",
                    "logicalDelete": ""
                }),
            });

            if (response.ok) {
                setload("")
                setErro(<div className="message">
                    Matrícula validada com sucesso
                </div>)
                setTipo('')
                navigate('/login')


            } else {
                setload("")
                setTipo('')
                setErro('Algo deu errado! verifique se digitou sua matrícula corretamente')

            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }

    }

    // cadastra o usuário pela matricul
    const handleValidaLogin = async (username, password) => {
        if (!username || !password) {
            console.log("Sem dados")
            setTipo('1')
            setErro("Os campos matrícula e senha são obrigatórios!")
            setload('')
            return
        }
        try {
            const response = await fetch(process.env.REACT_APP_URL_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_API_key,
                    'Authorization': localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "user": username,
                    "password": password,
                    "applicationName": "LAB40"
                }),
            });

            if (response.ok) {
                localStorage.setItem("logado", 1)
                setload("")
                setErro('')
                setTipo('')
                navigate("/")
            } else {
                setTipo('2')
                console.log('Erro ao logar');
                navigate('/login')
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    const logout = () => {
        setErro('')
        setTipo('')
        navigate('/login',)
        localStorage.setItem("logado", 0)
        window.location.reload();
    }

    return (
        <AuthContext.Provider value={
            {
                logout, getToken,
                erro, setErro,
                load, setload, tipo,
                getTokenValidacao
            }} >
            {children}
        </AuthContext.Provider>
    )
}

