<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Repositório de teste técnico para cargo de desenvolvedor backend.

## Abordagem

Foi utilizado abordagem de DDD(domain driven design) para redução da complexidade ao aplicar um sistema com subdomínios e contextos delimitados assim facilitando o gerenciamento de mudanças, maior manutenabilidade já que o código está organizado em pastas bem definidas, e a escalabilidade pois fica mais fácil de adaptar novas funcionalidades.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# initialize containers
$ docker compose up -d

# watch mode
$ npm run start:dev (it will populate the database with 30 tutorials)

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Code Review

- primeira linha, modelagem de dados do parametro item não deve ser any seguinto o exemplo deveria ser number[].
- segunda linha trocar var por let pois var pode vazar o escopo.
- se for utilizar o loop for, iniciar com let para evitar vazamento de escopo.
- a função percorre 2x a lista para somar os valores, fica melhor e mais legível nesse caso utilizar reduce mantendo a complexidade de tempo em (O)n conforme abaixo:

```typescript
function process(items: number[]) {
  const total = items.reduce((acc, item) => {
    if (item > 0) {
      console.log(item + ' is a positive number')
      return acc + item
    }
    return acc
  }, 0)

  return total
}
```

a função inicialmente tem complexidade O(n) pq mesmo que seja percorrida 2x a contante 2 é ignorada na notação BigO.

e se quiser melhorar o exemplo chama o console executando a função com os parametros já adicionados.

## License

Nest is [MIT licensed](LICENSE).

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
