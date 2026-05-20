# [Consumo de APIs](https://github.com/orlandosaraivajr/FATEC_1SEM26_LP2/blob/main/mini_projeto3/Mini_Projeto_3.pdf)

A Dogs API fornece dados de cães como um servidor de API.

Usamos dados da API: https://dogapi.dog/docs/api-v2

## Como usar

Instalar o [Docker](#).

Rodar o projeto:

```bash
docker compose up -d --build
```

Abra o `cliente` no navegador (http://localhost:8080/).

### Pagina inicial (lista de cães)

A página Inicial apresenta a lista de cães. (http://localhost:8080/)

### Pagina do cão

A página do Cão apresenta detalhes do cão. (http://localhost:8080/dogs/?id=1)

## licença

[MIT](./LICENSE)
