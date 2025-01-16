import { useState, useEffect } from 'react';
import './Question.css';
import { useNavigate } from "react-router-dom";
import CasinoIcon from '@mui/icons-material/Casino';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SchoolIcon from '@mui/icons-material/School';

const Question = ({ enunciado, alternativas, dica, Acertar, pularQuestao, premiacao }) => {
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
  const [alternativasOriginais, setAlternativasOriginais] = useState([]);
  const [pulosRestantes, setPulosRestantes] = useState(3);
  const [cartasUsadas, usarCartas] = useState(false);
  const [dicaUsada, usarDica] = useState(false);
  const [ajudaUsada, usarAjuda] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const embaralhadas = [...alternativas].sort(() => Math.random() - 0.5);
    setAlternativasEmbaralhadas(embaralhadas);
    setAlternativasOriginais(embaralhadas);
  }, [alternativas]);

  const CartasSorte = () => {
    let novasAlternativas = [...alternativasOriginais];
    usarCartas(true);
    const NumeroCarta = Math.ceil(Math.random() * 3);
    alert(`As Cartas de Sorte eliminarão ${NumeroCarta} alternativas. Boa sorte!`);

    let contador = 0;
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
      setPulosRestantes(pulosRestantes - 1);
      pularQuestao();
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
              onClick={() => {
                if (window.confirm('Você está certo desta resposta?')) {
                  verificarResposta(alternativa.correta);
                }
              }}
            >
              {alternativa.texto}
            </div>
          ))}
        </div>
      </div>

      <div className="side-column">
        <div className="caixa-ajuda">
          <button
            onClick={() => {
              if (window.confirm('Deseja utilizar as cartas?')) {
                CartasSorte();
              }
            }}
            className="btn-sorte"
            disabled={cartasUsadas}
          >
            <CasinoIcon /> <br />
            Usar Cartas de Sorte
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Você deseja pular a questão? Você tem apenas ${pulosRestantes} pulos restantes...`)) {
                pular();
              }
            }}
            className="btn-pular"
            disabled={pulosRestantes === 0}
          >
            <SkipNextIcon /> <br />
            Pular Questão {pulosRestantes}x
          </button>
          <button
            onClick={() => {
              if (window.confirm('Você deseja pedir ajuda aos universitários?')) {
                usarAjuda(true);
                alert('Você pediu ajuda aos universitários.');
              }
            }}
            className="btn-un"
            disabled={ajudaUsada}
          >
            <SchoolIcon /> <br />
            Ajuda dos Universitários
          </button>
          <button
            onClick={() => {
              if (window.confirm('Você deseja pedir uma dica?')) {
                usarDica(true);
                alert(dica);
              }
            }}
            className="btn-un"
            disabled={dicaUsada}
          >
            <SchoolIcon /> <br />
            Usar Dica
          </button>
        </div>

        <div className="extra-container">
          <p>{premiacao}</p>
        </div>
      </div>
    </div>
  );
};

export default Question;
