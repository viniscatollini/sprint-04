// — [SPRINT 04 - ROTAS ALTERADAS PARA USAR ARQUIVOS] —
app.get("/mensagens", async (req, res) => {
  try { res.json(await lerMensagens()); }
  catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Não foi possível ler as mensagens." });
  }
});
app.get("/mensagens/:id", async (req, res) => {
  try {
    const lista = await lerMensagens();
    const mensagem = lista.find(m => m.id === Number(req.params.id));
    if (!mensagem) return res.status(404).json({ erro: "Mensagem não encontrada." });
    res.json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao consultar mensagem." });
  }
});
app.get("/total-mensagens", async (req, res) => {
  try { res.json({ total: (await lerMensagens()).length }); }
  catch (erro) { res.status(500).json({ erro: "Falha na contagem." }); }
});

// Rota TEMPORÁRIA: apenas para aprender escrita em arquivo.
// GET não deve modificar dados numa API real; será removida na Sprint 05.
app.get("/exemplo-salvar", async (req, res) => {
  try {
    const lista = await lerMensagens();
    lista.push({ id: Date.now(), usuario: "Exemplo", texto: "Gravado em arquivo!" });
    await salvarMensagens(lista);
    res.json({ aviso: "Exemplo didático gravado", total: lista.length });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao gravar arquivo." });
  }
});


// — [SPRINT 01 - SERVIDOR: iniciado na porta 3000; mantido ao longo das aulas] —
app.listen(PORT, () => {console.log(`Servidor em http://localhost:${PORT}`);
});