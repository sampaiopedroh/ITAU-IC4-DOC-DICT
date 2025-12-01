import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Documentação Geral',
    description: (
      <>
        Visão unificada de todas as peças, tutoriais e arquitetura da Squad Pré-Pix.
      </>
    ),
    link: '/docs/documentacao-geral',
  },
  {
    title: 'Peças',
    description: (
      <>
        Detalhes técnicos de cada microsserviço e componente (Validador, Sincronizador, etc).
      </>
    ),
    link: '/docs/pecas',
  },
  {
    title: 'Tutoriais',
    description: (
      <>
        Guias passo-a-passo para operações comuns, onboardings e resolução de problemas.
      </>
    ),
    link: '/docs/tutoriais',
  },
  {
    title: 'Manual da DICT (BCB)',
    description: (
      <>
        Documentação oficial e regulatória do Banco Central (PDF v8.0).
      </>
    ),
    link: 'https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/X_ManualOperacionaldoDICT.pdf',
    external: true,
  },
  {
    title: 'API da DICT (BCB)',
    description: (
      <>
        Swagger e especificações técnicas oficiais da API do DICT (OpenAPI v2.8.0).
      </>
    ),
    link: 'https://www.bcb.gov.br/content/estabilidadefinanceira/pix/API-DICT.html',
    external: true,
  },
  {
    title: 'Adicionais',
    description: (
      <>
        Glossário de termos, ferramentas de apoio e documentações periféricas.
      </>
    ),
    link: '/docs/adicionais',
  },
];

function Feature({title, description, link, external}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md margin-bottom--lg">
        <div className={clsx('card h-100', styles.featureCard)}>
          <div className="card__header">
            <Heading as="h3">{title}</Heading>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <Link
              className="button button--secondary button--block"
              to={link}
              target={external ? '_blank' : '_self'}>
              Acessar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}