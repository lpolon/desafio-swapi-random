This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Introdução
desafio para vaga de front-end para Ame digital <3

link para o app:

### https://desafio-ame-leo.herokuapp.com/

# Como funciona
Quando a aplicação carrega pela primeira vez, ela busca todos os planetas disponíveis numa [API de starwars](https://swapi.co/), e carrega um deles aleatoriamente no cartão.


Clicando no botão "Next" ou na seta direita do teclado, busca-se um próximo cartão com outro planeta aleatório.


# Comentários sobre "decisões de arquitetura"
##  "single source of truth":
dado o escopo do desafio, todo o contexto global dessa aplicação vem do estado do App. App.jsx compartilha o estado utilizando o conceito de [lifting state up](https://reactjs.org/docs/lifting-state-up.html).

Eu entendo que no mundo real, o gerenciamento do contexto é muitas vezes feito de outras formas. Já utilizei outras abordagens para a gestão do estado global. Por exemplo o [vertexTube](https://github.com/lpolon/desafio-vertexTube). O projeto é um clone da busca do youtube. Nelo, o contexto global é compartilhado pelos componentes desse projeto vem do window.location, gerenciado com as ferramentas da lib react-router-dom. Entendo que existem ferramentas como Redux, Flow e o próprio React.context, apesar de não ter experiência de projetos que as utilizem.

## Componentização:
Apesar do escopo pequeno do projeto, resolvi separar o projeto em 3 componentes: `PlanetCard` é responsável apenas por mostrar as informações. `GetRandomPlanetButton` é responsável apenas por atualizar o planeta aleatório a partir de um input do browser.

O racional é separar as responsabilidades de forma que seria mais fácil alterar o projeto no futuro.

## uso de hooks: 
Preferi utilizar os hooks `useState()` e `useEffect()` nesse projeto, porque eles permitem manter a lógica de busca de planetas contida numa única função. Por exemplo, sem hooks, `GetRandomPlanetButton` precisaria conter os métodos de lifecycle `ComponentDidMount()` e `ComponentWillUnmount()`.

em outros projetos, eu utilizei apenas components de classe:
[exemplo 1](https://github.com/lpolon/doghub-challange), [exemplo 2](https://github.com/lpolon/code-academy-jammming).


## Outros comentários
- Eu acho gravíssimo o projeto não ter nenhum teste! escrever testes unitários está no topo da minha lista de prioridades. Sinto muito que ainda não consigo mostrar nada em relação a isso.