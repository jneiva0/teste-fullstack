# Avaliação Técnica - FullStack NodeJS

## Instruções

O repositório contém duas pastas, uma com o frontend e outra com a API, em um cenario real poderia ter sido usado repos diferentes ou usar algo como lerna ou yarn workspaces, optei por apenas ter duas pastas mesmo

### Cliente

Usei Create-React-App como base para o projeto  
Instale as dependencias

```
cd client && yarn
```

Inicie em modo desenvolvimento

```
yarn start
```

### API / Servidor

Foi usado NestJS e TypeORM

É necessário alterar as configurações de conexão com o postgre no arquivo `src/app.module.ts`

É algo que nunca deveria ser feito em um cenario real, variaveis de ambiente servem justamente para esse tipo de configuração

Instale as dependencias

```
cd api && yarn
```

Inicie em modo desenvolvimento

```
yarn start:dev
```

---

## Atividade 02

### A atividade 02 está integrada no frontend da atividade 01 por questão de conveniencia, todo o código relevante está em `client/src/pages/CSVImportPage.tsx`

- Optei por fazer tudo client side, mas também poderia ser feito fazendo o upload do arquivo para a API, processando no servidor e retornando o resultado pro cliente
- Se fosse feito pelo servidor poderia-se usar streams, que só estão disponíveis no Node, talvez fosse interessante no caso de processar arquivos grandes

---

## Atividade 03

```
fs.readFile(pathFile, function(err, data) {
  if (err) {
    //handle the error
  }
  // use the data object
});
```

Um ponto a ser observado é que se na parte `//handle the error` não existir um `return` ou `throw err` ou algo que forçe a saída, pelo fato de não existir um `else` a execução entraria na parte `//use the data object` mesmo em caso de erro.

Com exceção disso não consigo identificar um erro sem ter mais contexto.

---

## Considerações

- Os Serviços podem ser cadastrados através da "Area do Atendente"

- Não existem testes e o tratamento de erros na API é inexistente
- Cometi um erro grave no gerenciamento de estado no frontend, só percebi no final do segundo dia que talvez usar o redux fosse importante para a avaliação, no final das contas acabei introduzindo o redux parcialmente. Para resumir o resultado é que os beneficios do redux não são aproveitados, o redux não é a "source of truth" e nem existe um fluxo unidirecional de dados.
- Gastei muito tempo com a autenticação até perceber que não daria tempo de fazer tudo ser funcional. A ideia inicial era usar roles para diferenciar as contas de cliente e atendente. No final das contas a autenticação só está sendo usada para o cliente, o painel do atendente está aberto.
- O fluxo de trabalho pelo git passou bem longe do que seria considerado "boas práticas". Os commits estão grandes demais, ambíguos, e em alguns existem alterações totalmente não relacionadas incluidas. No fim das contas tentar usar o git de maneira correta estava gastando muito tempo, acabei voltando pros hábitos antigos para não perder o prazo. Provavelmente essa é a área que mais tenho que praticar, foi o meu primeiro contato com o git flow

Fico a disposição para qualquer esclarecimento.
