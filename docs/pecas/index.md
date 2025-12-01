---
title: Catálogo de Peças
sidebar_position: 1
description: Visão técnica dos microsserviços e componentes da arquitetura Pré-Pix.
---

# Peças e Microsserviços

Nesta seção, exploramos a arquitetura técnica da solução. A squad Pré-Pix é composta por um conjunto de microsserviços especializados, cada um responsável por um domínio específico do ecossistema DICT.

Abaixo você encontra a lista dos principais componentes e suas responsabilidades.

---

## 🔑 Gerenciador de Chaves

O componente *core* da nossa arquitetura. Responsável pelo ciclo de vida básico das chaves de endereçamento.

*   **Responsabilidades:** Inclusão (`createEntry`), Alteração (`updateEntry`), Exclusão (`deleteEntry`) e Consulta (`getEntry`) de chaves.
*   **Integrações:** Canais (App/IB), Cadastro de Clientes e Gateway DICT.
*   **Documentação Técnica:** [Ver APIs do Gerenciador](./validador-chaves/index) *(Link de exemplo)*

---

## ⚖️ Motor de Reivindicação

Máquina de estados complexa que gerencia os fluxos assíncronos de disputa de chaves.

*   **Responsabilidades:**
    *   Orquestrar processos de **Portabilidade** e **Reivindicação de Posse**.
    *   Controlar os prazos regulatórios (7 dias de resolução + 7 dias de encerramento).
    *   Gerenciar os estados (`OPEN`, `WAITING_RESOLUTION`, `CONFIRMED`, `CANCELLED`).
*   **Funcionalidades:** [Fluxos de Reivindicação](../tutoriais/index)

---

## ✅ Validador Cadastral

Serviço responsável por garantir a integridade e conformidade dos dados antes do envio ao Banco Central.

*   **Responsabilidades:**
    *   Validar formato de CPF/CNPJ.
    *   Verificar sanidade de nomes (regras de acentuação, abreviações permitidas).
    *   Conferir vínculo do usuário com a conta transacional.
*   **Regras de Negócio:** Implementa as regras da *Seção 2* do Manual Operacional.

---

## 🔄 Sincronizador (Reconciliação)

O "guarda-costas" da integridade dos dados. Garante que nossa base local reflete exatamente o que está no DICT.

*   **Responsabilidades:**
    *   Cálculo e verificação de **CIDs** (Content Identifiers).
    *   Geração do **VSync** diário.
    *   Processamento de arquivos de CIDs para reconciliação massiva.
*   **Conceitos:** [Entenda o Sincronismo](../adicionais/glossario#s)

---

## 🛡️ Módulo de Segurança (MED)

Componente focado na prevenção a fraudes e recuperação de ativos.

*   **Responsabilidades:**
    *   Gestão de **Notificações de Infração**.
    *   Orquestração do **MED 2.0** (Recuperação de Valores).
    *   Controle de *Rate Limit* (Token Bucket) para evitar ataques de leitura.
    *   Consulta de estatísticas de segurança (`getEntryStatistics`).

---

:::tip Navegação
Utilize o menu lateral para expandir cada peça e visualizar suas APIs, contratos Swagger e diagramas de sequência específicos.
:::