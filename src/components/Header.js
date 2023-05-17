import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  state = {
    loading: true,
    name: '',
  };

  async componentDidMount() {
    const userName = await getUser();
    this.setState({
      loading: false,
      name: userName.name,
    });
  }

  render() {
    const { loading, name } = this.state;
    if (loading) return (<Loading />);

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{name}</p>
      </header>
    );
  }
}
