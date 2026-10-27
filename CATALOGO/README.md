# Modelo de catálogo digital

Este é um catálogo responsivo e independente de framework. Abra `index.html` no navegador ou publique os três arquivos juntos em qualquer hospedagem estática.

## Personalização rápida

No arquivo `catalogo.js`, altere:

- `CONFIG`: nome da marca, texto, imagens, Instagram e número do WhatsApp;
- `PRODUTOS`: itens, categorias, preços, disponibilidade e fotos.

O número em `whatsapp` deve conter país e DDD, somente dígitos. Exemplo: `5511999999999`.

Cada produto aceita: `nome`, `categoria`, `preco`, `estoque`, `imagem`, `descricao` e, opcionalmente, `destaque`.

Os filtros, busca, ordenação, página de detalhes e botão de orçamento por WhatsApp funcionam sem ajustes adicionais.

## Carrinho e pedido

O cliente pode adicionar vários produtos, ajustar quantidades e informar nome/observação. Ao clicar em **Finalizar pelo WhatsApp**, o catálogo abre uma conversa com uma mensagem pronta contendo cada item, quantidade, valor unitário, subtotal e total do pedido.

## Painel do lojista

O botão **Área do lojista** abre um painel para adicionar, editar, excluir e disponibilizar/indisponibilizar produtos. As mudanças ficam salvas no `localStorage` deste navegador e aparecem imediatamente no catálogo.

O painel segue o fluxo do vídeo de referência: dashboard com indicadores de produtos/categorias, lista de produtos recentes, navegação lateral, tela de inventário, categorias, configurações e editor de produto com foto, preço, categoria, disponibilidade e destaque.

Na tela **Categorias**, é possível criar, renomear e excluir categorias vazias. Ao renomear, os produtos vinculados são atualizados automaticamente.

Na tela **Configurações**, o lojista pode editar nome da loja, coleção, textos, imagem principal, WhatsApp e Instagram. Essas informações são gravadas no mesmo `localStorage` usado pelo catálogo e são carregadas pelo site na próxima abertura/atualização.

Ao clicar em **Área do lojista**, uma nova aba abre o arquivo `admin.html` somente com a tela de login. O markup do painel é mantido fora da página visível e só é inserido depois que as credenciais são validadas. Credenciais padrão do modelo:

- Usuário: `admin`
- Senha: `1234`

Altere `ADMIN_CREDENTIALS` no início de `admin.js`. Esta autenticação é apenas de demonstração no navegador; não protege dados em produção sem um servidor, banco de dados e autenticação real.

Este painel local é ideal como modelo/protótipo. Para produção, conecte o mesmo formulário a uma API/banco de dados e proteja a rota com autenticação; o `localStorage` não é uma camada de segurança.
