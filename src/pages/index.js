import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FeedbackSection from '@site/src/components/FeedbackSection';
import styles from './index.module.css';

// Componente da Seção SharePoint (Estilo Faixa/Seção)
function SharepointSection() {
  return (
    <div 
      style={{
        padding: '4rem 0', // Espaçamento vertical grande
        textAlign: 'center', // Centraliza tudo
        // Usamos uma cor de fundo sutilmente diferente para destacar a faixa
        // Se quiser idêntico ao fundo geral, pode remover o backgroundColor
        backgroundColor: 'var(--ifm-background-surface-color)', 
        borderTop: '1px solid var(--ifm-color-emphasis-200)', // Linha sutil acima
        borderBottom: '1px solid var(--ifm-color-emphasis-200)', // Linha sutil abaixo
      }}
    >
      <div className="container">
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          🏢 Conheça mais a Squad
        </h2>
        
        {/* Usamos um max-width para o texto não ficar muito "esticado" em telas grandes */}
        <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem', 
            color: 'var(--ifm-font-color-base)',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
          Acesse nosso SharePoint para ver a estrutura do time, ritos, 
          membros e informações institucionais da Pré-Pix.
        </p>
        
        <a 
          className="button button--primary button--lg"
          href="LINK_DO_SEU_SHAREPOINT_AQUI"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acessar SharePoint
        </a>
      </div>
    </div>
  );
}

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
        <SharepointSection />
        <FeedbackSection />
      </main>
      
    </Layout>
  );
}