---
title: Glossário do Pix
sidebar_position: 2
description: Definições de termos técnicos e siglas do ecossistema Pix e DICT.
---

# Glossário de Termos e Siglas

Este glossário contém as definições dos principais termos utilizados na documentação da squad Pré-Pix, alinhados com o Manual Operacional do DICT e as especificações do Banco Central.

## A

### API (Application Programming Interface)
Interface de comunicação utilizada para interagir com o DICT. O Itaú utiliza a versão 2.x da API, que suporta funcionalidades como Recuperação de Valores e Sincronismo otimizado.

## C

### Chave Aleatória (EVP)
Endereço Virtual de Pagamento. Uma sequência alfanumérica gerada pelo DICT que permite ao usuário receber um Pix sem expor dados pessoais.

### CID (Content Identifier)
Identificador único de conteúdo de 256 bits gerado a partir de um *hash* dos dados essenciais da chave (como número da conta, agência, ISPB). É fundamental para o processo de **Sincronismo** e **Reconciliação** entre a base interna do Itaú e o DICT.

### Claim (Reivindicação)
Processo iniciado quando um usuário deseja utilizar uma chave que já está vinculada a outra conta ou participante. Pode ser do tipo **Portabilidade** ou **Reivindicação de Posse**.

## D

### DICT (Diretório de Identificadores de Contas Transacionais)
Base de dados centralizada gerida pelo Banco Central que armazena os vínculos entre chaves Pix e as contas transacionais dos usuários.

### Doador (PSP Doador)
No processo de portabilidade ou reivindicação, é o participante onde a chave está registrada atualmente e que deve "ceder" a chave ou confirmar a posse.

## E

### EndToEndId
Identificador único de uma transação Pix (pacs.008), gerado pelo PSP do pagador. Deve ser preservado de ponta a ponta na cadeia de pagamentos. É utilizado como chave para abertura de **Notificações de Infração**.

## G

### Grafo de Rastreamento
Estrutura de dados gerada durante o processo de **Recuperação de Valores**. Representa o caminho que o dinheiro percorreu entre diferentes contas (laranjas) após uma fraude, permitindo identificar onde os recursos estão para solicitar o bloqueio.

## I

### ISPB
Identificador de Sistema de Pagamentos Brasileiro. Código numérico de 8 dígitos que identifica univocamente cada participante (banco, fintech, IP) no sistema financeiro.

### Infraction Report (Notificação de Infração)
Mecanismo para reportar ao DICT que uma transação é suspeita de fraude. É o gatilho inicial para o MED (Mecanismo Especial de Devolução).

## L

### Liquidante
Participante direto no SPI que oferece serviços de liquidação financeira para participantes indiretos (que não possuem conta de reservas bancárias).

## M

### MED (Mecanismo Especial de Devolução)
Conjunto de regras e procedimentos operacionais destinado a viabilizar a devolução de valores nos casos de fundada suspeita de fraude ou falha operacional.

## P

### Participante Direto
Instituição financeira ou de pagamento que possui conexão direta com o SPI e o DICT.

### Participante Indireto
Instituição que não possui conexão direta com o SPI, operando através de um liquidante, mas que pode ter acesso direto à API do DICT para gestão de chaves.

### Portabilidade
Processo onde o usuário solicita a transferência de sua chave Pix de um PSP (Doador) para outro (Reivindicador). Exige confirmação do usuário no canal do Doador em até 7 dias.

### PSP (Prestador de Serviços de Pagamento)
Instituição financeira ou de pagamento que oferece a conta transacional ao usuário final (ex: Itaú).

## R

### Rate Limit (Limitação de Requisições)
Mecanismo de proteção do DICT baseada em "Token Bucket" para evitar ataques de varredura (*data scraping*). Existem limites distintos para consultas de chaves (PF, PJ) e operações de gestão.

### Recuperação de Valores (Funds Recovery)
Evolução do MED introduzida no Manual v8.0. Processo que permite o bloqueio cautelar e a devolução de recursos em múltiplas camadas de contas, visando recuperar valores de fraudes complexas.

### Reivindicação de Posse
Processo iniciado quando um usuário tenta cadastrar uma chave (geralmente celular ou e-mail) que já pertence a outra pessoa no DICT. O prazo de resolução é de 7 dias, mais 7 dias de encerramento.

### Reivindicador (PSP Reivindicador)
O participante que inicia um processo de Portabilidade ou Reivindicação de Posse em nome do seu cliente.

## S

### SPI (Sistema de Pagamentos Instantâneos)
Infraestrutura centralizada de liquidação bruta em tempo real do Banco Central, onde as transferências financeiras do Pix ocorrem.

## V

### VSync (Verificador de Sincronismo)
Resultado de uma função lógica (XOR) aplicada sobre o conjunto de CIDs de um participante. Permite verificar rapidamente se a base de chaves do Itaú está idêntica à base do DICT sem trafegar todos os dados.