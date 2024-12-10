import { useState, useEffect } from "react";
import Question from "../../Components/Question/Question";
import perguntas from "../../Data/perguntas.json";

function Game() {
    // Estados
    const [acertos, setAcertos] = useState(0);
    const [nivelAtual, setNivelAtual] = useState("fácil"); // Inicia no nível fácil
    const [questoesRespondidas, setQuestoesRespondidas] = useState(0);
    const [questoesRespondidasNoNivel, setQuestoesRespondidasNoNivel] = useState(0); // Contador para questões respondidas por nível
    const [perguntasExibidas, setPerguntasExibidas] = useState([]); // IDs das perguntas exibidas
    const [perguntaAtual, setPerguntaAtual] = useState(null);

    // Filtra perguntas pelo nível atual que ainda não foram exibidas
    const perguntasFiltradas = perguntas.perguntas.filter(
        (pergunta) => 
            pergunta.nivel === nivelAtual && 
            !perguntasExibidas.includes(pergunta.id)
    );

    // Sorteia uma nova pergunta
    useEffect(() => {
        if (perguntasFiltradas.length > 0) {
            const questionNumber = Math.floor(Math.random() * perguntasFiltradas.length);
            setPerguntaAtual(perguntasFiltradas[questionNumber]);
        } else if (nivelAtual === "fácil") {
            setNivelAtual("médio");
            setQuestoesRespondidas(0);  // Reseta contador de questões totais
            setQuestoesRespondidasNoNivel(0); // Reseta questões respondidas no nível
            setPerguntasExibidas([]);  // Reseta as perguntas exibidas
        } else if (nivelAtual === "médio") {
            setNivelAtual("difícil");
            setQuestoesRespondidas(0);  // Reseta contador de questões totais
            setQuestoesRespondidasNoNivel(0); // Reseta questões respondidas no nível
            setPerguntasExibidas([]);  // Reseta as perguntas exibidas
        } else {
            alert(`Jogo concluído! Você acertou ${acertos} questões.`);
        }
    }, [questoesRespondidas, nivelAtual]);

    const handleAcerto = () => {
        setAcertos(acertos + 1);
        setQuestoesRespondidas(questoesRespondidas + 1); // Incrementa as questões totais
        setQuestoesRespondidasNoNivel(questoesRespondidasNoNivel + 1); // Incrementa as questões respondidas no nível
        handleProximaPergunta();
    };

    const handleProximaPergunta = () => {
        setPerguntasExibidas([...perguntasExibidas, perguntaAtual.id]);
    };

    // Função para pular a questão sem incrementar o contador de questões respondidas
    const pularQuestao = () => {
        setPerguntasExibidas([...perguntasExibidas, perguntaAtual.id]); // Marca a pergunta como respondida
        handleProximaPergunta(); // Avança para a próxima pergunta
    };

    if (!perguntaAtual) {
        return <div>Carregando pergunta...</div>;
    }

    return (
        <div>
            <Question
                enunciado={perguntaAtual.enunciado}
                alternativas={perguntaAtual.alternativas.map((alt) => ({
                    texto: `${Object.values(alt)[0]}`,
                    correta: alt.correta,
                }))}
                Acertar={handleAcerto}
                pularQuestao={pularQuestao} // Passando a função de pular
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
