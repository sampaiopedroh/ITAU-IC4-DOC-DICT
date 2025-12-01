import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function FeedbackSection() {
  return (
    <section className={styles.feedbackSection}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <h2 className={styles.title}>
              Nos ajude a evoluir esta documentação
            </h2>
            <p className={styles.description}>
              Encontrou algum erro, link quebrado ou sentiu falta de alguma informação técnica sobre o DICT? 
              Sua opinião é fundamental para a squad Pré-Pix.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--lg button--primary"
                to="https://forms.office.com/seu-link-de-feedback-aqui" // Coloque o link real aqui
                target="_blank">
                📝 Enviar Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}