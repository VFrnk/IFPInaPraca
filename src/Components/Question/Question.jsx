import { useState, useEffect } from 'react';
import './Question.css';
import { useNavigate } from "react-router-dom";
import CasinoIcon from '@mui/icons-material/Casino';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Question = ({ enunciado, alternativas, Acertar, pularQuestao }) => {
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
  const [alternativasOriginais, setAlternativasOriginais] = useState([]);
  const [pulosRestantes, setPulosRestantes] = useState(3); // Máximo de pulos
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

    while (contador < NumeroCarta && novasAlternativas.length > 1) {
      const index = Math.floor(Math.random() * novasAlternativas.length);
      if (!novasAlternativas[index].correta) {
        novasAlternativas.splice(index, 1);
        contador++;
      }
    }

    setAlternativasEmbaralhadas(novasAlternativas);
  };

  const verificarResposta = (correta) => {
    if (correta) {
      Acertar((acertos) => acertos + 1);
      alert('Você acertou!');
    } else {
      navigate('/end');
    }
  };

  const pular = () => {
    if (pulosRestantes > 0) {
      setPulosRestantes(pulosRestantes - 1); // Decrementa o número de pulos restantes
      pularQuestao(); // Chama a função de pular questão passada pelo componente pai
    }
  };

  return (
    <div className="row">
      <div className="column">
        <div className="statement">{enunciado}</div>
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
      <div className="caixa-ajuda">
        <button onClick={CartasSorte} className="btn-sorte">
          Usar Cartas de Sorte <CasinoIcon style={{ marginLeft: '8px', fontSize: '20px' }} />
        </button>
        <button 
          onClick={pular} 
          className="btn-pular" 
          disabled={pulosRestantes === 0} // Desabilita o botão se não houver mais pulos
        >
          Pular Questão <SkipNextIcon style={{ marginLeft: '8px', fontSize: '20px' }} />
        </button>
        <div className="pulos-info">
          Pulos restantes: {pulosRestantes}
        </div>
      </div>
    </div>
  );
};

export default Question;
