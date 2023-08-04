const element = document.querySelector('p:nth-child(20)');
const childCount = element ? element.parentElement.children.length : 0;
console.log(`O elemento selecionado tem ${childCount} filhos.`);