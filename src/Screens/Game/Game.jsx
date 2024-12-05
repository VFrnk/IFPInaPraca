import Question from "../../Components/Question/Question";
import perguntas from "../../Data/questions.json"

function Game() {
    let questionNumber = (Math.floor(Math.random()*4));
    return(
        <div>
            <Question
            statement = {perguntas.perguntas[questionNumber].enunciado.toUpperCase()}
            answers = {perguntas.perguntas[questionNumber].alternativas}
            />
        </div>
    );
}
export default Game;