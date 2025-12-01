---
title: Cadastro de Chave Pix
sidebar_position: 1
description: Passo a passo para registrar uma nova chave (CPF, Celular, E-mail ou EVP).
---

# Como Cadastrar uma Chave Pix

O cadastro de chave é a porta de entrada do usuário no ecossistema Pix. Este guia descreve o fluxo técnico e operacional para registrar uma chave no DICT, garantindo conformidade com as regras do Banco Central.

## 🚦 Pré-requisitos

Antes de chamar a API de criação, o sistema do Itaú deve garantir:

1.  **Autenticação:** O usuário deve estar logado e autenticado (Sessão válida).
2.  **Elegibilidade:** A conta transacional deve estar ativa (`CACC`, `SVGS`, etc.).
3.  **Limite de Chaves:** O usuário não pode ter excedido o limite regulatório (5 para PF, 20 para PJ).

---

## 🔄 Fluxo da Operação

O processo de cadastro segue o fluxo descrito na **Seção 3** do Manual Operacional do DICT:

1.  **Solicitação:** Usuário informa a chave desejada no Canal (App/IB).
2.  **Validação de Formato:** O [Validador de Chaves](../pecas/validador-chaves/index) verifica regex e regras de negócio.
3.  **Validação de Posse (Obrigatório):**
    *   Para **Celular** e **E-mail**, é **obrigatório** enviar um código (token) e validar que o usuário o digitou corretamente *antes* de enviar a requisição ao DICT.
4.  **Envio ao DICT:** O sistema envia a requisição `createEntry`.
5.  **Tratamento da Resposta:** O DICT confirma a criação ou informa que a chave já existe.

---

## 🛠️ Implementação Técnica

Para efetivar o cadastro, utilizamos o endpoint de criação de vínculo.

### 1. Montando o Payload

A requisição deve conter os dados da chave, da conta e do proprietário.

:::warning Idempotência
É obrigatório enviar um `RequestId` (UUID v4) único. Isso garante que, se houver falha na rede, possamos reenviar a mesma requisição sem duplicar o cadastro.
:::

**Exemplo de Payload (JSON Interno):**

```json
{
  "requestId": "a946d533-7f22-42a5-9a9b-e87cd55c0f4d",
  "reason": "USER_REQUESTED",
  "entry": {
    "key": "+5511988887777",
    "keyType": "PHONE",
    "account": {
      "participant": "60701190", 
      "branch": "0001",
      "accountNumber": "12345678",
      "accountType": "CACC",
      "openingDate": "2020-01-01T10:00:00Z"
    },
    "owner": {
      "type": "NATURAL_PERSON",
      "taxIdNumber": "12345678901",
      "name": "JOAO DA SILVA" 
    }
  }
}
````

> **Nota:** O campo `owner.name` deve estar sanitizado (sem acentos proibidos, `&` substituído por `E`, etc), conforme regras do [Validador](../pecas/validador-chaves/index).

### 2. Chamada à API

O Gateway DICT transformará esse JSON na mensagem XML assinada exigida pelo Banco Central (`CreateEntryRequest`) e realizará o envio via mTLS.

### 3. Interpretando a Resposta

#### ✅ Sucesso (HTTP 201 Created)
A chave foi registrada e está pronta para uso. O retorno contém a data de criação e o timestamp de posse.

#### ❌ Erro: Chave já existe (HTTP 400 - EntryAlreadyExists)
Este é o cenário mais comum de erro de negócio. Ocorre quando a chave já está cadastrada no DICT.

O payload de erro retornará detalhes que definem o próximo passo na jornada do cliente:

1.  **Mesmo Dono, Mesmo PSP (Itaú):**
    *   A chave já pertence ao cliente e já está ativa nesta instituição. Apenas exiba os dados da chave existente.
2.  **Mesmo Dono, Outro PSP:**
    *   O cliente tem a chave cadastrada em outro banco.
    *   **Ação:** Oferecer fluxo de [Portabilidade](./portabilidade) (Claim `PORTABILITY`).
3.  **Outro Dono (CPF diferente):**
    *   A chave pertence a outra pessoa.
    *   **Ação:** Oferecer fluxo de [Reivindicação de Posse](./reivindicacao-posse) (Claim `OWNERSHIP`).

#### ❌ Outros Erros Comuns

| Código HTTP | Erro (Type) | Causa Provável | Ação |
| :--- | :--- | :--- | :--- |
| **400** | `EntryInvalid` | Formato de e-mail ou telefone inválido, ou nome do usuário incompatível com a Receita. | Corrigir validação no front-end ou verificar cadastro. |
| **403** | `Forbidden` | PSP não autorizado ou certificado revogado. | Acionar sustentação N2. |
| **429** | `RateLimited` | Excesso de tentativas de cadastro. | Aguardar e tentar novamente (Backoff). |

---

## 🧩 Regras de Negócio Importantes

### Validação de Posse (Challenge)
Conforme **Seção 2.1 do Manual Operacional**:
> "Para validar o número de telefone celular ou o endereço de e-mail, o participante do Pix deve, pelo menos, enviar um código... o qual deve ser confirmado por meio de algum mecanismo de autenticação digital."

:::danger Crítico
**Não envie** a requisição `createEntry` se o usuário não tiver confirmado o token (SMS ou E-mail). O envio de chaves não validadas polui a base do DICT e pode gerar penalidades regulatórias para o Itaú.
:::

### Chave Aleatória (EVP)
Para criar uma chave aleatória, o payload é ligeiramente diferente:
1.  Não envie o campo `Key`.
2.  Defina o `KeyType` como `"EVP"`.

O DICT gerará o UUID (ex: `123e4567-e89b...`) e o retornará na resposta da requisição.

---

## ⏩ Próximos Passos

*   [Entender o Fluxo de Portabilidade](./portabilidade) (Caso a chave já exista em outro banco)
*   [Consultar a Chave Criada](./consultar-chave)