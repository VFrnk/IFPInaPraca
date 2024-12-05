import './Gameover.css';
import { useNavigate } from 'react-router-dom';

function Gameover() {

    const navigate = useNavigate();

    const jogar = () => {
        navigate('/')
    };

    return (
        <div className="content">
            <div className="title">
                Voce Perdeu
            </div>
            <div className="button-div">
                <button className='button' onClick={jogar}>Jogar de Novo</button>
            </div>
        </div>
    );
}

export default Gameover;
