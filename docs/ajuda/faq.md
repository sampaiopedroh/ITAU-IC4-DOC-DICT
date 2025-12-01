---
title: Perguntas Frequentes (FAQ)
sidebar_position: 1
description: Respostas para as dúvidas mais comuns sobre DICT, Chaves e Processos.
---

# Perguntas Frequentes

Aqui reunimos as dúvidas mais recorrentes recebidas pela squad Pré-Pix sobre o funcionamento do DICT e nossas integrações.

## Gestão de Chaves

### Qual o limite de chaves por conta?
Conforme o Manual Operacional:
*   **Pessoa Física (PF):** Até **5** chaves por conta.
*   **Pessoa Jurídica (PJ):** Até **20** chaves por conta.

:::note Importante
O limite é por *conta transacional*, independentemente da quantidade de titulares.
:::

### Posso cadastrar o mesmo e-mail em duas contas diferentes?
**Não.** Uma chave de endereçamento (seja e-mail, telefone ou CPF/CNPJ) só pode apontar para uma única conta transacional no DICT. Para usar o e-mail em outra conta, é necessário realizar a **Exclusão** na conta antiga ou iniciar um processo de **Portabilidade**.

### O que é uma chave EVP?
EVP (*Endereço Virtual de Pagamento*) é a chave aleatória. É uma sequência alfanumérica gerada pelo DICT (UUID) que permite ao usuário receber pagamentos sem expor dados pessoais como CPF ou telefone.

---

## Erros e API

### Estou recebendo erro `429 Too Many Requests`. O que fazer?
O DICT utiliza um mecanismo de proteção chamado *Token Bucket*.
1.  **Verifique o Header:** Certifique-se de estar enviando o `PI-PayerId` correto.
2.  **Aguarde:** O balde de fichas precisa encher novamente.
3.  **Evite Varredura:** Não realize consultas em massa sem necessidade.
4.  **Cache:** Utilize o cache local para chaves consultadas recentemente (validade de até 180s) para economizar fichas.

### O que significa o erro `EntryLockedByClaim`?
Significa que existe um processo de **Portabilidade** ou **Reivindicação de Posse** em andamento para essa chave. Enquanto o processo não for concluído ou cancelado, a chave não pode ser alterada ou excluída diretamente.

### Por que a consulta de chave não retorna o nome completo do usuário?
Por questões de privacidade e segurança (LGPD), a API do DICT retorna apenas dados parciais para exibição ao usuário pagador (ex: CPF mascarado `***.123.456-**`). O sistema interno do Itaú recebe os dados completos para validação, mas o *front-end* deve exibir apenas o permitido.

---

## Reivindicação (Portabilidade e Posse)

### Qual a diferença entre Portabilidade e Reivindicação de Posse?
*   **Portabilidade:** O usuário é o **mesmo** (mesmo CPF/CNPJ), mas quer mover a chave de outro banco para o Itaú.
*   **Reivindicação de Posse:** O usuário alega ser o dono da chave (ex: comprou um chip de celular novo), mas a chave está cadastrada no DICT vinculada a **outro CPF/CNPJ** (dono antigo).

### Qual o prazo para concluir uma Portabilidade?
O usuário tem até **7 dias** para confirmar o pedido no app do banco doador (onde a chave está atualmente). Se não confirmar, o processo expira automaticamente.

---

## Sincronismo e CIDs

### O que é o CID?
O *Content Identifier* (CID) é um hash SHA-256 gerado a partir dos dados essenciais da chave. Ele serve para garantir que a base do Itaú está idêntica à base do Banco Central sem precisar trafegar os dados abertos de todas as chaves.

### Minha base local parece desatualizada. Como corrigir?
1.  Execute a rotina de verificação de `VSync` (Verificador de Sincronismo).
2.  Se o VSync não bater, solicite o arquivo de CIDs do dia (`createCidSetFile`).
3.  Compare os CIDs locais com os do arquivo e atualize as divergências (chaves faltantes ou sobrantes).

---

## Segurança e MED

### O que é a Recuperação de Valores (MED 2.0)?
É uma evolução do Mecanismo Especial de Devolução introduzida na versão 8.0 do manual. Ela permite rastrear o caminho do dinheiro em contas laranjas e bloquear saldos em múltiplas camadas, não apenas na conta do recebedor imediato.

### Quando devo abrir uma Notificação de Infração?
Imediatamente após a identificação de fundada suspeita de fraude ou ao receber uma contestação do cliente. O prazo máximo é de **80 dias** após a transação.