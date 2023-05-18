import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    loading: true,
    info: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const apiRequest = await getMusics(id);
    this.setState({
      loading: false,
      info: apiRequest,
    });
  }

  render() {
    const { loading, info } = this.state;
    // if (loading) return (<Loading />);
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <div>
            <img src={ info[0].artworkUrl100 } alt={ info.collectionName } />
            <h4 data-testid="artist-name">{ info[0].artistName }</h4>
            <p data-testid="album-name">{ info[0].collectionName }</p>
            {
              info.filter((_, index) => index !== 0)
                .map((elem) => (<MusicCard
                  key={ elem.trackId }
                  trackId={ elem.trackId }
                  trackName={ elem.trackName }
                  previewUrl={ elem.previewUrl }
                />))
            }
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
