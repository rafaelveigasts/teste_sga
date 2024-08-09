* primeira linha, modelagem de dados do parametro item não deve ser any seguinto o exemplo deveria ser number[].
* segunda linha trocar var por let pois var pode vazar o escopo.
* se for utilizar o loop for, iniciar com let para evitar vazamento de escopo.
* a função percorre 2x a lista para somar os valores, fica melhor e mais legível nesse caso utilizar reduce mantendo a complexidade de tempo em (O)n conforme abaixo:

```typescript
function process(items: number[]) {
  const total = items.reduce((acc, item) => {
    if (item > 0) {
      console.log(item + ' is a positive number');
      return acc + item;
    }
    return acc;
  }, 0);

  return total;
}
```

a função inicialmente tem complexidade O(n) pq mesmo que seja percorrida 2x a contante 2 é ignorada na notação BigO.

e se quiser melhorar o exemplo chama o console executando a função com os parametros já adicionados.
