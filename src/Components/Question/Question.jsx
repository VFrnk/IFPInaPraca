import React, { useState } from "react";
import './Question.css';
import { useNavigate } from "react-router-dom";

export default function Question({ statement, answers }) {
  const [feedback, setFeedback] = useState(null); // Estado para o feedback da resposta

  // Função para embaralhar as respostas
  const shuffleAnswers = (answers) => {
    return [...answers].sort(() => Math.random() - 0.5);
  };

  const shuffledAnswers = shuffleAnswers(answers);

  const navigate = useNavigate();
  const perder = () => {
    return(navigate('/end'))
  }
  // Função chamada ao clicar em uma resposta
  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setFeedback("Você acertou! ");
    } else {
      perder()
    }
  };

  return (
    <div className="column">
      <div className="statement">{statement}</div>
      <div className="answers">
        {shuffledAnswers.map((answer, index) => (
          <div
            key={index}
            className="answer"
            onClick={() => handleAnswerClick(answer.correta)} // Passa se a resposta está correta
          >
            {answer.texto}
          </div>
        ))}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}
