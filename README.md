# Sólida Proposta

Sistema de geração de propostas comerciais para serviços de zeladoria, com painel de edição, visualização em tempo real e impressão em PDF.

## Funcionalidades

- Cadastro e edição dos dados da proposta
- Seleção dinâmica de serviços (portaria, vigia, serviços gerais, jardinagem)
- Cálculo detalhado de custos, encargos, provisões, benefícios e impostos
- Salvamento e carregamento local de propostas no navegador
- Modo de visualização com layout de documento pronto para impressão
- Geração de PDF via impressão do navegador

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)
- Node.js (apenas para script de validação de cálculos)

## Como executar

1. Abra a pasta do projeto.
2. Abra o arquivo `index.html` no navegador.
3. Edite os campos no painel lateral e acompanhe o preview em tempo real.
4. Use o botão de imprimir para gerar o PDF da proposta.

## Validação de cálculos

Para validar os cálculos matemáticos via terminal:

```bash
node test_calculations.js
```

## Estrutura do projeto

```text
app.js
index.html
styles.css
test_calculations.js
logo.png
```

## Repositório

Este projeto está versionado no GitHub em:

https://github.com/info7design/solida-proposta

## GitHub Pages

Deploy automático configurado via GitHub Actions no arquivo:

.github/workflows/deploy-pages.yml

URL esperada do site publicado:

https://info7design.github.io/solida-proposta/

Se a página ainda não abrir imediatamente, aguarde de 1 a 3 minutos para o primeiro deploy finalizar.
