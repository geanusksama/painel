import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
// arquivos JSON
import JsonFabricas from '../json/dados_fabrica.json'
import JsonLinhas from '../json/dados_linhas.json'

import './Painel.css'
import '../linhas/Linhas.css'

const Painel = () => {



  const [fabrica, setFabrica] = useState([]);

  // usado para preencher as fabricas
  useEffect(() => {
    setFabrica(JsonFabricas)
  }, []);

  // usado para pegaras as linhas
  const [linhas, setLinhas] = useState([]);
  useEffect(() => {
    setLinhas(JsonLinhas)
  }, []);

  // filtra linhas
  const escolheLinhas = (fabrica_sigla) => {
    setLinhas(JsonLinhas.filter((f) => f.fabrica === fabrica_sigla))
  }


  const handleMostraDetalhes = (id_linha) => {
    setLinhas(
      linhas.filter((linha) => {
        if (linha.id === id_linha) {
          console.log("Clicou" + id_linha)
          if (linha.detalhes === 'mostra') {
            linha.detalhes = "nao"
          } else {
            linha.detalhes = 'mostra'
          }
          return linha
        } else {
          return linha
        }

      })
    )
  }
  return (
    <div className='main'>
      {/* mostra fabricas */}
      <br />
      <br />
      <section className='painel-home'>

        <div className='fabricas' >
          {
            fabrica.map((f) => (
              <div className='nome-fabricas' key={f.id} >
                <div className={
                  f.status === "1" ?
                    'fabrica_siglas_green' : f.status === "2" ?
                      'fabrica_siglas_orange' : 'fabrica_red'
                } >
                  <NavLink to='/fabricalinha' >{f.sigla}</NavLink>
                </div>
              </div>

            ))
          }
        </div>
      </section>
      <section className='linhas-geral'>
        {/* mostra todas as linhas */}
        <div className='linhas' >
          {
            linhas.map((f) => (
              <div className='nome-linhas' key={f.id} >
                <div className='sec-um'>
                  <h2>
                    L {f.numero}
                  </h2>
                  {f.fabrica}

                  <button onClick={() => {
                    handleMostraDetalhes(f.id)
                  }}>{
                      f.detalhes === "nao" ? "+" : f.detalhes === "mostra" ? "-" : "+"
                    }</button>

                </div>
                <div className='sec-grafico'>
                  <p>Grafico</p>
                </div>
                <div className='sec-dois'>
                  <p>Velocidade atual</p>
                  {/* muda o texto conforma status */}
                  {
                    f.estado === '1' ?
                      <span>{f.velocidade_atual}</span> :
                      f.estado === '2' ? "STOP" : "Parada crítica"
                  }
                  {/* mostra engrenagem */}
                  {
                    // se estado a linha = 1
                    f.estado === "1" ?
                      (f.velocidade_atual * 100 / f.velocidade_nominal) >= 70 &&
                        (f.velocidade_atual * 100 / f.velocidade_nominal) < 80
                        ? <div className="quadrado_amarelo"></div>
                        : (f.velocidade_atual * 100 / f.velocidade_nominal) >= 80 &&
                          (f.velocidade_atual * 100 / f.velocidade_nominal) <= f.velocidade_nominal
                          ?
                          <div className="quadrado_verde"></div>
                          :
                          <div className="quadrado_vermelho"></div>
                      : f.estado === "2" ?
                        <div className="quadrado_branco"></div> :
                        <div className="quadrado_stop"></div>
                  }
                  <img width={200} src="./assets/img/status.png" alt="Status" />
                </div>
                <div className='sec-tres'>
                  <div className='veloAtual'>

                    <div className='valor_vel'>
                      <div className='tituloVelocidade' >Produção atual</div>
                      {
                        f.estado === '1' ?
                          f.producao :
                          f.estado === '2' ? "Parada programada" : "0"
                      }
                    </div>
                  </div>
                  <div className='tempoRecupera_detalhes'>
                    <span className='tempo' >Produto</span>  <br />
                    {
                      f.estado === '1' ?
                        f.produto :
                        f.estado === '2' ? "Em preparação" : "Sem produto"
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

    </div>
  )
}

export default Painel