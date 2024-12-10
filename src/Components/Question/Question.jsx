import { useState, useEffect } from 'react';
import './Question.css';
import { useNavigate } from "react-router-dom";
import CasinoIcon from '@mui/icons-material/Casino';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SchoolIcon from '@mui/icons-material/School'

const Question = ({ enunciado, alternativas, dica, Acertar, pularQuestao }) => {
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
    let contador = 0;
    let NumeroCarta = Math.ceil(Math.random() * 3);
    alert(`As Cartas de Sorte irão escolher aleatoriamente entre 1 a 3 alternativas para eliminar contando com sua sorte. O número da sua sorte é...`)
    alert(` ${NumeroCarta}! Agora você tem mais chances de acertar. Boa sorte!`)

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
              onClick={
                () => {
                  if(window.confirm('Você está certo desta resposta?')){
                    verificarResposta(alternativa.correta)
                  }
                } 
              }
            >
              {alternativa.texto}
            </div>
          ))}
        </div>
      </div>
      <div className="caixa-ajuda">
        <button
          onClick={() => {
            if(window.confirm('Deseja utilizar as cartas?'))
              {CartasSorte()}
          }} 

          className="btn-sorte"
          disabled={cartasUsadas}
          style={{
            background : cartasUsadas? 'red' : ''
          }}
          >

          <CasinoIcon style={{ fontSize: '20px' }} /> <br />
          Usar Cartas de Sorte 
        </button>
        <button 
          onClick={
            () => {
              if(window.confirm(`Você deseja pular a questão? Você tem apenas ${pulosRestantes} pulos restando...`)){
                pular();
              }
            }
          } 
          className="btn-pular" 
          disabled={pulosRestantes === 0}
          style = {{
            background : pulosRestantes == 0? 'red' : ''
          }} 
        >
          <SkipNextIcon style={{ fontSize: '20px' }} /> <br />
          Pular Questão {pulosRestantes}x
        </button>
        <button className='btn-un'
          disabled={ajudaUsada}
          style={{
            background : ajudaUsada? 'red' : ''
          }}
          onClick={
            () => {
              if(window.confirm('Você deseja pedir ajuda aos universitários?')){
                usarAjuda(true);
                alert('Você pediu ajuda aos universitários, ao seu lado devem estar 3 alunos do IFPI - Campus Parníba que vão dar suas opiniões sobre a questão.')
              }
            }
          }>
        <SchoolIcon style={{ fontSize: '20px' }}/> <br />
          Ajuda dos Universitários
        </button>
        <button 
          disabled = {dicaUsada}
          style={{
            background : dicaUsada? 'red' : ''
          }}
          onClick={
            () => {
              if(window.confirm('Você deseja pedir uma dica?')){
                usarDica(true);
                alert(dica)
              }
            }
          } 
          className='btn-un'>
            <SchoolIcon style={{ fontSize: '20px' }}/> <br />
            Usar Dica 
            <br />&nbsp;
        </button>
      </div>
    </div>
  );
};

export default Question;
