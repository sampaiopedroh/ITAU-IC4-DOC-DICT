import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FeedbackSection from '@site/src/components/FeedbackSection';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.squadDescription}>
          <p>
            Somos a squad responsável pela <strong>Gerência de Chaves Pix</strong> e pela 
            conectividade segura com o DICT. Nossa missão é garantir a alta disponibilidade, 
            integridade e conformidade regulatória das chaves dos clientes Itaú.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Início"
      description="Portal de Documentação da Squad Pré-Pix">
      
      <HomepageHeader />
      
      <main>
        <HomepageFeatures />
        <FeedbackSection />
      </main>
      
    </Layout>
  );
}