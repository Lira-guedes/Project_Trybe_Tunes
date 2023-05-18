import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    isChecked: false,
    loading: false,
  };

  handleCheck = async ({ target: { checked } }) => {
    const { trackInfo } = this.props;

    this.setState({
      isChecked: checked,
      loading: true,
    });
    if (checked) {
      await addSong(trackInfo);
      this.setState({
        loading: false,
      });
    } else {
      await removeSong(trackInfo);
      this.setState({
        loading: false,
      });
    }
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
          <label data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              checked={ isChecked }
              type="checkbox"
              onChange={ this.handleCheck }
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
