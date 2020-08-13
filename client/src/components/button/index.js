import React from 'react';
import styles from './index.module.css';

const SubmitButton = ({title, onClick }) => {
  return (
   <Button type="submit" onClick={onClick} className={styles.submit}> {title} </Button>
  );
}

export default SubmitButton;
