---
title: POST /validar-chave
sidebar_position: 1
description: Endpoint para pré-validação de dados de entrada.
---

# Validar Dados da Chave

Este endpoint realiza a validação sintática e lógica dos dados de uma chave Pix antes da submissão ao DICT. Ele aplica as expressões regulares (Regex) definidas na especificação OpenAPI e as regras de sanitização de nomes do Manual Operacional.

:::info Contexto
Esta é uma API interna. Ela não se comunica com o Banco Central. Seu objetivo é garantir que o payload esteja **100% aderente** às normas para evitar rejeições (`400 Bad Request`) no gateway.
:::

## Requisição

*   **Método:** `POST`
*   **Rota:** `/api/v1/validador/validar-chave`

### Headers

| Header | Valor | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `Content-Type` | `application/json` | Sim | Formato do corpo da requisição. |
| `x-correlation-id` | UUID | Sim | Identificador único para rastreabilidade (logs). |

### Corpo da Requisição (Body)

```json
{
  "key": "joao.silva@email.com",
  "keyType": "EMAIL",
  "owner": {
    "name": "João da Silva & Filhos",
    "taxIdNumber": "12345678901",
    "type": "NATURAL_PERSON"
  },
  "accountType": "CACC"
}
````

### Parâmetros:
- `key` (string, obrigatório): O valor da chave.
- `keyType` (string, obrigatório): O tipo da chave. Valores aceitos: `CPF`, `CNPJ`, `PHONE`, `EMAIL`, `EVP`.
- `owner` (object, obrigatório): Dados do proprietário.
    - `name`: Nome completo ou Razão Social.
    - `taxIdNumber`: CPF ou CNPJ (apenas números).
    - `type`: `NATURAL_PERSON` (PF) ou `LEGAL_PERSON` (PJ).
- `accountType` (string, obrigatório): Tipo da conta. Ex: `CACC` (Corrente), `SVGS` (Poupança).

---

### Respostas
#### ✅ 200 OK - Válido
Retorna quando os dados estão corretos. O validador pode retornar o campo `sanitizedName` contendo o nome já tratado conforme as regras do BACEN (ex: substituição de `&` por `E`).

``` json
{
  "isValid": true,
  "sanitizedData": {
    "key": "joao.silva@email.com",
    "ownerName": "JOAO DA SILVA E FILHOS"
  },
  "warnings": []
}
```

#### ❌ 422 Unprocessable Entity - Inválido
Retorna quando uma ou mais regras de validação falharam.

``` json
{
  "isValid": false,
  "errors": [
    {
      "code": "INVALID_FORMAT",
      "field": "key",
      "message": "E-mail inválido. O formato deve seguir a regex ^[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.([a-z]+))?$"
    },
    {
      "code": "NAME_MISMATCH",
      "field": "owner.name",
      "message": "O nome contém caracteres não permitidos pelo DICT."
    }
  ]
}
````

---

### Regras Aplicadas
Ao chamar este endpoint, as seguintes validações são executadas em ordem:
1. Validação de Formato (Regex):
    - Verifica se o CPF tem 11 dígitos e se o dígito verificador é válido.
    - Verifica se o E-mail está em minúsculo e respeita o tamanho máximo de 77 caracteres.
    - Verifica se o Telefone segue o formato E.164 (`+55...`).
2. Validação de Negócio (Manual v8.0):
    - **Sanitização**: Remove acentos não permitidos e substitui caracteres especiais (ex: `&` vira `E`).
    - **Consistência**: Verifica se um CPF (`NATURAL_PERSON`) não está tentando cadastrar um nome fantasia (`TradeName`).
3. Validação de Domínio:
Verifica se o `AccountType` é um dos valores permitidos (`CACC`, `SVGS`, `SLRY`, `TRAN`).

:::tip Dica para Desenvolvedores
Utilize o campo `sanitizedData.ownerName retornado na resposta de sucesso para preencher o payload que será enviado ao DICT. Isso garante que o nome enviado seja idêntico ao esperado pelas regras de validação.
:::