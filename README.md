# MTECa BI — Simulação Técnica de Produção de Mudas

Painel técnico-operacional, em estilo BI, para simular cenários de produção de mudas em um viveiro florestal em Cáceres-MT, contemplando duas linhas produtivas:

- produção clonal de **Eucalyptus urophylla** por miniestaquia;
- produção seminal de **Tectona grandis** por canteiros e muda tipo toco.

O projeto foi reconstruído do zero com foco em uma experiência mais próxima de Power BI: tabelas editáveis, filtros, matrizes de capacidade, gráficos de tendência, cenário ativo, gargalos, planta operacional reativa e relatório executivo automático.

## Como usar localmente

Baixe o projeto e abra o arquivo:

```text
index.html
```

Não há dependências externas obrigatórias, etapa de build, servidor ou backend. O simulador roda no navegador.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie estes arquivos para a raiz do repositório:

```text
index.html
styles.css
app.js
README.md
```

3. Acesse:

```text
Settings → Pages → Deploy from a branch → main → /root
```

4. Aguarde alguns minutos e abra a URL publicada.

## Funcionalidades principais

- Cenários editáveis com persistência no `localStorage`.
- Criar, duplicar, excluir, restaurar, importar e exportar cenários.
- Simulação de produção desejada versus produção possível.
- Cálculo de demanda inicial considerando perdas, germinação, enraizamento, seleção, mortalidade e margem técnica.
- Cálculo de capacidade instalada por fase.
- Matriz de gargalos por setor.
- Planta operacional clicável.
- Simulador de etapa por lote, com indicação de atividade, riscos e indicadores.
- Gráficos de tendência e comparação de cenários.
- Simulação econômica: CAPEX, OPEX, receita, margem, payback e sensibilidade.
- Relatório executivo automático em Markdown.
- Exportação CSV e JSON.
- Modo apresentação, que oculta controles e privilegia leitura executiva.

## Premissas base

- Meta anual de eucalipto: 1.000.000 mudas clonais.
- Meta anual de teca: 500.000 mudas seminais.
- Capacidade nominal total: 1.500.000 mudas/ano.
- Área total estimada do viveiro: 1,5 ha.
- Reservação hídrica: 200.000 L.
- Área irrigada estimada: 4.500 m².
- Consumo hídrico base: 22.500 L/dia, considerando lâmina média de 5 mm/dia.
- Investimento inicial: R$ 1.749.000.
- Custeio anual: R$ 1.588.000.
- Receita anual referência: R$ 1.875.000.
- Equipe estimada: 9 a 12 colaboradores.

## Lógica do simulador

A ferramenta diferencia:

- **meta desejada**: produção final que se pretende entregar;
- **demanda inicial**: propágulos ou sementes/frutos necessários para atingir a meta considerando perdas;
- **capacidade instalada**: limite físico-operacional das fases do viveiro;
- **produção possível**: produção final calculada após confrontar demanda e capacidade.

Com isso, alterações em área, taxas biológicas, equipe, água ou custos afetam os resultados, os gargalos e o relatório.

## Observação acadêmica

Os valores são parametrizáveis e devem ser validados por cotações reais, laudos de sementes, dados de viveiro, responsável técnico e levantamentos de campo. A plataforma é uma ferramenta de apoio ao raciocínio técnico-operacional, não substitui projeto executivo, orçamento detalhado ou responsabilidade técnica.
