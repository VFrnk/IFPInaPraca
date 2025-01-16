import { useState, useEffect } from "react";
import Question from "../../Components/Question/Question";
import perguntas from "../../Data/perguntas.json";

function Game() {
    const [acertos, setAcertos] = useState(0);
    const [nivelAtual, setNivelAtual] = useState("fácil"); 
    const [questoesRespondidas, setQuestoesRespondidas] = useState(0);
    const [questoesRespondidasNoNivel, setQuestoesRespondidasNoNivel] = useState(0); 
    const [perguntasExibidas, setPerguntasExibidas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(null);

    const premiacoes = ['1 MIL','2 MIL','3 MIL','5 MIL','10 MIL','20 MIL','30 MIL','50 MIL','100 MIL','200 MIL','300 MIL','400 MIL','500 MIL','750 MIL','1 Milhão',];

    const perguntasFiltradas = perguntas.perguntas.filter(
        (pergunta) => 
            pergunta.nivel === nivelAtual && 
            !perguntasExibidas.includes(pergunta.id)
    );

    useEffect(() => {
        if (perguntasFiltradas.length > 0) {
            const questionNumber = Math.floor(Math.random() * perguntasFiltradas.length);
            setPerguntaAtual(perguntasFiltradas[questionNumber]);
        } else if (nivelAtual === "fácil") {
            setNivelAtual("médio");
            setQuestoesRespondidas(0);  
            setQuestoesRespondidasNoNivel(0); 
            setPerguntasExibidas([]);  
        } else if (nivelAtual === "médio") {
            setNivelAtual("difícil");
            setQuestoesRespondidas(0);  
            setQuestoesRespondidasNoNivel(0);
            setPerguntasExibidas([]);
        } else {
            alert(`Jogo concluído! Você acertou ${acertos} questões.`);
        }
    }, [questoesRespondidas, nivelAtual]);

    const handleAcerto = () => {
        setAcertos(acertos + 1);
        setQuestoesRespondidas(questoesRespondidas + 1); 
        setQuestoesRespondidasNoNivel(questoesRespondidasNoNivel + 1); 
        handleProximaPergunta();
    };

    const handleProximaPergunta = () => {
        setPerguntasExibidas([...perguntasExibidas, perguntaAtual.id]);
    };

    const pularQuestao = () => {
        setPerguntasExibidas([...perguntasExibidas, perguntaAtual.id]); 
        handleProximaPergunta();
    };

    if (!perguntaAtual) {
        return <div>Carregando pergunta...</div>;
    }

    return (
        <div>
            <Question
                enunciado={perguntaAtual.enunciado}
                dica={perguntaAtual.dica}
                alternativas={perguntaAtual.alternativas.map((alt) => ({
                    texto: `${Object.values(alt)[0]}`,
                    correta: alt.correta,
                }))}
                Acertar={handleAcerto}
                pularQuestao={pularQuestao} 
                premiacao={premiacoes[acertos]}
            />
            <div style={{ marginTop: "20px", color: "darkblue", fontSize: "18px", fontWeight: "bold" }}>
                <p>Acertos: {acertos}</p>
                <p>Nível Atual: {nivelAtual}</p>
                <p>Respondidas neste nível: {questoesRespondidasNoNivel}/5</p>
            </div>
        </div>
    );
}

export default Game;
