import { useState } from "react";
import Question from "../../Components/Question/Question";
import perguntas from "../../Data/questions.json"

function Game() {

    let questionNumber = (Math.floor(Math.random()*4));

    const [acertos, setAcertos] = useState(0);

    console.log(acertos);
    return(
        <div>
            <Question
            enunciado = {perguntas.perguntas[questionNumber].enunciado}
            alternativas = {perguntas.perguntas[questionNumber].alternativas}
            Acertar={setAcertos}
            />
            <div>Acertos {acertos}</div>
        </div>
    );
}
export default Game;