import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends React.Component {
  state = {
    loading: false,
    apiRequest: false,
    disabledButton: true,
    name: '',
  };

  // habilita botão
  enableButton = ({ target }) => {
    const min = 2;
    const { value } = target;
    if (value.length >= min) {
      this.setState(() => ({
        name: value,
        savedName: value,
        disabledButton: false,
      }));
    }
  };

  // faz busca
  handleSearch = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    // limpa os campos
    this.setState({
      name: '',
      loading: true,
    });
    // requisição api
    const api = await searchAlbumsAPI(name);
    this.setState({
      loading: false,
      apiRequest: api,
    });
  };

  render() {
    const { disabledButton, loading, apiRequest, savedName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <div>
            <label>
              <input
                type="text"
                // value={ name }
                name="name"
                data-testid="search-artist-input"
                onChange={ this.enableButton }
              />
            </label>
            <button
              data-testid="search-artist-button"
              disabled={ disabledButton }
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </div>
        )}

        {
          apiRequest && apiRequest.length > 0 && (
            <div>
              <h2>
                Resultado de álbuns de:
                {' '}
                {savedName}
              </h2>
              <ul>
                {
                  apiRequest.map((elem) => (
                    <li key={ elem.collectionId }>
                      <img src={ elem.artworkUrl100 } alt={ elem.collectionName } />
                      <h3>{ elem.artistName }</h3>
                      <p>{ elem.collectionName }</p>
                      <Link
                        data-testid={ `link-to-album-${elem.collectionId}` }
                        to={ `/album/${elem.collectionId}` }
                      >
                        Mais informações
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }

        {
          apiRequest.length === 0 && (<p>Nenhum álbum foi encontrado</p>)
        }
      </div>
    );
  }
}
