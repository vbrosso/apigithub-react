import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [userList, setUserList] = useState([]); // Estado para armazenar a lista de resultados

  const handleSearch = () => {
    if (inputValue) {
      fetch(`https://api.github.com/search/users?q=${inputValue}&type=Users`)
        .then((res) => {
          if (res.status === 404) {
            setUserNotFound(true);
            setUserList([]); // Limpa a lista de resultados
            return null;
          }
          return res.json();
        })
        .then((json) => {
          if (json.items && json.items.length > 0) {
            setUserList(json.items); // Armazena a lista de resultados
            setUserNotFound(false);
          } else {
            setUserNotFound(true);
            setUserList([]); // Limpa a lista de resultados
          }
        })
        .catch((error) => console.error("Erro ao buscar dados do usuário:", error));
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setUserNotFound(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className='App'>
      <div> 
        <h2>Digite o seu nome de usuário do GitHub:</h2>
        <input
          type='text'
          value={inputValue}
          placeholder='Digite um nome'
          className='inputSearch'
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch} class="btnBuscar">Buscar</button>
        {userList.length > 0 ? (
          <ul className='listUsers'>
            {userList.map((user) => (
              <li key={user.id}>
                <a href={user.html_url} target="_blank" class="lnkPerfil">
                  <img src={user.avatar_url} alt={user.login} target="_blank" className='imgPerfil' />
                </a>
                <p><a href={user.html_url} target="_blank">{user.login}</a></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{userNotFound ? 'Nenhum usuário encontrado.' : ''}</p>
        )}
      </div>
    </div>
  );
}

export default App;
