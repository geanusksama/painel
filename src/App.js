
import './App.css';
import { BrowserRouter as Rotas, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Painel from './pages/painel/Painel'

import { AuthProvider } from './context/AuthContext'
import { FetchFabricas } from './hooks/FetchFabricas';
import { useEffect } from 'react'
import NotFold from './pages/NotFold';
import Barra from './components/Barra';
import Linhas from './pages/linhas/Linhas';
import ValidaLgin from './pages/login/ValidaLogin';

// const navigate = useNavigate(); para programação

function App() {
  
  const getUsuarioLogado = Number(localStorage.getItem("logado"))
  // const {dados:linha} = FetchFabricas("https://fy7utcfntl.execute-api.us-east-1.amazonaws.com/franciscoestagiotmpython/linhas")

  return (
    <div className="App">
      <Rotas>
        <AuthProvider>
          <Barra />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={getUsuarioLogado != 1 ? <Login /> : <Navigate to='/' />} />
            <Route path='/painel' element={<Painel />} />
            <Route path='/fabricalinha' element={<Linhas />} />
            <Route path='/validalogin' element={<ValidaLgin />} />

            <Route path="*" element={<NotFold />} />
          </Routes>
        </AuthProvider>
      </Rotas>
    </div>
  );
  
}


export default App;
