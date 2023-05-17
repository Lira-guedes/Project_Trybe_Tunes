import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  state = {
    loading: false,
    name: '',
    redirect: false,
    disabledButton: true,
  };

  enableButton = ({ target }) => {
    const min = 3;
    const { name, value } = target;
    if (value.length >= min) {
      this.setState(() => ({
        [name]: value,
        disabledButton: false,
      }));
    }
  };

  handleLogin = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { disabledButton, loading, redirect } = this.state;
    if (redirect) return <Redirect to="/search" />;

    return (
      loading ? (<Loading />) : (
        <div data-testid="page-login">
          <form>
            <label>
              Nome:
              <input
                name="name"
                data-testid="login-name-input"
                placeholder="Digite o seu nome:"
                onChange={ this.enableButton }
              />
            </label>
            <button
              data-testid="login-submit-button"
              onClick={ this.handleLogin }
              disabled={ disabledButton }
            >
              Entrar
            </button>
          </form>
        </div>
      )
    );
  }
}
