

# Sythera IA — Plano de Implementação

## Visão Geral
Aplicativo mobile-first de chat com bots de IA, rede social integrada e servidores de grupo. Os bots têm personalidade, memória, relacionamento individual com cada usuário e acesso à web. Sistema robusto de moderação e controle de idade.

---

## Fase 1 — Fundação (Auth + Banco + Perfil)

### 1.1 Configuração Lovable Cloud + Supabase
- Ativar Lovable Cloud com banco de dados
- Criar toda a estrutura de tabelas (users/profiles, bots, conversations, messages, servers, posts, reports, etc.)
- Configurar RLS em todas as tabelas
- Criar sistema de roles (admin, moderator, user)

### 1.2 Autenticação e Cadastro
- Tela de login (email/senha)
- Cadastro com **data de nascimento obrigatória** (campo de data)
- Criação automática de perfil completo: nome, bio, foto (upload via Storage), gênero, idioma
- Validação de idade no cadastro
- Ativação do modo 18+ (apenas para ≥18 anos)

### 1.3 Internacionalização (i18n)
- Estrutura de tradução com arquivos JSON (pt-BR padrão)
- Suporte a troca de idioma nas configurações
- Todos os textos via sistema i18n, sem hardcode

### 1.4 Tema Claro/Escuro
- Dark mode: preto + azul marinho + texto branco
- Light mode: branco + azul + texto preto
- Toggle nas configurações

---

## Fase 2 — Bots + Chat com IA

### 2.1 Criação de Bots (multi-step)
- Formulário completo em etapas:
  - Info básica (nome, gênero, slogan, nota do criador)
  - Personalidade (tipo, JSON detalhado, estilo de fala)
  - História e primeira mensagem
  - Configuração de status e experiência de vida
  - Etiquetas e flag NSFW
  - NPCs relacionados ao bot
- Upload de avatar do bot via Storage
- Bots públicos/privados

### 2.2 Biblioteca de Bots
- Listagem com cards modernos
- Filtro por etiquetas, gênero, popularidade
- Ocultação de bots NSFW para menores de 18
- Busca por nome

### 2.3 Chat Completo com IA
- Integração via Lovable AI (Gemini) através de Edge Function
- Personalidade do bot injetada no system prompt
- **Memória automática** (resumo de conversa salvo em JSON)
- **Memória manual** (usuário pode adicionar notas)
- Modos: conversa normal e roleplay
- Ações no chat:
  - Regenerar resposta
  - Editar mensagem do usuário
  - Deletar mensagem
  - Reiniciar chat
- Diário do bot (registro de momentos marcantes)
- Celular do bot (simulação de interface do celular do personagem)
- Pensamento interno (mostrar "raciocínio" do bot)
- Paginação de mensagens
- Supabase Realtime para atualizações

### 2.4 Sistema de Relacionamento
- Pontos de relacionamento individuais por usuário+bot
- Faixas: Em chamas → Parceiro (-100 a 2000+)
- IA decide variação (-10 a +10) com base na conversa
- Indicador visual no chat

---

## Fase 3 — Web Search + Moderação

### 3.1 Acesso à Web (Edge Function)
- Conectar Perplexity como provedor de busca
- Edge Function recebe contexto do bot + mensagem do usuário
- Executa busca, filtra conteúdo impróprio, resume e injeta no contexto
- Cache de buscas recentes no banco para evitar requisições repetidas
- Filtro rígido para menores de 18 e bots não-NSFW

### 3.2 Moderação por IA (Edge Function)
- Detecção automática de conteúdo proibido (NSFW não marcado, pedofilia, incesto, violência extrema, falta de consentimento)
- Ações: bloquear, ocultar, enviar para revisão admin
- Aplicada em mensagens de chat, posts da rede social e descrições de bots

---

## Fase 4 — Rede Social

### 4.1 Feed
- Posts de usuários e bots (gerados automaticamente via IA + web search)
- Lazy loading no scroll
- Cards com imagem (upload via Storage), texto e metadados

### 4.2 Interações
- Comentários (IA dos bots pode comentar automaticamente)
- Reações
- Sistema de reputação dinâmica (delta por post)
- Seguidores (incluindo seguidores fake para bots)

---

## Fase 5 — Servidores

### 5.1 Criação e Gestão
- Criar servidor com nome, descrição, flag 18+
- Adicionar bots e convidar usuários
- Bloqueio de menores em servidores 18+

### 5.2 Chat em Grupo
- Chat com múltiplos bots e usuários via Supabase Realtime
- Autonomia entre bots (bots interagem entre si via Edge Function)
- Paginação de mensagens

### 5.3 Chat Privado
- Mensagem direta entre usuários dentro do servidor
- Supabase Realtime

### 5.4 Denúncias
- Sistema de reports com motivo e status (pendente/resolvido)

---

## Fase 6 — Admin + Configurações

### 6.1 Painel Admin (protegido por role)
- Visualizar reports pendentes
- Moderar bots e posts denunciados
- Gerenciar usuários (banir, remover)
- Dashboard de estatísticas

### 6.2 Configurações do Usuário
- Ativar/desativar modo 18+
- Trocar idioma
- Alternar tema claro/escuro
- Excluir conta (com confirmação e cascade)

---

## Navegação Principal
- Layout mobile-first com tabs na parte inferior:
  - 📚 Biblioteca (bots)
  - 🌐 Rede Social (feed)
  - 💬 Servidores
  - ✨ Criar Bot
  - 👤 Perfil/Configurações

---

## Stack Técnica
- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Lovable Cloud (Supabase) + Edge Functions
- **IA**: Lovable AI Gateway (Gemini)
- **Web Search**: Perplexity (conector)
- **Storage**: Supabase Storage (avatares, imagens de posts)
- **Realtime**: Supabase Realtime (chats, servidores)
- **i18n**: Estrutura própria com JSON de traduções

