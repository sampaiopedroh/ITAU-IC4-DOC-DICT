// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pré Pix',
  tagline: 'Gerência de Chaves Pix - Itaú',
  url: 'https://seu-usuario.github.io', // ALTERAR: Sua URL do GitHub Pages
  baseUrl: '/ITAU-IC4-DOC-DICT/',       // ALTERAR: Nome do repositório
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',

  // Configurações de Deploy no GitHub Pages
  organizationName: 'itau-pre-pix', // ALTERAR: Nome da organização ou usuário GitHub
  projectName: 'ITAU-IC4-DOC-DICT', // ALTERAR: Nome do repositório

  // Internacionalização
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Removemos o "editUrl" pois é uma documentação interna
          // editUrl: 'https://github.com/...',
        },
        blog: false, // Blog desativado conforme solicitado
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // Plugin de Busca Local (Habilita a barra de busca e o atalho Ctrl+K)
  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexDocs: true,
        language: "pt",
        style: "none" // Usa o estilo padrão do Docusaurus para se integrar ao tema
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Configuração do Header (Navbar)
      navbar: {
        title: 'Pré Pix', // Nome da Squad
        logo: {
          alt: 'Logo Pix',
          src: 'img/pix-logo.png', // Certifique-se de ter este arquivo em static/img/
        },
        items: [
          // A barra de busca é inserida automaticamente pelo plugin search-local
          
          // Links alinhados à direita
          {
            to: '/docs/documentacao-geral',
            label: 'Documentação Geral',
            position: 'right',
          },
          {
            to: '/docs/adicionais',
            label: 'Adicionais',
            position: 'right',
          },
          {
            to: '/docs/ajuda/faq',
            label: 'FAQs',
            position: 'right',
          },
          // O botão de alternar tema (Sol/Lua) é inserido automaticamente na extrema direita
        ],
      },

      // Configuração do Footer
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contato', // Lado Esquerdo (Via CSS customizado)
            items: [
              {
                label: 'pre-pix@itau-unibanco.com.br',
                href: 'mailto:pre-pix@itau-unibanco.com.br',
              },
            ],
          },
          {
            title: 'Navegação', // Lado Direito (Via CSS customizado)
            items: [
              {
                label: 'Pasta Ajuda',
                to: '/docs/ajuda',
              },
            ],
          },
        ],
        // Centro (Via CSS customizado)
        copyright: `Copyright © ${new Date().getFullYear()} Pré Pix Itaú. Todos os direitos reservados.`,
      },

      // Configuração de Highlight de Código (Prism)
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java', 'csharp', 'json', 'bash'], // Linguagens comuns no Itaú
      },
    }),
};

module.exports = config;