import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    isChecked: false,
    loading: false,
    // savedSongs: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const api = await getFavoriteSongs();
    this.setState({
      isChecked: api.some((elem) => elem.trackId === trackId),
    });
  }

  handleCheck = async ({ target: { checked } }) => {
    const { trackInfo } = this.props;

    this.setState({
      isChecked: checked,
      loading: true,
    });
    await addSong(trackInfo);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;

    const { isChecked, loading } = this.state;
    return (
      loading ? (
        <Loading />
      ) : (
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <label>
            Favorita
            <input
              checked={ isChecked }
              type="checkbox"
              onChange={ this.handleCheck }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackInfo: PropTypes.shape().isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
