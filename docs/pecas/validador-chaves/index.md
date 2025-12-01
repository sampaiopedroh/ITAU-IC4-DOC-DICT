---
title: Validador de Chaves
sidebar_position: 1
description: Regras de formatação, sanitização e validação cadastral.
---

# Validador de Chaves

O **Validador de Chaves** é o componente responsável por garantir a integridade dos dados antes que qualquer requisição saia do ambiente do Itaú em direção ao DICT.

Seu objetivo é aplicar as regras de negócio e formatação exigidas pelo Banco Central, evitando erros de `400 Bad Request` e garantindo a conformidade com a base da Receita Federal.

## 📋 Regras de Formatação (Regex)

Conforme a especificação técnica da API (OpenAPI v2.8.0), os tipos de chave devem obedecer estritamente aos formatos abaixo.

| Tipo de Chave | Formato Esperado | Expressão Regular (Regex) | Exemplo |
| :--- | :--- | :--- | :--- |
| **CPF** | Apenas números, 11 dígitos. | `^[0-9]{11}$` | `12345678901` |
| **CNPJ** | Apenas números, 14 dígitos. | `^[0-9]{14}$` | `12345678000199` |
| **Telefone** | Padrão E.164 (`+` + DDI + DDD + Número). | `^\+[1-9]\d{1,14}$` | `+5511988887777` |
| **E-mail** | Minúsculo, máx 77 caracteres. | *Ver regex complexa na API* | `joao.silva@email.com` |
| **EVP** | UUID v4 (Gerado pelo DICT). | `^[0-9a-f]{8}-[0-9a-f]{4}-...` | `123e4567-e89b...` |

:::warning Atenção
Para chaves de **E-mail**, o sistema deve garantir que todos os caracteres estejam em **caixa baixa (lowercase)** antes do envio.
:::

## 📝 Sanitização de Nomes

De acordo com a **Seção 2.3 do Manual Operacional v8.0**, os nomes vinculados às chaves devem estar em conformidade com o cadastro da Receita Federal (CPF/CNPJ).

O Validador aplica as seguintes transformações e regras:

### 1. Caracteres Permitidos
Embora a base da Receita muitas vezes não use acentos, o DICT permite uma lista restrita de diacríticos:
*   **Permitidos:** `Ã, Õ, Á, É, Í, Ó, Ú, À, È, Ì, Ò, Ù, Â, Ê, Î, Ô, Û, Ä, Ë, Ï, Ö, Ü, Ç, Ñ, Å`
*   **Maiúsculas/Minúsculas:** Não há distinção (case-insensitive), mas recomendamos padronizar em MAIÚSCULO.

### 2. Substituições Obrigatórias
Caracteres especiais devem ser tratados conforme a regra:
*   O símbolo `&` deve ser substituído pela letra `E`.
*   Pontos (`.`), vírgulas (`,`), hifens (`-`) e apóstrofos (`'`) podem ser substituídos por **espaço** ou vice-versa, desde que não altere a fonética ou estrutura do nome.

### 3. Abreviações (Pessoa Física)
É permitido abreviar nomes, desde que:
*   O **primeiro** e o **último** nome (ou agnome como "Junior", "Filho") estejam escritos por extenso.
*   Nomes do meio podem ser abreviados pela primeira letra.
*   Preposições ("de", "da", "dos") **não** podem ser omitidas se o nome for abreviado.

> **Exemplo:**
> *   Original: `Fulano Beltrano de Tal`
> *   Válido: `Fulano B. de Tal`
> *   Inválido: `F. Beltrano de Tal` (Primeiro nome abreviado)

### 4. Pessoa Jurídica
*   Deve ser usada a **Razão Social** no campo `Name`.
*   O **Nome Fantasia** pode ser preenchido no campo `TradeName`, mas apenas se constar no cartão CNPJ.
*   **MEI:** Não é permitido preencher o `TradeName` (deve ficar vazio).

## 🏦 Tipos de Conta Suportados

Ao vincular uma chave, o tipo de conta (`AccountType`) deve ser um dos seguintes (padrão ISO 20022):

*   `CACC`: Conta Corrente (*Current Account*)
*   `SVGS`: Conta Poupança (*Savings Account*)
*   `SLRY`: Conta Salário (*Salary Account*)
*   `TRAN`: Conta de Pagamento (*Transacting Account*)

## 🚫 Limites de Chaves

O Validador deve checar localmente a quantidade de chaves ativas antes de submeter uma criação (`createEntry`):

*   **Pessoa Física:** Máximo de **5** chaves por conta.
*   **Pessoa Jurídica:** Máximo de **20** chaves por conta.

---

## APIs Disponíveis

Abaixo listamos as especificações técnicas das APIs expostas por este componente para consumo interno:

*   [POST /validar-requisicao](./apis/validar-chave) (Validação síncrona de payload)