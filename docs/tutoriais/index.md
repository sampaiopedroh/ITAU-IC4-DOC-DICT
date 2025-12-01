---
title: Tutoriais e Guias
sidebar_position: 1
description: Guias passo-a-passo para integração e operação das chaves Pix.
---

# Tutoriais e Guias Práticos

Bem-vindo à central de aprendizado da Squad Pré-Pix. Aqui você encontrará roteiros detalhados para realizar as principais operações do ecossistema DICT, desde o cadastro simples de uma chave até fluxos complexos de recuperação de valores.

Estes guias foram desenhados para desenvolvedores que estão integrando com nossas APIs e para analistas que precisam entender o fluxo operacional.

---

## 🚀 Jornadas Básicas

Se você está começando agora, estes são os fluxos essenciais que todo sistema deve suportar.

### [Como Cadastrar uma Chave Pix](./como-criar-chave)
Aprenda o fluxo completo de registro (`createEntry`), incluindo:
*   Validação prévia de dados.
*   Regras de confirmação de posse (token SMS/E-mail).
*   Tratamento de erros síncronos e assíncronos.

### [Consultando Dados de Recebedores](./consultar-chave) *(Em breve)*
Entenda como realizar o `getEntry` para exibir os dados do recebedor na tela de transferência, respeitando as regras de mascaramento de dados (LGPD) e proteção contra varredura (*Rate Limit*).

---

## ⚔️ Disputa de Chaves (Reivindicação)

Fluxos onde há conflito de titularidade ou desejo de mudança de instituição.

### [Guia de Portabilidade](./portabilidade) *(Em breve)*
O passo a passo para trazer uma chave de outro banco para o Itaú. Entenda os estados `OPEN`, `WAITING_RESOLUTION` e o prazo de 7 dias para confirmação do usuário.

### [Reivindicação de Posse](./reivindicacao-posse) *(Em breve)*
Como agir quando o cliente tenta cadastrar um celular que já está vinculado a outro CPF no DICT.

---

## 🛡️ Segurança e Fraude (MED 2.0)

Procedimentos críticos relacionados ao Mecanismo Especial de Devolução e combate a fraudes, atualizados conforme o **Manual Operacional v8.0**.

### [Recuperação de Valores (Funds Recovery)](./recuperacao-valores) *(Em breve)*
Guia completo sobre a nova API de bloqueio cautelar e devolução em camadas.
*   Diferença entre fluxo **Interativo** e **Automatizado**.
*   Como interpretar o Grafo de Rastreamento.
*   Prazos de bloqueio e análise.

### [Lidando com Rate Limits](./rate-limits) *(Em breve)*
Melhores práticas para evitar o erro `429 Too Many Requests`. Como implementar *backoff* exponencial e uso eficiente de cache local.

---

:::tip Precisa de detalhes técnicos?
Estes tutoriais focam no **"Como fazer"**. Se você precisa de detalhes sobre campos obrigatórios, tipos de dados ou contratos JSON, consulte a seção de **[Peças (APIs)](../pecas)**.
:::