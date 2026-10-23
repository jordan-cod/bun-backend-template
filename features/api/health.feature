# language: pt
Funcionalidade: Saúde do serviço
  Para saber se a API está no ar
  Como operador
  Eu quero um endpoint de health

  @API-1
  Cenário: Serviço no ar responde ok
    Quando eu faço GET em "/health"
    Então a resposta tem status 200
    E o corpo é {"status": "ok"}
