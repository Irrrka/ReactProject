import React from 'react';
import styles from './index.module.css';
import Button from '../button';

const SubmitButton = ({title, onClick }) => {
  return (
//     <div class="d-flex justify-content-between">
//   <h3>{{ 'Projects' | translate }}</h3>
//   <button (click)="addNewProject()" type="button" class="btn btn-primary">
//     <i class="fas fa-plus"></i>
//     {{'New project' | translate}}</button>
// </div>
   <Button type="submit" onClick={onClick} className={styles.submit}> {title} </Button>
  );
}

export default SubmitButton;
