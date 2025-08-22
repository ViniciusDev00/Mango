Plano de Desenvolvimento - MangoFlix
Este documento descreve as próximas fases e funcionalidades a serem implementadas para transformar o protótipo visual em um aplicativo de streaming completo e funcional.

Fase 1: Funcionalidades Essenciais (Tornando o App Interativo)
O objetivo desta fase é fazer com que o aplicativo responda às ações do usuário, criando a base para todas as outras funcionalidades.

1. Navegação e Tela de Detalhes
O quê?

Ativar a barra de abas (Tab Bar) para que a navegação entre Início, Filmes, Séries e Favoritos funcione.

Criar uma nova tela (TelaDetalhes.js).

Fazer com que o clique em qualquer pôster leve o usuário para a TelaDetalhes, exibindo informações básicas (título e imagem) do item selecionado.

Status: A Fazer

2. Player de Vídeo
O quê?

Adicionar um componente de vídeo à TelaDetalhes.

Fazer o botão "Assista Agora" (ou um botão de "Play" na tela de detalhes) abrir e reproduzir um link de trailer de exemplo.

Status: A Fazer

Fase 2: Interatividade e Dados Reais
Com a estrutura básica funcional, o foco agora é tornar o aplicativo dinâmico, inteligente e útil.

3. Conexão com API Externa (TMDB)
O quê?

Substituir todas as nossas listas de dados fixas (mock data) por chamadas reais à API do The Movie Database (TMDB).

As telas Início, Filmes e Séries passarão a exibir conteúdo real e atualizado da internet.

Status: A Fazer

4. Busca Funcional
O quê?

Criar uma nova tela (TelaBusca.js).

Ativar o ícone de lupa no cabeçalho para navegar até a tela de busca.

Implementar um campo de texto que, ao ser preenchido, busca filmes e séries na API do TMDB e exibe os resultados.

Status: A Fazer

5. Gerenciamento de Estado (Salvar Favoritos)
O quê?

Adicionar um ícone de "favoritar" (estrela ou coração) na TelaDetalhes.

Quando o usuário clicar, o item será salvo na lista de favoritos.

Essa lista deve ser salva no armazenamento local do celular (AsyncStorage) para que não se perca ao fechar o app.

A TelaFavoritos passará a exibir os itens que foram salvos.

Status: A Fazer

Fase 3: Recursos Avançados (Nível Profissional)
Estas funcionalidades transformam o aplicativo em um produto completo, pronto para múltiplos usuários.

6. Autenticação de Usuários
O quê?

Criar telas de Login, Cadastro e Perfil.

Implementar um sistema para que cada usuário tenha sua própria conta.

Status: A Fazer

7. Backend Próprio
O quê?

Desenvolver um servidor para gerenciar os dados dos usuários (listas de favoritos, "continue assistindo", etc.) de forma segura e centralizada.

Status: A Fazer




Ideias de funçoes extras:


**🎯 "Mood Streaming"** - IA que detecta seu humor através de padrões de uso e sugere conteúdo baseado no seu estado emocional (estressado = comédia, triste = drama inspirador).

**🎮 "Watch Parties Virtuais"** - Assista com amigos remotamente com chat em tempo real, reações emoji sincronizadas e controle compartilhado.

**🧠 "Memory Lane"** - Cria automaticamente "cápsulas do tempo" com filmes/séries que você assistiu em datas específicas, aniversários ou eventos importantes.

**⚡ "Speed Dating de Conteúdo"** - Mostra trailers de 15 segundos e você swipa direita/esquerda. O algoritmo aprende suas preferências instantaneamente.
