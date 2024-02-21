let generoSelecionado = '';
let palavras = [];
let palavraSorteada = '';
let dicas = [];

function escolherGenero(genero) {
  generoSelecionado = genero;
  palavras = obterPalavras(genero);
  dicas = obterDicas(genero);
  iniciarJogo();
}

function obterPalavras(genero) {
  const palavrasPorGenero = {
    'fruta': ['maça', 'uva', 'pera', 'caju', 'açaí', 'coco', 'kiwi', 'limão', 'manga', 'jambo'],
    'animal': ['gato', 'rato', 'pato', 'cão', 'tigre', 'leão', 'urso', 'lobo', 'veado', 'sapo'],
    'cor': ['azul', 'verde', 'roxo', 'amarelo', 'preto', 'branco', 'laranja', 'rosa', 'marrom', 'cinza'],
    'país': ['brasil', 'japão', 'itália', 'egito', 'canadá', 'austrália', 'índia', 'rússia', 'méxico', 'alemanha'],
  };
  return palavrasPorGenero[genero] || [];
}

function obterDicas(genero) {
  const dicasPorGenero = {
    'fruta': [
      'Pode ser encontrada em uma torta.',
      'Usada para fazer vinho.',
      'Uma fruta de textura suave e sabor adocicado.',
      'Famoso na culinária nordestina, É uma castanha que se disfarça de fruta.',
      'Muito consumido no Brasil. Um superalimento roxo, geralmente consumido na forma de tigela cremosa.',
      'Um fruto tropical grande com uma casca dura e uma água refrescante dentro.',
      'Uma fruta pequena, marrom e peluda, com uma polpa verde e sabor única.',
      'Popular em bebidas. É ácido e cítrico.',
      'Uma fruta tropical suculenta e com sabor doce e exótico.',
      'Uma fruta vermelha e doce com uma casca fina, conhecida por seu sabor peculiar.'
    ],
    'animal': [
      'Muitos têm como animal de estimação.',
      'Um pequeno roedor conhecido por sua agilidade e cauda longa.',
      'Um pássaro aquático que muitas vezes é visto em lagos e lagoas.',
      'Fiel companheiro do homem.',
      'Um grande felino selvagem com listras distintas.',
      'Rei da selva.',
      'Encontrado em regiões polares.',
      'Um canídeo selvagem que vive em matilhas e uiva para se comunicar.',
      'Um elegante cervídeo com galhadas que crescem anualmente. Ou apenas um amigo seu.',
      'Anfíbio interessante.'
    ],
    'cor': [
      'Cor do céu em um dia claro.',
      'Cor associada à natureza e à esperança.',
      'Cor resultante da mistura de azul e vermelho.',
      'Cor brilhante e vibrante.',
      'Ausência de cor ou luz. É frequentemente associado à elegância.',
      'Cor que reflete todas as cores visíveis. É associado à pureza e inocência.',
      'Cor vibrante e quente. É uma mistura de vermelho e amarelo.',
      'Cor suave associada à feminilidade. É frequentemente associada a flores.',
      'Cor terrosa. É comumente encontrada em solos e árvores.',
      'Cor intermediária entre preto e branco. É frequentemente associada a tons neutros.'
    ],
    'país': [
      'Localizado na América do Sul. Famoso pelo Carnaval e pelo futebol.',
      'País insular no leste asiático. Conhecido por sua cultura única e tecnologia avançada.',
      'País no sul da Europa. Famoso por sua comida, arte e arquitetura.',
      'País no nordeste da África. Conhecido por sua história antiga e pirâmides.',
      'País na América do Norte. Conhecido por suas vastas paisagens e baixas temperaturas.',
      'País e continente na Oceania. Famoso por sua diversidade de fauna única.',
      'País no sul da Ásia. Conhecido por sua rica cultura e história.',
      'País que se estende pelos continentes asiático e europeu. É o maior país do mundo em área.',
      'País na América do Norte. Famoso por sua comida, como tacos e guacamole.',
      'País na Europa Central. Conhecido por sua eficiência e indústria automotiva.'
    ],
  };

  return dicasPorGenero[genero] || [];
}


function iniciarJogo() {
  sortearNovaPalavra();
  const pergunta = `Qual ${generoSelecionado} começa com a letra ${palavraSorteada[0].toUpperCase()}?`;
  document.getElementById('pergunta').textContent = pergunta;
  document.getElementById('jogo').style.display = 'block';
  document.getElementById('botao-dica').style.display = 'block';
}

function sortearNovaPalavra() {
  palavraSorteada = sortearPalavra();
}

function sortearPalavra() {
  const palavrasValidas = palavras.filter(palavra => palavra.length === 4 || palavra.length === 5);
  const indiceSorteado = Math.floor(Math.random() * palavrasValidas.length);
  return palavrasValidas[indiceSorteado];
}

function verificarResposta() {
  const respostaUsuario = document.getElementById('resposta').value.toLowerCase();

  if (respostaUsuario === palavraSorteada) {
    exibirMensagem('Parabéns! Você acertou!', 'acerto');
  } else {
    exibirMensagem(`Ops! Tente novamente. A resposta correta era: ${palavraSorteada}`, 'erro');
  }
  sortearNovaPalavra();
  const pergunta = `Qual ${generoSelecionado} começa com a letra ${palavraSorteada[0].toUpperCase()}?`;
  document.getElementById('pergunta').textContent = pergunta;
}

function fornecerDica() {
  const dicaAtualIndex = palavras.indexOf(palavraSorteada);
  exibirMensagem(`Dica atual: ${dicas[dicaAtualIndex]}`, 'dica');
}

function exibirMensagem(mensagem, tipo) {
  const mensagemElemento = document.createElement('div');
  mensagemElemento.textContent = mensagem;
  mensagemElemento.classList.add('mensagem', tipo);
  document.body.appendChild(mensagemElemento);

  setTimeout(() => {
    mensagemElemento.remove();
  }, 4000);
}