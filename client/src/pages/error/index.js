import React from 'react';
import PageLayout from '../../components/page-layout';
import styles from './index.module.css'

const ErrorPage= () => {
    return (
        <PageLayout>
            <div className={styles.error}>Error Page</div>
        </PageLayout>
    )
}

export default ErrorPage