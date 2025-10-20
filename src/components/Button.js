import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ text, type = 'button', onClick }) {
  return (
    <button type={type} className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
