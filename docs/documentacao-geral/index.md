---
title: Visão Geral
sidebar_position: 1
description: Ponto central de acesso a toda a documentação técnica da Squad Pré-Pix.
---

# Documentação Geral

Bem-vindo à documentação técnica da Squad Pré-Pix. Esta área centraliza todo o conhecimento necessário para entender, operar e integrar com os serviços de **Gerência de Chaves Pix (DICT)** do Itaú.

Nossa arquitetura é dividida em componentes modulares (Peças) e suportada por guias práticos (Tutoriais). Abaixo você encontra o mapa de navegação para cada seção.

---

## 🧩 [Peças (Microsserviços)](../pecas)

Nesta seção, detalhamos os componentes de software que compõem nossa solução. Cada "Peça" possui sua própria documentação de API, arquitetura e responsabilidades.

*   **Validador de Chaves:** Regras de negócio, validação de formato e sanitização de dados.
*   **Gateway DICT:** Responsável pela comunicação segura (mTLS + Assinatura Digital) com o Banco Central.
*   **Sincronizador:** Motor de reconciliação de base e verificação de CIDs.
*   **Motor de Reivindicação:** Máquina de estados para fluxos de Portabilidade e Posse.

[Acessar Documentação de Peças →](../pecas)

---

## 🎓 [Tutoriais e Guias](../tutoriais)

Guias passo-a-passo focados em "Como fazer". Ideal para desenvolvedores que estão integrando com nossas APIs ou analistas operacionais.

*   **Jornada de Cadastro:** Como registrar uma chave (CPF, Celular, E-mail, EVP).
*   **Jornada de Consulta:** Como buscar dados de um recebedor e interpretar a resposta mascarada.
*   **Tratamento de Erros:** Como lidar com `429 Rate Limit` e erros de negócio.
*   **Recuperação de Valores:** Como iniciar um fluxo de MED 2.0.

[Acessar Tutoriais →](../tutoriais)

---

## 📚 [Materiais Adicionais](../adicionais)

Conteúdos complementares que suportam o entendimento do ecossistema Pix, mas não são componentes de software diretos.

*   **Glossário:** Dicionário de termos (DICT, PSP, ISPB, VSync).
*   **Ferramentas:** Scripts de apoio e geradores de massa de teste.
*   **Links Úteis:** Referências para manuais do BACEN e RFCs.

[Acessar Materiais Adicionais →](../adicionais)

---

:::info Você sabia?
Toda a comunicação com o DICT é assinada digitalmente e trafega via mTLS. Entender a camada de segurança é vital antes de iniciar qualquer integração. Consulte a seção de **Peças > Gateway DICT** para mais detalhes.
:::