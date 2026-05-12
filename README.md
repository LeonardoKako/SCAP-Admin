# SCAP - Sistema de Controle de Acesso e Ponto

O **SCAP** é uma solução moderna para a gestão de segurança e frequência organizacional. O sistema integra o controle físico de acessos (catracas) com a gestão de jornada de trabalho, oferecendo uma interface centralizada e eficiente.

## Funcionalidades
- **Gestão de Usuários:** CRUD completo e vinculação por setores.
- **Registro Automático:** Captura de entradas e saídas via API para catracas.
- **Painel de Monitoramento:** Interface em tempo real para porteiros e administradores.
- **Relatórios:** Consulta de logs de acesso para auditoria e RH.

## Arquitetura Técnica

### Back-end
Desenvolvido em **Node.js** com **Express**, utilizando uma estrutura de camadas para melhor organização:
- **Controllers:** Responsáveis pela manipulação de rotas e validação de requisições.
- **Services:** Onde reside toda a lógica de negócio e regras de acesso.
- **Prisma ORM:** Camada de persistência que garante consultas rápidas e seguras ao banco de dados.

### Front-end
Construído com **React**, focado em uma interface modular:
- **Componentização:** UI baseada em componentes reutilizáveis, garantindo consistência e agilidade no desenvolvimento.
- **Experiência do Usuário:** Interface fluida e responsiva para operação em portarias.

## Documentação da API
O projeto utiliza o **Swagger** para documentar todos os endpoints. Isso permite que desenvolvedores e integradores de hardware visualizem os schemas e testem a API de forma interativa.

---
*Projeto focado em escalabilidade, manutenção simplificada e rastreabilidade total.*
