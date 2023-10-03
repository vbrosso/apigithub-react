import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null); // Inicialize user como null
  const [number, setNumber] = useState(1);
  const [inputValue, setInputValue] = useState('vbrosso'); // Inicialize inputValue como uma string vazia
  const [userNotFound, setUserNotFound] = useState(false); // Estado para rastrear se o usuário não foi encontrado

  const changeNumber = () => {
    setNumber((prevNumber) => prevNumber + 1);
  }

  const handleSearch = () => {
    if (inputValue) {
      fetch(`https://api.github.com/users/${inputValue}`)
        .then((res) => {
          if (res.status === 404) {
            setUserNotFound(true); // Define o estado para indicar que o usuário não foi encontrado
            setUser(null);
            return null;
          }
          return res.json();
        })
        .then((json) => {
          if (json) {
            setUser(json);
            setInputValue(json.login);
            setUserNotFound(false); // Define o estado de volta para falso se o usuário for encontrado
          }
        })
        .catch((error) => console.error("Erro ao buscar dados do usuário:", error));
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setUserNotFound(false); // Limpa o estado de usuário não encontrado ao digitar no input
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Chame a função de busca quando a tecla "Enter" for pressionada
    }
  }

  return (
    <div className='App'>
      <div>
        <h2>Digite o seu nome de usuário do github:</h2>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Buscar</button> {/* Botão de busca */}
        {user && (
            <div>
            <p>Seu nome de usuario é {user.login}</p>
            <p><strong>Nome:</strong> {user.name} </p>
           
            <p><strong>Location:</strong> {user.location}</p>
            <img src={user.avatar_url} alt={user.name} className='imgPerfil' />
            <legend>Link da Api: <a href={user.url} target='_blank' title={user.name}>{user.name} </a></legend>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
