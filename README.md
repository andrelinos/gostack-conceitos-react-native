# Conceitos React Native

<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 03: Conceitos do ReactJS
</h3>

<img alt="GoStack" src="https://github.com/andrelinos/gostack-conceitos-react-native/blob/master/desafio03gostack11.png" />


### Funcionalidades da aplicação

- **`Listar os repositórios da API`**

- **`Adicionar um repositório na API`**

- **`Remover um repositório da API`**
-
- **`Dar like em repositório da API`**

## Clone o repositório

- Faça o clone deste repositório usando git clone https://github.com/andrelinos/gostack-conceitos-react-native.git
- Entre na pasta do projeto usando cd `gostack-conceitos-react-native`
- Rode no terminal o comando yarn para instalar todas as dependência
- Rode no terminal o comando yarn star para iniciar o projejeto
- Rode react-native run-android --no-jetifier para instalar e executar no dispositivo (emulado ou físco)

**Nota:** --no-jetifier é para rodar sem erros em dispositivos com SO abaixo do Android X.

## Notas adicionais
- React Native não possue valor semântico (significado) {div, span, h1...}.
  - View: div, footer, header, main, aside, section - usa-se sempre View.
  - Text: p, span, strong, h1, h2, h3 - usa-se sempre Text.
- Não possuem estilização própria, ou seja, todos são adicionados sem qualquer tipo de estilização.
- Todos os componentes possuem por padrão a propriedade "display: flex".
- Cada componente precisa ter seu próprio estilo. Um componente não herda de outro assim com na web.

### Sobre a API
- Emulador iOS: baseURL = http://localhost:3333
- Dispositivo físico iOS: baseURL = http://192.168.0.100:3333 (ex: deve ser o IP da sua máquina).

- Emulador Android: baseURL = http://localhost:3333
  - Necessário rodar: adb reverse tcp:3000 tcp:3333 para o emulador reconhecer o backend
  - Ou... usar o IP específico para emulador Android: 10.0.2.2:3333 (Android Studio)
  - Ou... usar o IP específico para emulador Android: 10.0.3.2:3333 (Genymotion)
- Dispositivo físico Android: baseURL = http://192.168.0.100:3333 (ex: deve ser o IP da sua máquina).


## Para importar as rotas
- Abra o insomnia
- Clique na setinha no canto superior esquerno (roxo)
- Escolhar Import
- Na próxima janela, escolha Import Data
- Escolha a opção From File
- Selecione o arquivo Insomnia.json (em anexo ao projeto)
- Clique em Import
- Aguarde finalizar

# Notas
Para rodar o projeto, você precisa do backend rodando para fazer as transações de dados entre o frontend e a base de dados lógica.

Acesse a base de dados aqui:
https://github.com/andrelinos/backend-desafio-03-gostack11.git

