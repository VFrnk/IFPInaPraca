import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const jogar = () => {
        navigate('/a')
    };

    return (
        <div className="content">
            <div className="title">
                Jogo do Milhão
            </div>
            <div className="button-div">
                <button className='button' onClick={jogar}>Jogar</button>
            </div>
        </div>
    );
}

export default Home;
