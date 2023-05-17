import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    disabledButton: true,
  };

  enableButton = ({ target }) => {
    const min = 2;
    const { name, value } = target;
    if (value.length >= min) {
      this.setState(() => ({
        [name]: value,
        disabledButton: false,
      }));
    }
  };

  render() {
    const { disabledButton } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            data-testid="search-artist-input"
            onChange={ this.enableButton }
          />
          <button
            data-testid="search-artist-button"
            disabled={ disabledButton }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}
