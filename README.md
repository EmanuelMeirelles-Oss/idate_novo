# IDATE — Instituto dos Direitos da Água, Terra e Energia

> **Centro de inteligência jurídica e patrimonial.** Identificamos, protegemos e recuperamos direitos econômicos que empresas possuem e desconhecem nos setores de Água, Terra e Energia.

---

## ⚡ Tecnologias Utilizadas

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Linguagem**: [TypeScript (Strict Mode)](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações & Motion**: [Motion (Framer Motion)](https://motion.dev/)
- **Ícones**: [Phosphor Icons](https://phosphoricons.com/)
- **Validação de Formulários**: [Zod v4](https://zod.dev/)
- **Envio de E-mail**: [Resend](https://resend.com/)
- **Testes & Qualidade**: [Vitest](https://vitest.dev/) + React Testing Library

---

## 🎨 Conceito Visual e Identidade

O projeto adota a direção visual de **"Dossiê Institucional"**:
- **Paleta de Cores**: Base escura neutra e sóbria (*Noite* `#0A0C10` e *Carvão* `#14171d`) com tipografia de alto contraste (*Osso* `#E9EBEF`) e acento exclusivo no tom da marca (*Cobalto* `#1236C8` / *Cobalto Claro* `#5B7CFF`).
- **Conformidade WCAG**: Todas as combinações de texto e fundo atendem rigorosamente aos níveis AA e AAA de acessibilidade visual.
- **Micro-interações**: Efeito de revelação no scroll (`Patrimônio Invisível`), menus translúcidos com *backdrop blur*, botões com brilho sutil e CTA flutuante persistente (`FloatingCTA`).

---

## 🚀 Como Rodar Localmente

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   # ou via CMD no Windows
   cmd /c npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

3. **Executar os testes de qualidade (Vitest)**:
   ```bash
   npm test
   ```

4. **Gerar a build de produção**:
   ```bash
   npm run build
   ```

---

## 🌐 Publicação no GitHub e Deploy na Vercel

### Passo 1: Publicar no seu GitHub

Se o seu repositório ainda não estiver no seu GitHub, siga os comandos no terminal do projeto (`D:\Idate`):

```bash
# 1. Adicione a URL do seu novo repositório criado no GitHub:
git remote add origin https://github.com/SEU_USUARIO/idate-site-institucional.git

# 2. Envie todo o código para a branch principal:
git branch -M main
git push -u origin main
```

---

### Passo 2: Publicar na Vercel

1. Acesse o painel da [Vercel](https://vercel.com/) e faça login com sua conta do GitHub.
2. Clique em **"Add New..."** → **"Project"**.
3. Selecione o repositório **`idate-site-institucional`** importado do seu GitHub.
4. Em **Environment Variables**, adicione (se necessário):
   - `RESEND_API_KEY`: Chave da API do Resend para o formulário de contato.
   - `EMAIL_DESTINO`: E-mail que receberá as solicitações de análise.
5. Clique em **"Deploy"**.

Sua aplicação estará no ar em instantes com SSL automático e atualização contínua a cada novo `git push`!

---

### 📄 Licença

Direitos reservados ao **IDATE — Instituto dos Direitos da Água, Terra e Energia**.

