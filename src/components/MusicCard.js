import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  state = {
    isChecked: false,
  };

  handleCheck = ({ target: { checked } }) => {
    this.setState({
      isChecked: checked,
    });
  };

  render() {
    const { trackName, previewUrl } = this.props;
    const { isChecked } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label>
          <input
            checked={ isChecked }
            type="checkbox"
            onChange={ this.handleCheck }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

// if (checked) {
//     addFavorite({ name, music, album})
// } else {
//     removeFavorite({ name, music, album})
// }
