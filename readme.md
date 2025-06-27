# RedTasker

RedTasker é um gerenciador de tarefas simples e prático, desenvolvido em React Native com backend utilizando Supabase. O app permite que usuários se cadastrem, façam login e gerenciem suas tarefas com facilidade — incluindo adicionar, remover e marcar como concluídas.
## Equipe do projeto

Victor Augusto Lima Barbosa RA: 202202209236<br>
João Henrique Augait Do Nascimento RA: 202202782671<br>
André Ribeiro Xavier RA: 202303822103<br>

## Sumário

1. Requisitos<br>
2. Estrutura do projeto<br>
3. Tabela utilizada para autenticação<br>
4. Requisitos<br>
5. Execute o projeto<br>
6. Telas do projeto<br>


## 🔧 Requisitos:

 - Emulador Android (Sugestão: LD Player https://pt.ldplayer.net/) ou dispositivo Android.<br>
 - APK do RedTasker

### 🗃️ Tabela 'usuarios' com os seguintes campos:
```
UID: UUID or int (primary key)
email : varchar
password: varchar
```

## 🔐 Configuração de acesso ao banco de dados
```
DATABASE_URL=https://ijspzmyvcwpgujrkiimc.supabase.co
DATABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqc3B6bXl2Y3dwZ3VqcmtpaW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzODcwMzUsImV4cCI6MjA2Mzk2MzAzNX0.UK9s3yCXDtf6dTqPJLrIgtalhULtUiN7Vio91MoDwEI
```

## 📁 Estrutura do projeto:
```
RedTasker/
├── Apresentação
│   └── apresentacao.pdf
├── Documentação
│   ├── 01_cartaDeApresentacao.pdf
│   ├── 02_cartaDeAutorizacao.pdf
│   ├── 03_declaracaoDeUsoDeDadosPublicos.pdf
│   └── 04_roteiroDeExtensao.pdf
├── frontend
│   ├── app
│   ├── pages
│   ├── App.tsx
│   ├── AuthScreen.tsx
│   └── main.tsx
├── backend
│   ├── integrations/supabase
│   └── supabase
├── video
│   └── video.txt
└── readme.md 
```

## 📦 Instale os requisitos do projeto:
```
Download LD Player: https://pt.ldplayer.net/

Download APK: https://github.com/frtvi/Android/releases/tag/1.1.0

```

## 🚀 Execute o projeto:
Abra o LD Player e arraste o .apk até a tela inicial:  
![LDPlayer](Imagens/printldplayer.png)

Clique no ícone e execute o projeto!

## Telas do projeto

Tela 1: Login  
![Login](Imagens/login.png)

Tela 2: Criação de usuário  
![User](Imagens/criacao.png)

Tela 4: Tela Principal  
![Principal](Imagens/telaprincipal.png)
