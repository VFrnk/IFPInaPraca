import { useState, useEffect } from 'react';
import './Question.css';
import { useNavigate } from "react-router-dom";

const Question = ({ enunciado, alternativas, Acertar }) => {
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
  const [alternativasOriginais, setAlternativasOriginais] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const embaralhadas = [...alternativas].sort(() => Math.random() - 0.5);
    setAlternativasEmbaralhadas(embaralhadas);
    setAlternativasOriginais(embaralhadas);
  }, [alternativas]);

  const CartasSorte = () => {
    let novasAlternativas = [...alternativasOriginais]; 
    let contador = 0;
    let NumeroCarta = Math.ceil(Math.random() * 3);

    while (contador < NumeroCarta) {
      let j = Math.floor(Math.random() * novasAlternativas.length);

      if (!novasAlternativas[j].correta) {
        novasAlternativas.splice(j, 1);
        contador++;
      }
    }

    setAlternativasEmbaralhadas(novasAlternativas);
  };

  const verificarResposta = (correta) => {
    if (correta) {
      Acertar((acertos) => acertos + 1);
      alert('Você acertou!!!');
    } else {
      navigate('/end');
    }
  };

  return (
    <div className="column">
      <div className="statement">{enunciado}</div>
      <div>
        <button onClick={CartasSorte}>Usar Cartas de Sorte</button>
      </div>
      <div className="answers">
        {alternativasEmbaralhadas.map((alternativa, index) => (
          <div
            key={index}
            className="answer"
            onClick={() => verificarResposta(alternativa.correta)} 
          >
            {alternativa.texto}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
