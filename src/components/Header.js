import React from 'react';
import { Link } from 'react-router-dom';
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
        <ul>
          <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favorites</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
        </ul>
      </header>
    );
  }
}
