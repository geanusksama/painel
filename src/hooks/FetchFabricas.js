import { useState, useEffect } from "react";


export const FetchFabricas = (url) => {
  const [dados, setDados] = useState(null)
  useEffect(() => {
    const getDados = async () => {
      const dados_do_banco = await fetch(url)
      const dados_json = await dados_do_banco.json()
      setDados(dados_json)
    }
    
    getDados()
    console.log(dados)
  }, [url])
  return  {dados,FetchFabricas} 
}

