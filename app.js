/* MTECa BI — Simulação Técnica de Produção de Mudas
   Frontend estático, sem backend e sem dependências externas.
   O foco é simulação de capacidade, não apenas cálculo de demanda. */

const STORAGE_KEY = "mteca-bi-v1";

const NAV = [
  ["overview", "Visão Geral", "▦"],
  ["production", "Produção", "↯"],
  ["capacity", "Capacidade", "▤"],
  ["plant", "Planta Operacional", "▣"],
  ["trends", "Tendências", "⌁"],
  ["budget", "Orçamento", "R$"],
  ["report", "Relatório", "✎"],
];

const FIELD_META = {
  "production.eucalyptusTarget": ["Meta anual de eucalipto", "mudas", "Dado informado"],
  "production.teakTarget": ["Meta anual de teca", "mudas", "Dado informado"],
  "production.weeks": ["Semanas produtivas", "sem", "Premissa ajustável"],
  "production.safetyMargin": ["Margem técnica", "%", "Premissa ajustável"],
  "rates.eucalyptusRooting": ["Enraizamento do eucalipto", "%", "Premissa ajustável"],
  "rates.eucalyptusSelection": ["Seleção do eucalipto", "%", "Premissa ajustável"],
  "rates.teakGermination": ["Germinação da teca", "%", "Premissa ajustável"],
  "rates.teakSelection": ["Seleção da teca", "%", "Premissa ajustável"],
  "rates.generalMortality": ["Mortalidade operacional", "%", "Premissa ajustável"],
  "time.greenhouseDays": ["Casa de vegetação", "dias", "Premissa ajustável"],
  "time.shadeDays": ["Casa de sombra", "dias", "Premissa ajustável"],
  "time.rustificationDays": ["Crescimento/rustificação", "dias", "Premissa ajustável"],
  "time.teakMonths": ["Canteiro de teca", "meses", "Premissa ajustável"],
  "time.dispatchDays": ["Expedição/carregamento", "dias", "Premissa ajustável"],
  "infra.greenhouse1Area": ["Casa de vegetação 1", "m²", "Dado informado"],
  "infra.greenhouse2Area": ["Casa de vegetação 2", "m²", "Dado informado"],
  "infra.shadeArea": ["Casa de sombra", "m²", "Dado informado"],
  "infra.rustificationArea": ["Crescimento/rustificação", "m²", "Dado informado"],
  "infra.teakBedsArea": ["Canteiros de teca", "m²", "Dado informado"],
  "infra.clonalGardenArea": ["Minijardim clonal", "m²", "Dado informado"],
  "infra.operationalShedArea": ["Galpão operacional", "m²", "Dado informado"],
  "infra.adminArea": ["Administração", "m²", "Dado informado"],
  "infra.reservoirLiters": ["Reservação hídrica", "L", "Dado informado"],
  "infra.irrigatedArea": ["Área irrigada", "m²", "Dado informado"],
  "infra.irrigationDepth": ["Lâmina média", "mm/dia", "Premissa ajustável"],
  "operation.staff": ["Colaboradores diretos", "pessoas", "Dado informado"],
  "operation.productivityPerStaff": ["Produtividade por colaborador", "mudas/ano", "Premissa ajustável"],
  "operation.traysPerM2": ["Bandejas por m²", "band./m²", "Premissa ajustável"],
  "operation.cellsPerTray": ["Células por bandeja", "cél.", "Premissa ajustável"],
  "operation.teakBeds": ["Número de canteiros", "un.", "Dado informado"],
  "operation.teakBedLength": ["Comprimento dos canteiros", "m", "Dado informado"],
  "operation.teakBedWidth": ["Largura dos canteiros", "m", "Dado informado"],
  "operation.teakPositionsPerM2": ["Posições por m²", "pos./m²", "Premissa ajustável"],
  "finance.investment": ["Investimento inicial", "R$", "Dado informado"],
  "finance.opex": ["Custeio anual", "R$", "Dado informado"],
  "finance.eucalyptusPrice": ["Preço eucalipto", "R$/muda", "Premissa ajustável"],
  "finance.teakPrice": ["Preço teca", "R$/muda", "Premissa ajustável"],
  "finance.depreciation": ["Depreciação anual", "R$", "Dado informado"],
  "finance.contingency": ["Contingência", "%", "Premissa ajustável"],
};

const PLANT_SECTORS = [
  { id:"admin", label:"Administração e apoio", x:2, y:4, w:20, h:16, field:"infra.adminArea", stage:"Gestão", indicator:"Registros e conformidade", risk:"documentação incompleta", rec:"manter rastreabilidade, notas, laudos e RENASEM atualizados." },
  { id:"shed", label:"Galpão operacional", x:24, y:4, w:23, h:18, field:"infra.operationalShedArea", stage:"Preparo e expedição", indicator:"fluxo de lotes", risk:"cruzamento de fluxo limpo e sujo", rec:"separar áreas de preparo, seleção, limpeza, embalagem e carregamento." },
  { id:"reservoir", label:"Reservatórios", x:49, y:4, w:17, h:18, field:"infra.reservoirLiters", stage:"Água", indicator:"autonomia hídrica", risk:"interrupção de irrigação", rec:"monitorar filtros, bombas e autonomia mínima no período seco." },
  { id:"almox", label:"Almoxarifado / EPI / Insumos", x:68, y:4, w:30, h:18, field:"infra.operationalShedArea", stage:"Apoio", indicator:"estoque crítico", risk:"falta de insumo em janela produtiva", rec:"usar lista de compras por lote e registrar reposição de tubetes, substrato, sementes e EPI." },
  { id:"garden", label:"Minijardim clonal", x:2, y:28, w:22, h:20, field:"infra.clonalGardenArea", stage:"Eucalipto — matriz", indicator:"brotações úteis/semana", risk:"queda de vigor de minicepas", rec:"ajustar fertirrigação, podas, sanidade e frequência de coleta." },
  { id:"gh1", label:"Casa de vegetação 1", x:26, y:28, w:17, h:20, field:"infra.greenhouse1Area", stage:"Enraizamento", indicator:"% enraizamento", risk:"fungos e encharcamento", rec:"regular nebulização, ventilação e higienização de bandejas e bancadas." },
  { id:"gh2", label:"Casa de vegetação 2", x:45, y:28, w:17, h:20, field:"infra.greenhouse2Area", stage:"Enraizamento", indicator:"% enraizamento", risk:"perda por dessecação", rec:"manter alta umidade relativa sem saturar o substrato." },
  { id:"shade", label:"Casa de sombra", x:64, y:28, w:18, h:20, field:"infra.shadeArea", stage:"Aclimatação", indicator:"sobrevivência pós-enraizamento", risk:"choque por mudança ambiental", rec:"reduzir dependência de umidade gradualmente e monitorar lotes fracos." },
  { id:"dispatch", label:"Seleção, embalagem e carregamento", x:84, y:28, w:14, h:20, field:"time.dispatchDays", stage:"Expedição", indicator:"lotes prontos/dia", risk:"muda pronta ficar retida", rec:"programar carregamento e transporte próximo à janela de plantio." },
  { id:"rust", label:"Crescimento e rustificação — eucalipto", x:2, y:56, w:44, h:36, field:"infra.rustificationArea", stage:"Rustificação", indicator:"ocupação de bandejas", risk:"represamento de lotes", rec:"aumentar área, reduzir permanência ou escalonar lotes se ocupação exceder 100%." },
  { id:"teak", label:"Setor Tectona grandis — canteiros", x:48, y:56, w:50, h:36, field:"infra.teakBedsArea", stage:"Teca — canteiros", indicator:"posições ocupadas", risk:"germinação desuniforme e plantas daninhas", rec:"validar lote de sementes/frutos, controlar dormência, matocompetição e irrigação." },
  { id:"drainage", label:"Circulação e drenagem", x:2, y:50, w:96, h:4, field:"infra.irrigatedArea", stage:"Infraestrutura", indicator:"escoamento", risk:"alagamento e disseminação sanitária", rec:"manter declividade funcional, drenos limpos e piso com baixa contaminação." },
];

const EUC_STAGES = ["garden", "gh1", "shade", "rust", "dispatch"];
const TEAK_STAGES = ["almox", "teak", "dispatch"];

const CALENDAR = [
  { m:"Jan", euc:"Expedição de lotes rustificados; manutenção do minijardim.", teak:"Expedição de lote anterior, se houver demanda.", trans:"Controle de estoque, irrigação e perdas." },
  { m:"Fev", euc:"Enraizamento, aclimatação e crescimento de lotes semanais.", teak:"Manutenção de canteiros e controle de plantas daninhas.", trans:"Monitoramento fitossanitário e manutenção de filtros." },
  { m:"Mar", euc:"Produção contínua de miniestacas e manejo nutricional.", teak:"Seleção de fornecedores ou matrizes.", trans:"Análise de água e revisão da fertirrigação." },
  { m:"Abr", euc:"Produção clonal contínua.", teak:"Armazenamento seco e protegido das sementes/frutos.", trans:"Capacitação de equipe, EPI e cotações." },
  { m:"Mai", euc:"Ajuste da produção para demanda contratada.", teak:"Tratamento de dormência do lote 1.", trans:"Revisão do sistema de irrigação e controle de formigas." },
  { m:"Jun", euc:"Crescimento e rustificação de lotes.", teak:"Semeadura do lote 1 de teca.", trans:"Registro de lotes e monitoramento de germinação." },
  { m:"Jul", euc:"Produção clonal contínua.", teak:"Tratamento de dormência e semeadura do lote 2.", trans:"Controle de matocompetição e qualidade de lotes." },
  { m:"Ago", euc:"Expedição programada de eucalipto.", teak:"Condução dos canteiros e seleção inicial.", trans:"Planejamento logístico e adubação quando indicada." },
  { m:"Set", euc:"Produção e expedição conforme demanda.", teak:"Condução e seleção dos canteiros.", trans:"Contato com clientes e programação de plantio." },
  { m:"Out", euc:"Expedição de mudas clonais.", teak:"Preparo de mudas tipo toco do lote 1.", trans:"Carregamento, rastreabilidade e avaliação de qualidade." },
  { m:"Nov", euc:"Produção contínua e expedição.", teak:"Preparo e expedição do lote 2.", trans:"Controle documental e notas fiscais." },
  { m:"Dez", euc:"Redução planejada de estoque pronto e planejamento do próximo ano.", teak:"Revisão de canteiros e limpeza.", trans:"Inventário anual, manutenção e fechamento econômico." },
];

function createDefaultScenario(name = "Cenário Base") {
  return {
    id: cryptoId(),
    name,
    createdAt: new Date().toISOString(),
    production: { eucalyptusTarget: 1000000, teakTarget: 500000, weeks: 48, safetyMargin: 8 },
    rates: { eucalyptusRooting: 85, eucalyptusSelection: 92, teakGermination: 70, teakSelection: 88, generalMortality: 2 },
    time: { greenhouseDays: 28, shadeDays: 10, rustificationDays: 55, teakMonths: 5, dispatchDays: 3 },
    infra: {
      greenhouse1Area: 120, greenhouse2Area: 120, shadeArea: 100, rustificationArea: 500,
      teakBedsArea: 3500, clonalGardenArea: 150, operationalShedArea: 300, adminArea: 120,
      reservoirLiters: 200000, irrigatedArea: 4500, irrigationDepth: 5
    },
    operation: { staff: 11, productivityPerStaff: 150000, traysPerM2: 2.6, cellsPerTray: 96, teakBeds: 22, teakBedLength: 80, teakBedWidth: 1.2, teakPositionsPerM2: 200 },
    finance: { investment: 1749000, opex: 1588000, eucalyptusPrice: 0.90, teakPrice: 1.95, depreciation: 133167, contingency: 10 }
  };
}

let state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      if(parsed?.scenarios?.length) return parsed;
    }
  }catch(_){ }
  const base = createDefaultScenario("Base — projeto técnico");
  const conservative = cloneScenario(base, "Conservador — perdas altas");
  conservative.rates.eucalyptusRooting = 78;
  conservative.rates.teakGermination = 62;
  conservative.rates.eucalyptusSelection = 88;
  conservative.rates.teakSelection = 84;
  conservative.rates.generalMortality = 4;
  const optimized = cloneScenario(base, "Otimizado — manejo eficiente");
  optimized.rates.eucalyptusRooting = 90;
  optimized.rates.teakGermination = 78;
  optimized.rates.eucalyptusSelection = 94;
  optimized.rates.teakSelection = 91;
  optimized.rates.generalMortality = 1.5;
  return { activePage:"overview", activeScenarioId:base.id, presentation:false, activePlantSector:"gh1", lotSpecies:"euc", lotStageIndex:1, calendarFilter:"all", scenarios:[base, conservative, optimized] };
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function cryptoId(){ return "scn_" + Math.random().toString(16).slice(2) + Date.now().toString(16); }
function cloneScenario(s, newName){ const n = JSON.parse(JSON.stringify(s)); n.id = cryptoId(); n.name = newName || s.name + " cópia"; n.createdAt = new Date().toISOString(); return n; }
function activeScenario(){ return state.scenarios.find(s => s.id === state.activeScenarioId) || state.scenarios[0]; }
function getPath(obj, path){ return path.split(".").reduce((o,k)=>o?.[k], obj); }
function setPath(obj, path, value){ const keys=path.split("."); let cur=obj; for(let i=0;i<keys.length-1;i++) cur=cur[keys[i]]; cur[keys.at(-1)] = value; }
function clamp(v,min,max){ v=Number(v); if(Number.isNaN(v)) return min; return Math.min(max, Math.max(min, v)); }
function safeDiv(a,b){ return b ? a/b : 0; }
function sum(arr){ return arr.reduce((a,b)=>a+b,0); }

function calcScenario(s){
  const p = s.production, r = s.rates, t = s.time, i = s.infra, o = s.operation, f = s.finance;
  const weeks = Math.max(1, p.weeks);
  const margin = Math.max(0, p.safetyMargin)/100;
  const root = clamp(r.eucalyptusRooting, 1, 100)/100;
  const selE = clamp(r.eucalyptusSelection, 1, 100)/100;
  const germ = clamp(r.teakGermination, 1, 100)/100;
  const selT = clamp(r.teakSelection, 1, 100)/100;
  const mort = clamp(r.generalMortality, 0, 95)/100;
  const cells = Math.max(1, o.cellsPerTray);
  const traysM2 = Math.max(.1, o.traysPerM2);

  const successE = root * selE * (1 - mort);
  const successT = germ * selT * (1 - mort);

  const metaE = Math.max(0, p.eucalyptusTarget);
  const metaT = Math.max(0, p.teakTarget);
  const metaTotal = metaE + metaT;

  const initialERequired = safeDiv(metaE, successE);
  const initialEWithMargin = initialERequired * (1 + margin);
  const weeklyEInitial = initialEWithMargin / weeks;

  const cvArea = Math.max(0, i.greenhouse1Area + i.greenhouse2Area);
  const cvCapacityTrays = cvArea * traysM2;
  const shadeCapacityTrays = Math.max(0, i.shadeArea) * traysM2;
  const rustCapacityTrays = Math.max(0, i.rustificationArea) * traysM2;

  const demandCvTrays = safeDiv(weeklyEInitial * (t.greenhouseDays / 7), cells);
  const demandShadeTrays = safeDiv(weeklyEInitial * root * (t.shadeDays / 7), cells);
  const demandRustTrays = safeDiv(weeklyEInitial * root * selE * (t.rustificationDays / 7), cells);

  const capInitialByCv = safeDiv(cvCapacityTrays * cells * weeks, (t.greenhouseDays / 7));
  const capInitialByShade = safeDiv(shadeCapacityTrays * cells * weeks, root * (t.shadeDays / 7));
  const capInitialByRust = safeDiv(rustCapacityTrays * cells * weeks, root * selE * (t.rustificationDays / 7));
  const maxEInitialByPhysical = Math.max(0, Math.min(capInitialByCv || Infinity, capInitialByShade || Infinity, capInitialByRust || Infinity));
  const eInitialProduced = Math.min(initialEWithMargin, maxEInitialByPhysical);
  const eFinalProjected = eInitialProduced * successE;

  const initialTRequired = safeDiv(metaT, successT);
  const initialTWithMargin = initialTRequired * (1 + margin);
  const cyclesT = Math.max(1, Math.floor(12 / Math.max(1, t.teakMonths)));
  const areaPositionsByBeds = o.teakBeds * o.teakBedLength * o.teakBedWidth * o.teakPositionsPerM2;
  const areaPositionsByArea = i.teakBedsArea * 0.60 * o.teakPositionsPerM2;
  const teakPositionsPerCycle = Math.max(0, Math.min(areaPositionsByBeds || Infinity, areaPositionsByArea || Infinity));
  const teakAnnualInitialCapacity = teakPositionsPerCycle * cyclesT;
  const tInitialProduced = Math.min(initialTWithMargin, teakAnnualInitialCapacity);
  const tFinalProjected = tInitialProduced * successT;

  const finalTotal = eFinalProjected + tFinalProjected;
  const targetFulfillment = safeDiv(finalTotal, metaTotal);

  const waterDaily = i.irrigatedArea * i.irrigationDepth;
  const waterAutonomy = safeDiv(i.reservoirLiters, waterDaily);

  const staffRequired = Math.ceil(safeDiv(metaTotal, Math.max(1, o.productivityPerStaff)));
  const staffOccupation = safeDiv(staffRequired, Math.max(1, o.staff));

  const revenueE = eFinalProjected * f.eucalyptusPrice;
  const revenueT = tFinalProjected * f.teakPrice;
  const revenueTotal = revenueE + revenueT;
  const costTotal = f.opex + f.depreciation;
  const costPerSeedling = safeDiv(costTotal, finalTotal);
  const operationalMargin = safeDiv(revenueTotal - f.opex, revenueTotal);
  const netBeforeTax = revenueTotal - f.opex;
  const payback = netBeforeTax > 0 ? f.investment / netBeforeTax : Infinity;

  const stages = [
    makeStage("Casa de vegetação", "gh1", demandCvTrays, cvCapacityTrays, "bandejas", "Enraizamento de miniestacas", "Regular nebulização, temperatura, sanidade e higienização."),
    makeStage("Casa de sombra", "shade", demandShadeTrays, shadeCapacityTrays, "bandejas", "Aclimatação pós-enraizamento", "Evitar choque ambiental e descartar lotes fracos."),
    makeStage("Crescimento/rustificação", "rust", demandRustTrays, rustCapacityTrays, "bandejas", "Desenvolvimento final e preparo para campo", "Escalonar lotes e controlar irrigação/nitrogênio."),
    makeStage("Canteiros de teca", "teak", initialTWithMargin, teakAnnualInitialCapacity, "posições/ano", "Germinação, condução e muda tipo toco", "Validar origem e qualidade do lote de sementes/frutos."),
    makeStage("Reservação hídrica", "reservoir", 10, waterAutonomy, "dias de autonomia", "Suprimento de água", "Manter autonomia mínima e sistema filtrado.", true),
    makeStage("Equipe", "staff", staffRequired, Math.max(1, o.staff), "colaboradores", "Capacidade operacional", "Ajustar equipe ou reduzir produção semanal."),
  ];

  const bottleneck = stages.reduce((a,b)=> (b.occupation > a.occupation ? b : a), stages[0]);
  const worstLoss = getLosses({eInitialProduced, tInitialProduced, root, selE, germ, selT, mort});
  const monthly = monthlyProjection(eFinalProjected, tFinalProjected);
  const accumulated = monthly.reduce((acc, row, idx)=>{
    const prev = acc[idx-1] || {meta:0,prod:0};
    acc.push({month:row.month, meta: prev.meta + metaTotal/12, prod: prev.prod + row.total});
    return acc;
  }, []);

  const diagnosis = buildDiagnosis({ s, stages, bottleneck, targetFulfillment, waterAutonomy, staffOccupation, operationalMargin, finalTotal, metaTotal, worstLoss });

  return {
    metaE, metaT, metaTotal,
    successE, successT,
    initialERequired, initialEWithMargin, weeklyEInitial, maxEInitialByPhysical, eInitialProduced, eFinalProjected,
    initialTRequired, initialTWithMargin, cyclesT, teakPositionsPerCycle, teakAnnualInitialCapacity, tInitialProduced, tFinalProjected,
    finalTotal, targetFulfillment,
    waterDaily, waterAutonomy,
    staffRequired, staffOccupation,
    revenueE, revenueT, revenueTotal, costTotal, costPerSeedling, operationalMargin, netBeforeTax, payback,
    stages, bottleneck, losses: worstLoss, monthly, accumulated, diagnosis
  };
}

function makeStage(label, sectorId, demand, capacity, unit, desc, rec, inverse=false){
  let occupation = inverse ? safeDiv(demand, capacity) : safeDiv(demand, capacity);
  // Para água, demanda é autonomia mínima de 10 dias e capacidade é autonomia calculada.
  if(inverse) occupation = capacity > 0 ? demand / capacity : 99;
  const status = occupation <= .8 ? "ok" : occupation <= 1 ? "warn" : "bad";
  return { label, sectorId, demand, capacity, unit, occupation, status, desc, rec };
}

function getLosses(x){
  const eRootLoss = x.eInitialProduced * (1-x.root);
  const eAfterRoot = x.eInitialProduced * x.root;
  const eSelectionLoss = eAfterRoot * (1-x.selE);
  const eAfterSelection = eAfterRoot * x.selE;
  const eMortLoss = eAfterSelection * x.mort;
  const tGermLoss = x.tInitialProduced * (1-x.germ);
  const tAfterGerm = x.tInitialProduced * x.germ;
  const tSelectionLoss = tAfterGerm * (1-x.selT);
  const tAfterSelection = tAfterGerm * x.selT;
  const tMortLoss = tAfterSelection * x.mort;
  const rows = [
    {label:"Não enraizadas — eucalipto", value:eRootLoss, species:"Eucalipto"},
    {label:"Descarte seleção — eucalipto", value:eSelectionLoss, species:"Eucalipto"},
    {label:"Mortalidade operacional — eucalipto", value:eMortLoss, species:"Eucalipto"},
    {label:"Não germinadas — teca", value:tGermLoss, species:"Teca"},
    {label:"Descarte seleção — teca", value:tSelectionLoss, species:"Teca"},
    {label:"Mortalidade operacional — teca", value:tMortLoss, species:"Teca"},
  ];
  return { rows, total: sum(rows.map(r=>r.value)), worst: rows.slice().sort((a,b)=>b.value-a.value)[0] };
}

function monthlyProjection(eFinal, tFinal){
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const eFactors = [0.075,0.075,0.08,0.08,0.08,0.085,0.085,0.09,0.09,0.095,0.095,0.07];
  const tFactors = [0.04,0.02,0.00,0.00,0.00,0.02,0.04,0.08,0.10,0.28,0.32,0.10];
  return months.map((m,idx)=>{
    const e=eFinal*eFactors[idx];
    const t=tFinal*tFactors[idx];
    return {month:m, eucalyptus:e, teak:t, total:e+t};
  });
}

function buildDiagnosis({stages,bottleneck,targetFulfillment,waterAutonomy,staffOccupation,operationalMargin,finalTotal,metaTotal,worstLoss}){
  const recs = [];
  const status = targetFulfillment >= 1 ? "ok" : targetFulfillment >= .9 ? "warn" : "bad";
  const headline = targetFulfillment >= 1
    ? "O cenário cumpre a meta anual projetada."
    : `O cenário cumpre ${formatPercent(targetFulfillment)} da meta anual.`;
  if(bottleneck.status === "bad") recs.push(`O gargalo principal está em ${bottleneck.label}, com ocupação de ${formatPercent(bottleneck.occupation)}. Revise área, permanência ou escalonamento.`);
  else if(bottleneck.status === "warn") recs.push(`${bottleneck.label} opera em atenção, com ocupação de ${formatPercent(bottleneck.occupation)}.`);
  if(waterAutonomy < 7) recs.push(`A autonomia hídrica estimada é baixa (${formatNumber(waterAutonomy,1)} dias). Ampliar reservação ou rever lâmina diária.`);
  if(staffOccupation > 1) recs.push(`A equipe informada está abaixo da necessidade estimada. Ajustar colaboradores ou produtividade operacional.`);
  if(operationalMargin < .1) recs.push(`A margem operacional está baixa. Testar preço, custo e perdas antes de defender viabilidade econômica.`);
  if(worstLoss?.worst) recs.push(`A maior perda estimada ocorre em ${worstLoss.worst.label}. Esse parâmetro deve ser acompanhado por amostragem de lote.`);
  if(!recs.length) recs.push("A estrutura apresenta folga operacional, mas os parâmetros devem ser validados por dados reais de viveiro, cotações e laudos de lotes.");
  return {status, headline, recs, text: `${headline} Produção final projetada: ${formatNumber(finalTotal,0)} mudas para meta de ${formatNumber(metaTotal,0)}. ${recs[0]}`};
}

function sectorStatus(sectorId, calc){
  const stage = calc.stages.find(s=>s.sectorId===sectorId);
  if(stage) return stage;
  if(sectorId === "gh2") return calc.stages.find(s=>s.sectorId==="gh1");
  if(sectorId === "admin") return makeStage("Administração", "admin", 1, 1.15, "", "Gestão documental", "Manter controle técnico e legal.");
  if(sectorId === "shed") return makeStage("Galpão", "shed", .75, 1, "", "Operação de apoio", "Evitar cruzamento de fluxos e perdas por desorganização.");
  if(sectorId === "garden") return makeStage("Minijardim", "garden", .68, 1, "", "Produção de brotações", "Monitorar vigor das minicepas.");
  if(sectorId === "almox") return makeStage("Almoxarifado", "almox", .7, 1, "", "Insumos", "Evitar ruptura de materiais críticos.");
  if(sectorId === "dispatch") return makeStage("Expedição", "dispatch", .82, 1, "", "Carregamento", "Programar expedição com clientes.");
  if(sectorId === "drainage") return makeStage("Drenagem", "drainage", .7, 1, "", "Escoamento", "Manter drenos limpos e piso adequado.");
  return makeStage("Setor", sectorId, 1, 1, "", "", "");
}

function scenarioVariant(base, kind){
  const s = cloneScenario(base, kind);
  if(kind === "Conservador"){
    s.rates.eucalyptusRooting = Math.max(1, base.rates.eucalyptusRooting - 7);
    s.rates.teakGermination = Math.max(1, base.rates.teakGermination - 8);
    s.rates.eucalyptusSelection = Math.max(1, base.rates.eucalyptusSelection - 4);
    s.rates.teakSelection = Math.max(1, base.rates.teakSelection - 4);
    s.rates.generalMortality = Math.min(40, base.rates.generalMortality + 2);
  }
  if(kind === "Otimista"){
    s.rates.eucalyptusRooting = Math.min(99, base.rates.eucalyptusRooting + 5);
    s.rates.teakGermination = Math.min(99, base.rates.teakGermination + 7);
    s.rates.eucalyptusSelection = Math.min(99, base.rates.eucalyptusSelection + 2);
    s.rates.teakSelection = Math.min(99, base.rates.teakSelection + 3);
    s.rates.generalMortality = Math.max(0, base.rates.generalMortality - 1);
  }
  return s;
}

function render(){
  const app = document.getElementById("app");
  const s = activeScenario();
  const calc = calcScenario(s);
  document.body.classList.toggle("presentation-mode", state.presentation);
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(s)}
      ${renderSidebar()}
      <main class="main">
        ${renderPage(s, calc)}
      </main>
    </div>
  `;
  attachEvents();
}

function renderTopbar(s){
  return `<header class="topbar">
    <div class="brand">
      <div class="logo">MT</div>
      <div><h1>MTECa BI</h1><p>Simulação Técnica de Produção de Mudas • painel de capacidade e cenários</p></div>
    </div>
    <div class="top-actions">
      <div class="scenario-chip edit-only"><span>Cenário</span><select data-action="change-scenario">${state.scenarios.map(x=>`<option value="${x.id}" ${x.id===s.id?"selected":""}>${escapeHtml(x.name)}</option>`).join("")}</select></div>
      <button class="btn small" data-action="toggle-presentation">${state.presentation?"Modo simulação":"Modo apresentação"}</button>
      <button class="btn small" data-action="export-json">Exportar JSON</button>
      <button class="btn small primary" data-action="export-report">Relatório MD</button>
    </div>
  </header>`;
}

function renderSidebar(){
  return `<aside class="sidebar">
    <div class="nav-section-label">Relatório BI</div>
    ${NAV.map(([id,label,icon])=>`<button class="nav-btn ${state.activePage===id?"active":""}" data-nav="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join("")}
    <div class="nav-note"><strong>Modelo analítico</strong>O simulador confronta meta desejada, perdas, capacidade instalada e orçamento. A produção possível cai quando há gargalo físico-operacional.</div>
  </aside>`;
}

function renderPage(s, calc){
  const page = state.activePage;
  if(page === "overview") return pageOverview(s, calc);
  if(page === "production") return pageProduction(s, calc);
  if(page === "capacity") return pageCapacity(s, calc);
  if(page === "plant") return pagePlant(s, calc);
  if(page === "trends") return pageTrends(s, calc);
  if(page === "budget") return pageBudget(s, calc);
  if(page === "report") return pageReport(s, calc);
  return pageOverview(s, calc);
}

function pageHeader(title, subtitle, tools=""){
  return `<div class="page-header"><div class="page-title"><h2>${title}</h2><p>${subtitle}</p></div><div class="page-tools">${tools}</div></div>`;
}

function pageOverview(s, calc){
  return `
    ${pageHeader("Visão Geral", "Painel executivo do cenário ativo. A leitura central é produção desejada versus produção possível, com gargalos operacionais e econômicos.", `<span class="badge ${calc.diagnosis.status}">${calc.diagnosis.statusLabel || statusLabel(calc.diagnosis.status)}</span>`)}
    <section class="grid kpis">
      ${kpi("Produção projetada", formatNumber(calc.finalTotal,0), `${formatPercent(calc.targetFulfillment)} da meta`, calc.targetFulfillment >= 1 ? "ok" : calc.targetFulfillment >= .9 ? "warn" : "bad")}
      ${kpi("Gargalo principal", calc.bottleneck.label, `${formatPercent(calc.bottleneck.occupation)} de ocupação`, calc.bottleneck.status)}
      ${kpi("Água/dia", formatNumber(calc.waterDaily,0) + " L", `${formatNumber(calc.waterAutonomy,1)} dias de autonomia`, calc.waterAutonomy >= 10 ? "ok" : calc.waterAutonomy >= 7 ? "warn" : "bad")}
      ${kpi("Margem operacional", formatPercent(calc.operationalMargin), `${formatCurrency(calc.revenueTotal)} receita`, calc.operationalMargin >= .15 ? "ok" : calc.operationalMargin >= .08 ? "warn" : "bad")}
    </section>
    <section class="grid two">
      <div class="card">
        <div class="card-title"><div><h3>Meta x produção possível</h3><p>Confronto entre objetivo final e limite produtivo calculado.</p></div><span class="badge info">Resultado calculado</span></div>
        ${barChart([{label:"Meta", value:calc.metaTotal, color:"#6f7c76"},{label:"Produção possível", value:calc.finalTotal, color:calc.targetFulfillment>=1?"#6e9f71":calc.targetFulfillment>=.9?"#b7924f":"#ac5d4e"}], {height:260, prefix:"", suffix:" mudas"})}
      </div>
      <div class="card">
        <div class="card-title"><div><h3>Diagnóstico automático</h3><p>Leitura sintética do cenário para apresentação e decisão.</p></div></div>
        <div class="diagnostic ${calc.diagnosis.status}"><strong>${calc.diagnosis.headline}</strong><p>${calc.diagnosis.recs.join(" ")}</p></div>
        <div class="table-wrap" style="margin-top:12px">${miniMatrix(calc)}</div>
      </div>
    </section>
    <section class="grid two-even" style="margin-top:14px">
      <div class="card"><div class="card-title"><div><h3>Produção mensal projetada</h3><p>Distribuição operacional estimada por espécie.</p></div></div>${stackedBarChart(calc.monthly.map(r=>({label:r.month, a:r.eucalyptus, b:r.teak})), {aLabel:"Eucalipto", bLabel:"Teca"})}</div>
      <div class="card"><div class="card-title"><div><h3>Capacidade por setor</h3><p>Quanto mais próximo de 100%, menor a folga operacional.</p></div></div>${barChart(calc.stages.map(x=>({label:x.label, value:x.occupation*100, color:statusColor(x.status)})), {height:260, suffix:"%"})}</div>
    </section>
  `;
}

function pageProduction(s, calc){
  return `
    ${pageHeader("Produção", "Tabelas editáveis de metas, perdas e permanência. Esta página mostra a diferença entre demanda inicial e produção possível.", scenarioButtons())}
    <section class="scenario-manager edit-only">
      <div class="card"><div class="card-title"><div><h3>Gerenciar cenários</h3><p>Crie versões para comparar premissas sem perder o cenário base.</p></div></div>${scenarioManager()}</div>
      <div class="card"><div class="card-title"><div><h3>Importar / exportar</h3><p>Use JSON para compartilhar cenários e CSV para planilhas.</p></div></div>${importExportPanel()}</div>
    </section>
    <section class="grid layout-30-70" style="margin-top:14px">
      <div class="card edit-only">
        <div class="card-title"><div><h3>Premissas produtivas</h3><p>Campos principais da simulação.</p></div></div>
        <div class="tabs"><button class="tab-btn active">Produção</button></div>
        ${inputGroup(s, ["production.eucalyptusTarget","production.teakTarget","production.weeks","production.safetyMargin","rates.eucalyptusRooting","rates.eucalyptusSelection","rates.teakGermination","rates.teakSelection","rates.generalMortality","time.greenhouseDays","time.shadeDays","time.rustificationDays","time.teakMonths"])}
      </div>
      <div class="grid">
        <div class="card"><div class="card-title"><div><h3>Demanda inicial versus capacidade física</h3><p>O simulador limita a produção quando a estrutura não suporta a demanda.</p></div></div>${productionTable(calc)}</div>
        <div class="card"><div class="card-title"><div><h3>Perdas estimadas por fase</h3><p>Estimativa derivada das taxas biológicas e produtivas informadas.</p></div></div>${barChart(calc.losses.rows.map(r=>({label:r.label, value:r.value, color:r.species==="Eucalipto"?"#739b72":"#8a735c"})), {height:280, suffix:" mudas"})}</div>
      </div>
    </section>
  `;
}

function pageCapacity(s, calc){
  return `
    ${pageHeader("Capacidade", "Matriz de demanda x capacidade instalada por fase. Aqui aparece o gargalo real do viveiro.", `<span class="badge ${calc.bottleneck.status}">Gargalo: ${calc.bottleneck.label}</span>`)}
    <section class="grid layout-30-70">
      <div class="card edit-only"><div class="card-title"><div><h3>Infraestrutura e operação</h3><p>Altere área, bandejas, canteiros, água e equipe.</p></div></div>${inputGroup(s, ["infra.greenhouse1Area","infra.greenhouse2Area","infra.shadeArea","infra.rustificationArea","infra.teakBedsArea","infra.reservoirLiters","infra.irrigatedArea","infra.irrigationDepth","operation.staff","operation.productivityPerStaff","operation.traysPerM2","operation.cellsPerTray","operation.teakBeds","operation.teakBedLength","operation.teakBedWidth","operation.teakPositionsPerM2"])}</div>
      <div class="card"><div class="card-title"><div><h3>Matriz de capacidade</h3><p>Demanda calculada, capacidade informada e status operacional.</p></div><span class="badge info">Resultado calculado</span></div>${capacityTable(calc)}</div>
    </section>
    <section class="grid two-even" style="margin-top:14px">
      <div class="card"><div class="card-title"><div><h3>Ocupação da infraestrutura</h3><p>Setores acima de 100% indicam gargalo.</p></div></div>${barChart(calc.stages.map(x=>({label:x.label, value:x.occupation*100, color:statusColor(x.status)})), {height:280, suffix:"%"})}</div>
      <div class="card"><div class="card-title"><div><h3>Capacidade por espécie</h3><p>Produção projetada em relação à meta anual.</p></div></div>${barChart([{label:"Eucalipto", value:safeDiv(calc.eFinalProjected, calc.metaE)*100, color:"#739b72"},{label:"Teca", value:safeDiv(calc.tFinalProjected, calc.metaT)*100, color:"#8a735c"}], {height:280, suffix:"% da meta"})}</div>
    </section>
  `;
}

function pagePlant(s, calc){
  const selected = PLANT_SECTORS.find(x=>x.id===state.activePlantSector) || PLANT_SECTORS[0];
  const selectedStage = sectorStatus(selected.id, calc);
  const stageList = state.lotSpecies === "euc" ? EUC_STAGES : TEAK_STAGES;
  state.lotStageIndex = Math.min(state.lotStageIndex, stageList.length-1);
  const tokenSector = PLANT_SECTORS.find(x=>x.id===stageList[state.lotStageIndex]) || selected;
  return `
    ${pageHeader("Planta Operacional", "Planta em blocos com resposta à ocupação calculada. Use o simulador de lote para percorrer as etapas e visualizar atividades, riscos e indicadores.", `<span class="badge info">Setor ativo: ${selected.label}</span>`)}
    <section class="plan-wrap">
      <div class="nursery-plan">
        <div class="plan-road" style="left:2%;top:52%;width:96%;height:4%"></div>
        ${PLANT_SECTORS.map(sec=>renderSector(sec, calc)).join("")}
        <div class="stage-token" title="Lote em simulação" style="left:${tokenSector.x + tokenSector.w/2}%;top:${tokenSector.y + tokenSector.h/2}%">●</div>
      </div>
      <aside class="grid">
        <div class="card edit-only">
          <div class="card-title"><div><h3>Simular etapa do lote</h3><p>Move o marcador pela planta e mostra o que fazer em cada fase.</p></div></div>
          <div class="field"><label>Espécie</label><select data-action="change-lot-species"><option value="euc" ${state.lotSpecies==="euc"?"selected":""}>Eucalyptus urophylla</option><option value="teak" ${state.lotSpecies==="teak"?"selected":""}>Tectona grandis</option></select></div>
          <div class="field"><label>Etapa</label><input type="range" min="0" max="${stageList.length-1}" value="${state.lotStageIndex}" data-action="change-lot-stage"></div>
          <div class="stage-flow">${stageList.map((id,idx)=>`<button class="stage-pill ${idx===state.lotStageIndex?"active":""}" data-stage-index="${idx}">${PLANT_SECTORS.find(s=>s.id===id)?.stage || id}</button>`).join("")}</div>
        </div>
        <div class="card">
          <div class="card-title"><div><h3>${selected.label}</h3><p>${selected.stage}</p></div><span class="badge ${selectedStage.status}">${statusLabel(selectedStage.status)}</span></div>
          ${sectorPanel(selected, selectedStage, s)}
        </div>
        <div class="card"><div class="card-title"><div><h3>Etapa simulada</h3><p>${tokenSector.label}</p></div></div>${sectorPanel(tokenSector, sectorStatus(tokenSector.id, calc), s, true)}</div>
      </aside>
    </section>
  `;
}

function pageTrends(s, calc){
  const cons = calcScenario(scenarioVariant(s, "Conservador"));
  const opt = calcScenario(scenarioVariant(s, "Otimista"));
  const compare = [
    {label:"Conservador", value:cons.finalTotal, color:"#b7924f"},
    {label:"Base", value:calc.finalTotal, color:"#739b72"},
    {label:"Otimista", value:opt.finalTotal, color:"#8fb893"},
    {label:"Meta", value:calc.metaTotal, color:"#6f7c76"},
  ];
  return `
    ${pageHeader("Tendências", "Visualizações de evolução mensal, acumulado, perdas e cenários. A lógica segue uma leitura tipo BI: tendência, comparação e variação.")}
    <section class="grid two-even">
      <div class="card"><div class="card-title"><div><h3>Produção mensal por espécie</h3><p>Eucalipto contínuo; teca concentrada na janela de expedição.</p></div></div>${stackedBarChart(calc.monthly.map(r=>({label:r.month, a:r.eucalyptus, b:r.teak})), {aLabel:"Eucalipto", bLabel:"Teca"})}</div>
      <div class="card"><div class="card-title"><div><h3>Meta acumulada x produção acumulada</h3><p>Mostra se a tendência acompanha a meta anual.</p></div></div>${lineChart([{name:"Meta", color:"#6f7c76", data:calc.accumulated.map(r=>({label:r.month,value:r.meta}))},{name:"Produção", color:"#739b72", data:calc.accumulated.map(r=>({label:r.month,value:r.prod}))}], {height:280})}</div>
    </section>
    <section class="grid two-even" style="margin-top:14px">
      <div class="card"><div class="card-title"><div><h3>Cenários comparados</h3><p>Variação baseada em taxas conservadoras e otimistas.</p></div></div>${barChart(compare, {height:280, suffix:" mudas"})}</div>
      <div class="card"><div class="card-title"><div><h3>Perdas por fase</h3><p>Fases com maior perda devem virar prioridade de monitoramento.</p></div></div>${barChart(calc.losses.rows.map(r=>({label:r.label, value:r.value, color:r.species==="Eucalipto"?"#739b72":"#8a735c"})), {height:280, suffix:" mudas"})}</div>
    </section>
    <section class="card" style="margin-top:14px"><div class="card-title"><div><h3>Cronograma operacional</h3><p>Filtro por linha produtiva e atividades transversais.</p></div></div>${calendarPanel(calc)}</section>
  `;
}

function pageBudget(s, calc){
  const sensPrice = calcSensitivity(s, "priceDown");
  const sensCost = calcSensitivity(s, "costUp");
  const sensLoss = calcSensitivity(s, "lossUp");
  return `
    ${pageHeader("Orçamento", "Simulação econômica sintética: investimento, custeio, receita, margem e sensibilidade.", `<span class="badge ${calc.operationalMargin>=.15?"ok":calc.operationalMargin>=.08?"warn":"bad"}">Margem ${formatPercent(calc.operationalMargin)}</span>`)}
    <section class="grid layout-30-70">
      <div class="card edit-only"><div class="card-title"><div><h3>Premissas econômicas</h3><p>Campos usados no cálculo de receita, custo e retorno.</p></div></div>${inputGroup(s, ["finance.investment","finance.opex","finance.eucalyptusPrice","finance.teakPrice","finance.depreciation","finance.contingency"])}</div>
      <div class="grid">
        <section class="grid kpis">
          ${kpi("Receita projetada", formatCurrency(calc.revenueTotal), `${formatCurrency(calc.revenueE)} euc. • ${formatCurrency(calc.revenueT)} teca`, "ok")}
          ${kpi("Custo médio", formatCurrency(calc.costPerSeedling), "por muda projetada", calc.costPerSeedling <= 1.1 ? "ok" : "warn")}
          ${kpi("Margem", formatPercent(calc.operationalMargin), `OPEX ${formatCurrency(s.finance.opex)}`, calc.operationalMargin>=.15?"ok":calc.operationalMargin>=.08?"warn":"bad")}
          ${kpi("Payback simples", Number.isFinite(calc.payback)?formatNumber(calc.payback,1)+" anos":"sem retorno", "antes de impostos e amortizações", Number.isFinite(calc.payback) && calc.payback<=8?"ok":Number.isFinite(calc.payback)?"warn":"bad")}
        </section>
        <div class="card"><div class="card-title"><div><h3>Receita por espécie</h3><p>Resultado calculado pela produção possível e preço informado.</p></div></div>${barChart([{label:"Eucalipto", value:calc.revenueE, color:"#739b72"},{label:"Teca", value:calc.revenueT, color:"#8a735c"}], {height:240, prefix:"R$ "})}</div>
      </div>
    </section>
    <section class="grid two-even" style="margin-top:14px">
      <div class="card"><div class="card-title"><div><h3>Sensibilidade</h3><p>Teste rápido de robustez econômica e operacional.</p></div></div>${sensitivityTable(calc, sensPrice, sensCost, sensLoss)}</div>
      <div class="card"><div class="card-title"><div><h3>Estrutura de custo e receita</h3><p>Visão agregada do cenário ativo.</p></div></div>${barChart([{label:"Receita", value:calc.revenueTotal, color:"#739b72"},{label:"OPEX", value:s.finance.opex, color:"#b7924f"},{label:"Depreciação", value:s.finance.depreciation, color:"#76919a"},{label:"Investimento", value:s.finance.investment, color:"#8a735c"}], {height:280, prefix:"R$ "})}</div>
    </section>
  `;
}

function pageReport(s, calc){
  const report = makeReport(s, calc);
  return `
    ${pageHeader("Relatório Executivo", "Resumo automático do cenário ativo, pronto para copiar, exportar ou adaptar ao trabalho escrito.", `<button class="btn small primary" data-action="copy-report">Copiar relatório</button><button class="btn small" data-action="export-report">Baixar Markdown</button>`)}
    <section class="grid layout-70-30">
      <div class="report-box" id="reportBox">${escapeHtml(report)}</div>
      <aside class="grid">
        <div class="card"><div class="card-title"><div><h3>Alertas de interpretação</h3><p>Cuidados metodológicos.</p></div></div>
          <p class="td-muted">O simulador é uma ferramenta de apoio ao raciocínio técnico-operacional. Não substitui orçamento executivo, responsável técnico, laudos de sementes, levantamento topográfico ou projeto hidráulico.</p>
        </div>
        <div class="card"><div class="card-title"><div><h3>Resumo dos dados</h3><p>Itens calculados no cenário ativo.</p></div></div>${miniMatrix(calc)}</div>
      </aside>
    </section>
  `;
}

function scenarioButtons(){
  return `<button class="btn small primary edit-only" data-action="new-scenario">Novo cenário</button><button class="btn small edit-only" data-action="duplicate-scenario">Duplicar</button><button class="btn small danger edit-only" data-action="delete-scenario">Excluir</button>`;
}

function scenarioManager(){
  const s = activeScenario();
  return `<div class="field"><label>Nome do cenário ativo</label><input data-bind="name" value="${escapeAttr(s.name)}"></div>
    <div class="action-row">
      <button class="btn small primary" data-action="new-scenario">Novo</button>
      <button class="btn small" data-action="duplicate-scenario">Duplicar</button>
      <button class="btn small" data-action="reset-active">Restaurar base</button>
      <button class="btn small danger" data-action="delete-scenario">Excluir</button>
    </div>
    <p class="footer-note">Os cenários são salvos automaticamente no navegador.</p>`;
}
function importExportPanel(){
  return `<div class="action-row">
      <button class="btn small" data-action="export-json">Exportar JSON</button>
      <button class="btn small" data-action="export-csv">Exportar CSV</button>
      <label class="btn small" for="importFile">Importar JSON</label><input id="importFile" type="file" accept="application/json,.json" class="hidden" data-action="import-json" />
    </div>
    <p class="footer-note">Use JSON para reabrir cenários e CSV para analisar em planilhas.</p>`;
}

function kpi(label,value,sub,status="neutral"){
  return `<div class="card kpi-card status-${status}"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-delta">${statusLabel(status)}</div><div class="kpi-sub">${sub}</div></div>`;
}
function statusLabel(status){ return status === "ok" ? "Adequado" : status === "warn" ? "Atenção" : status === "bad" ? "Crítico" : "Neutro"; }
function statusColor(status){ return status === "ok" ? "#6e9f71" : status === "warn" ? "#b7924f" : status === "bad" ? "#ac5d4e" : "#76919a"; }

function inputGroup(s, paths){
  return `<div class="input-grid">${paths.map(path=>{
    const meta = FIELD_META[path] || [path,"",""];
    const value = getPath(s,path);
    const step = meta[1].includes("%") || meta[1].includes("R$/") || meta[1].includes("band") ? "0.1" : "1";
    return `<div class="input-row"><div class="input-label"><strong>${meta[0]}</strong><span>${meta[2]}</span></div><input type="number" step="${step}" data-bind="${path}" value="${Number(value)}"><span class="unit">${meta[1]}</span></div>`;
  }).join("")}</div>`;
}

function miniMatrix(calc){
  return `<table><tbody>
    <tr><td class="td-muted">Meta anual</td><td class="td-right">${formatNumber(calc.metaTotal,0)} mudas</td></tr>
    <tr><td class="td-muted">Produção possível</td><td class="td-right">${formatNumber(calc.finalTotal,0)} mudas</td></tr>
    <tr><td class="td-muted">Cumprimento</td><td class="td-right">${formatPercent(calc.targetFulfillment)}</td></tr>
    <tr><td class="td-muted">Perdas estimadas</td><td class="td-right">${formatNumber(calc.losses.total,0)} mudas</td></tr>
    <tr><td class="td-muted">Custo médio</td><td class="td-right">${formatCurrency(calc.costPerSeedling)}/muda</td></tr>
    <tr><td class="td-muted">Payback simples</td><td class="td-right">${Number.isFinite(calc.payback)?formatNumber(calc.payback,1)+" anos":"sem retorno"}</td></tr>
  </tbody></table>`;
}

function productionTable(calc){
  return `<div class="table-wrap"><table>
    <thead><tr><th>Linha</th><th class="td-right">Meta final</th><th class="td-right">Demanda inicial c/ margem</th><th class="td-right">Capacidade inicial</th><th class="td-right">Produção possível</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>Eucalyptus urophylla</td><td class="td-right">${formatNumber(calc.metaE,0)}</td><td class="td-right">${formatNumber(calc.initialEWithMargin,0)} miniestacas</td><td class="td-right">${formatNumber(calc.maxEInitialByPhysical,0)}</td><td class="td-right">${formatNumber(calc.eFinalProjected,0)}</td><td>${badge(calc.eFinalProjected>=calc.metaE?"ok":"bad", calc.eFinalProjected>=calc.metaE?"Cumpre":"Não cumpre")}</td></tr>
      <tr><td>Tectona grandis</td><td class="td-right">${formatNumber(calc.metaT,0)}</td><td class="td-right">${formatNumber(calc.initialTWithMargin,0)} sementes/frutos</td><td class="td-right">${formatNumber(calc.teakAnnualInitialCapacity,0)}</td><td class="td-right">${formatNumber(calc.tFinalProjected,0)}</td><td>${badge(calc.tFinalProjected>=calc.metaT?"ok":"bad", calc.tFinalProjected>=calc.metaT?"Cumpre":"Não cumpre")}</td></tr>
    </tbody>
  </table></div>`;
}

function capacityTable(calc){
  return `<div class="table-wrap"><table>
    <thead><tr><th>Setor</th><th>Descrição</th><th class="td-right">Demanda</th><th class="td-right">Capacidade</th><th>Ocupação</th><th>Status</th></tr></thead>
    <tbody>${calc.stages.map(x=>`<tr><td>${x.label}</td><td class="td-muted">${x.desc}</td><td class="td-right">${formatNumber(x.demand,1)} ${x.unit}</td><td class="td-right">${formatNumber(x.capacity,1)} ${x.unit}</td><td><div class="capacity-bar"><div class="capacity-fill ${x.status}" style="width:${Math.min(160,x.occupation*100)}%"></div></div><span class="td-muted">${formatPercent(x.occupation)}</span></td><td>${badge(x.status,statusLabel(x.status))}</td></tr>`).join("")}</tbody>
  </table></div>`;
}

function sensitivityTable(calc, price, cost, loss){
  return `<div class="table-wrap"><table><thead><tr><th>Teste</th><th class="td-right">Produção</th><th class="td-right">Receita</th><th class="td-right">Margem</th><th>Status</th></tr></thead><tbody>
    <tr><td>Cenário atual</td><td class="td-right">${formatNumber(calc.finalTotal,0)}</td><td class="td-right">${formatCurrency(calc.revenueTotal)}</td><td class="td-right">${formatPercent(calc.operationalMargin)}</td><td>${badge(calc.operationalMargin>=.15?"ok":calc.operationalMargin>=.08?"warn":"bad", statusLabel(calc.operationalMargin>=.15?"ok":calc.operationalMargin>=.08?"warn":"bad"))}</td></tr>
    <tr><td>Preço -10%</td><td class="td-right">${formatNumber(price.finalTotal,0)}</td><td class="td-right">${formatCurrency(price.revenueTotal)}</td><td class="td-right">${formatPercent(price.operationalMargin)}</td><td>${badge(price.operationalMargin>=.15?"ok":price.operationalMargin>=.08?"warn":"bad", statusLabel(price.operationalMargin>=.15?"ok":price.operationalMargin>=.08?"warn":"bad"))}</td></tr>
    <tr><td>Custo +10%</td><td class="td-right">${formatNumber(cost.finalTotal,0)}</td><td class="td-right">${formatCurrency(cost.revenueTotal)}</td><td class="td-right">${formatPercent(cost.operationalMargin)}</td><td>${badge(cost.operationalMargin>=.15?"ok":cost.operationalMargin>=.08?"warn":"bad", statusLabel(cost.operationalMargin>=.15?"ok":cost.operationalMargin>=.08?"warn":"bad"))}</td></tr>
    <tr><td>Perdas +10 p.p.</td><td class="td-right">${formatNumber(loss.finalTotal,0)}</td><td class="td-right">${formatCurrency(loss.revenueTotal)}</td><td class="td-right">${formatPercent(loss.operationalMargin)}</td><td>${badge(loss.targetFulfillment>=1?"ok":loss.targetFulfillment>=.9?"warn":"bad", formatPercent(loss.targetFulfillment))}</td></tr>
  </tbody></table></div>`;
}

function calcSensitivity(s, type){
  const c = cloneScenario(s, "sens");
  if(type === "priceDown"){ c.finance.eucalyptusPrice *= .9; c.finance.teakPrice *= .9; }
  if(type === "costUp"){ c.finance.opex *= 1.1; }
  if(type === "lossUp"){
    c.rates.eucalyptusRooting = Math.max(1, c.rates.eucalyptusRooting - 10);
    c.rates.teakGermination = Math.max(1, c.rates.teakGermination - 10);
    c.rates.eucalyptusSelection = Math.max(1, c.rates.eucalyptusSelection - 5);
    c.rates.teakSelection = Math.max(1, c.rates.teakSelection - 5);
  }
  return calcScenario(c);
}

function badge(status, text){ return `<span class="badge ${status}">${text}</span>`; }

function renderSector(sec, calc){
  const st = sectorStatus(sec.id, calc);
  const value = FIELD_META[sec.field]?.[1] === "L" ? formatNumber(getPath(activeScenario(), sec.field),0)+" L" : FIELD_META[sec.field]?.[1] === "dias" ? getPath(activeScenario(), sec.field)+" d" : formatNumber(getPath(activeScenario(), sec.field),0)+" m²";
  return `<button class="plan-sector ${st.status} ${state.activePlantSector===sec.id?"active":""}" data-sector="${sec.id}" style="left:${sec.x}%;top:${sec.y}%;width:${sec.w}%;height:${sec.h}%">
    <div><h4>${sec.label}</h4><small>${sec.stage}</small></div><div><div class="sector-value">${value}</div><small>${formatPercent(st.occupation)} ocupação</small></div>
  </button>`;
}

function sectorPanel(sec, st, s, brief=false){
  const raw = getPath(s, sec.field);
  const unit = FIELD_META[sec.field]?.[1] || "";
  return `<div class="grid" style="gap:10px">
    <div>${badge(st.status,statusLabel(st.status))} ${badge("info", brief?"Etapa do lote":"Setor selecionado")}</div>
    <table><tbody>
      <tr><td class="td-muted">Área/parâmetro</td><td class="td-right">${formatNumber(raw, unit.includes("R$")?2:unit==="L"?0:1)} ${unit}</td></tr>
      <tr><td class="td-muted">Ocupação</td><td class="td-right">${formatPercent(st.occupation)}</td></tr>
      <tr><td class="td-muted">Indicador</td><td class="td-right">${sec.indicator}</td></tr>
      <tr><td class="td-muted">Risco</td><td class="td-right">${sec.risk}</td></tr>
    </tbody></table>
    <div class="diagnostic ${st.status}"><strong>O que fazer</strong><p>${sec.rec || st.rec}</p></div>
  </div>`;
}

function calendarPanel(calc){
  const f = state.calendarFilter;
  return `<div class="filterbar edit-only"><div class="field"><label>Filtro</label><select data-action="calendar-filter"><option value="all" ${f==="all"?"selected":""}>Todos</option><option value="euc" ${f==="euc"?"selected":""}>Eucalyptus urophylla</option><option value="teak" ${f==="teak"?"selected":""}>Tectona grandis</option><option value="trans" ${f==="trans"?"selected":""}>Transversais</option></select></div></div>
  <div class="table-wrap"><table><thead><tr><th>Mês</th>${f==="all"||f==="euc"?"<th>Eucalipto</th>":""}${f==="all"||f==="teak"?"<th>Teca</th>":""}${f==="all"||f==="trans"?"<th>Transversais</th>":""}<th class="td-right">Produção proj.</th></tr></thead><tbody>
    ${CALENDAR.map((row,idx)=>`<tr><td>${row.m}</td>${f==="all"||f==="euc"?`<td>${row.euc}</td>`:""}${f==="all"||f==="teak"?`<td>${row.teak}</td>`:""}${f==="all"||f==="trans"?`<td>${row.trans}</td>`:""}<td class="td-right">${formatNumber(calc.monthly[idx].total,0)}</td></tr>`).join("")}
  </tbody></table></div>`;
}

function makeReport(s, calc){
  const rows = calc.stages.map(x=>`- ${x.label}: ${formatPercent(x.occupation)} (${statusLabel(x.status)})`).join("\n");
  const recs = calc.diagnosis.recs.map(x=>`- ${x}`).join("\n");
  return `# MTECa BI — Relatório Executivo do Cenário

## 1. Cenário ativo
**Nome:** ${s.name}
**Local de referência:** Cáceres-MT
**Sistema produtivo:** mudas clonais de Eucalyptus urophylla e mudas seminais de Tectona grandis.

## 2. Metas e produção possível
- Meta anual de Eucalyptus urophylla: ${formatNumber(calc.metaE,0)} mudas.
- Meta anual de Tectona grandis: ${formatNumber(calc.metaT,0)} mudas.
- Meta anual total: ${formatNumber(calc.metaTotal,0)} mudas.
- Produção final projetada: ${formatNumber(calc.finalTotal,0)} mudas.
- Cumprimento da meta: ${formatPercent(calc.targetFulfillment)}.

## 3. Demanda inicial estimada
- Miniestacas de eucalipto necessárias com margem: ${formatNumber(calc.initialEWithMargin,0)}.
- Miniestacas semanais: ${formatNumber(calc.weeklyEInitial,0)}.
- Sementes/frutos de teca necessários com margem: ${formatNumber(calc.initialTWithMargin,0)}.

## 4. Gargalos e capacidade
**Gargalo principal:** ${calc.bottleneck.label}, com ocupação de ${formatPercent(calc.bottleneck.occupation)}.

${rows}

## 5. Água, equipe e orçamento
- Consumo hídrico diário estimado: ${formatNumber(calc.waterDaily,0)} L/dia.
- Autonomia hídrica: ${formatNumber(calc.waterAutonomy,1)} dias.
- Equipe informada: ${s.operation.staff} colaboradores.
- Equipe mínima estimada: ${calc.staffRequired} colaboradores.
- Receita projetada: ${formatCurrency(calc.revenueTotal)}.
- Custeio anual: ${formatCurrency(s.finance.opex)}.
- Custo médio por muda: ${formatCurrency(calc.costPerSeedling)}.
- Margem operacional: ${formatPercent(calc.operationalMargin)}.
- Payback simples: ${Number.isFinite(calc.payback)?formatNumber(calc.payback,1)+" anos":"sem retorno operacional"}.

## 6. Diagnóstico técnico
${calc.diagnosis.text}

## 7. Recomendações automáticas
${recs}

## 8. Observação metodológica
Os resultados dependem das premissas adotadas. Taxas de germinação, enraizamento, descarte, custos, preços e capacidade operacional devem ser validados por dados reais de viveiro, laudos de sementes/frutos, cotações e responsável técnico.`;
}

function barChart(data, opts={}){
  const height = opts.height || 260;
  const width = 760;
  const pad = {l:60,r:20,t:20,b:62};
  const max = Math.max(...data.map(d=>Number(d.value)||0), 1) * 1.12;
  const bw = (width-pad.l-pad.r) / data.length * .62;
  const gap = (width-pad.l-pad.r) / data.length;
  const fmt = opts.prefix ? v=>opts.prefix+compact(v) : opts.suffix?.includes("%") ? v=>formatNumber(v,0)+"%" : v=>compact(v);
  const bars = data.map((d,idx)=>{
    const x = pad.l + gap*idx + (gap-bw)/2;
    const h = (height-pad.t-pad.b) * safeDiv(d.value,max);
    const y = height-pad.b-h;
    return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="6" fill="${d.color||"#739b72"}"></rect><text class="value-label" x="${x+bw/2}" y="${Math.max(14,y-6)}" text-anchor="middle">${fmt(d.value)}</text><text x="${x+bw/2}" y="${height-36}" text-anchor="middle">${splitLabel(d.label,12,0)}</text><text x="${x+bw/2}" y="${height-20}" text-anchor="middle">${splitLabel(d.label,12,1)}</text>`;
  }).join("");
  const grid = [0,.25,.5,.75,1].map(fr=>`<line class="gridline" x1="${pad.l}" x2="${width-pad.r}" y1="${height-pad.b-(height-pad.t-pad.b)*fr}" y2="${height-pad.b-(height-pad.t-pad.b)*fr}"></line>`).join("");
  return `<div class="chart" style="height:${height}px"><svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${grid}<line class="axis" x1="${pad.l}" x2="${width-pad.r}" y1="${height-pad.b}" y2="${height-pad.b}"></line>${bars}</svg></div>`;
}

function stackedBarChart(data, opts={}){
  const height = 280, width = 760, pad={l:56,r:18,t:18,b:50};
  const max = Math.max(...data.map(d=>d.a+d.b),1)*1.12;
  const bw=(width-pad.l-pad.r)/data.length*.55, gap=(width-pad.l-pad.r)/data.length;
  const bars=data.map((d,idx)=>{
    const x=pad.l+idx*gap+(gap-bw)/2;
    const ha=(height-pad.t-pad.b)*safeDiv(d.a,max), hb=(height-pad.t-pad.b)*safeDiv(d.b,max);
    const ya=height-pad.b-ha, yb=ya-hb;
    return `<rect x="${x}" y="${ya}" width="${bw}" height="${ha}" rx="4" fill="#739b72"></rect><rect x="${x}" y="${yb}" width="${bw}" height="${hb}" rx="4" fill="#8a735c"></rect><text x="${x+bw/2}" y="${height-25}" text-anchor="middle">${d.label}</text>`;
  }).join("");
  const grid=[0,.25,.5,.75,1].map(fr=>`<line class="gridline" x1="${pad.l}" x2="${width-pad.r}" y1="${height-pad.b-(height-pad.t-pad.b)*fr}" y2="${height-pad.b-(height-pad.t-pad.b)*fr}"></line>`).join("");
  return `<div class="chart"><svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${grid}<line class="axis" x1="${pad.l}" x2="${width-pad.r}" y1="${height-pad.b}" y2="${height-pad.b}"></line>${bars}</svg></div><div class="legend"><span><i style="background:#739b72"></i>${opts.aLabel||"Série A"}</span><span><i style="background:#8a735c"></i>${opts.bLabel||"Série B"}</span></div>`;
}

function lineChart(series, opts={}){
  const height=opts.height||280, width=760, pad={l:58,r:20,t:20,b:45};
  const all=series.flatMap(s=>s.data.map(d=>d.value));
  const max=Math.max(...all,1)*1.08;
  const n=series[0].data.length;
  const x=(idx)=>pad.l + idx*(width-pad.l-pad.r)/(n-1);
  const y=(v)=>height-pad.b - (height-pad.t-pad.b)*safeDiv(v,max);
  const grid=[0,.25,.5,.75,1].map(fr=>`<line class="gridline" x1="${pad.l}" x2="${width-pad.r}" y1="${height-pad.b-(height-pad.t-pad.b)*fr}" y2="${height-pad.b-(height-pad.t-pad.b)*fr}"></line>`).join("");
  const paths=series.map(s=>{
    const d=s.data.map((p,idx)=>`${idx===0?"M":"L"}${x(idx)},${y(p.value)}`).join(" ");
    const points=s.data.map((p,idx)=>`<circle cx="${x(idx)}" cy="${y(p.value)}" r="3" fill="${s.color}"></circle>`).join("");
    return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${points}`;
  }).join("");
  const labels=series[0].data.map((p,idx)=>`<text x="${x(idx)}" y="${height-22}" text-anchor="middle">${p.label}</text>`).join("");
  const legend=`<div class="legend">${series.map(s=>`<span><i style="background:${s.color}"></i>${s.name}</span>`).join("")}</div>`;
  return `<div class="chart" style="height:${height}px"><svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${grid}<line class="axis" x1="${pad.l}" x2="${width-pad.r}" y1="${height-pad.b}" y2="${height-pad.b}"></line>${paths}${labels}</svg></div>${legend}`;
}

function splitLabel(label, len, line){
  const words=String(label).split(" "); let lines=[""]; words.forEach(w=>{ if((lines.at(-1)+" "+w).trim().length>len) lines.push(w); else lines[lines.length-1]=(lines.at(-1)+" "+w).trim(); }); return escapeHtml(lines[line]||"");
}
function compact(v){
  v=Number(v)||0;
  if(Math.abs(v)>=1000000) return formatNumber(v/1000000,1)+" mi";
  if(Math.abs(v)>=1000) return formatNumber(v/1000,0)+" mil";
  return formatNumber(v,0);
}
function formatNumber(v,d=0){ return new Intl.NumberFormat("pt-BR",{maximumFractionDigits:d,minimumFractionDigits:d}).format(Number.isFinite(v)?v:0); }
function formatCurrency(v){ return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:2}).format(Number.isFinite(v)?v:0); }
function formatPercent(v){ return new Intl.NumberFormat("pt-BR",{style:"percent",maximumFractionDigits:1}).format(Number.isFinite(v)?v:0); }
function escapeHtml(str){ return String(str).replace(/[&<>'"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }
function escapeAttr(str){ return escapeHtml(str).replace(/"/g,"&quot;"); }

function attachEvents(){
  document.querySelectorAll("[data-nav]").forEach(btn=>btn.addEventListener("click",()=>{ state.activePage=btn.dataset.nav; saveState(); render(); }));
  document.querySelectorAll("[data-bind]").forEach(el=>{
    el.addEventListener("change", handleBind);
    el.addEventListener("input", handleBind);
  });
  document.querySelectorAll("[data-action]").forEach(el=>{
    const action=el.dataset.action;
    if(action==="change-scenario") el.addEventListener("change", e=>{ state.activeScenarioId=e.target.value; saveState(); render(); });
    if(action==="toggle-presentation") el.addEventListener("click", ()=>{ state.presentation=!state.presentation; saveState(); render(); });
    if(action==="new-scenario") el.addEventListener("click", newScenario);
    if(action==="duplicate-scenario") el.addEventListener("click", duplicateScenario);
    if(action==="delete-scenario") el.addEventListener("click", deleteScenario);
    if(action==="reset-active") el.addEventListener("click", resetActive);
    if(action==="export-json") el.addEventListener("click", exportJson);
    if(action==="export-csv") el.addEventListener("click", exportCsv);
    if(action==="export-report") el.addEventListener("click", exportReport);
    if(action==="copy-report") el.addEventListener("click", copyReport);
    if(action==="import-json") el.addEventListener("change", importJson);
    if(action==="change-lot-species") el.addEventListener("change", e=>{ state.lotSpecies=e.target.value; state.lotStageIndex=0; saveState(); render(); });
    if(action==="change-lot-stage") el.addEventListener("input", e=>{ state.lotStageIndex=Number(e.target.value); saveState(); render(); });
    if(action==="calendar-filter") el.addEventListener("change", e=>{ state.calendarFilter=e.target.value; saveState(); render(); });
  });
  document.querySelectorAll("[data-sector]").forEach(el=>el.addEventListener("click",()=>{ state.activePlantSector=el.dataset.sector; saveState(); render(); }));
  document.querySelectorAll("[data-stage-index]").forEach(el=>el.addEventListener("click",()=>{ state.lotStageIndex=Number(el.dataset.stageIndex); saveState(); render(); }));
}

function handleBind(e){
  const s = activeScenario();
  const path = e.target.dataset.bind;
  let val = e.target.value;
  if(path !== "name") val = Number(val);
  setPath(s, path, val);
  saveState();
  if(e.type === "change" || path === "name") render();
}
function newScenario(){ const n=createDefaultScenario("Novo cenário"); state.scenarios.push(n); state.activeScenarioId=n.id; saveState(); render(); }
function duplicateScenario(){ const n=cloneScenario(activeScenario(), activeScenario().name+" — cópia"); state.scenarios.push(n); state.activeScenarioId=n.id; saveState(); render(); }
function deleteScenario(){ if(state.scenarios.length<=1){alert("Mantenha ao menos um cenário.");return;} const id=state.activeScenarioId; state.scenarios=state.scenarios.filter(s=>s.id!==id); state.activeScenarioId=state.scenarios[0].id; saveState(); render(); }
function resetActive(){ const idx=state.scenarios.findIndex(s=>s.id===state.activeScenarioId); const base=createDefaultScenario("Base — projeto técnico"); base.id=state.activeScenarioId; state.scenarios[idx]=base; saveState(); render(); }

function exportJson(){ download("mteca-cenarios.json", JSON.stringify(state.scenarios,null,2), "application/json"); }
function exportCsv(){
  const rows=[["cenario","meta_total","producao_projetada","cumprimento","gargalo","ocupacao_gargalo","receita","margem","agua_dia","autonomia_dias"]];
  state.scenarios.forEach(s=>{ const c=calcScenario(s); rows.push([s.name,c.metaTotal,c.finalTotal,c.targetFulfillment,c.bottleneck.label,c.bottleneck.occupation,c.revenueTotal,c.operationalMargin,c.waterDaily,c.waterAutonomy]); });
  download("mteca-cenarios.csv", rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(";")).join("\n"), "text/csv;charset=utf-8");
}
function exportReport(){ const s=activeScenario(); download("mteca-relatorio-executivo.md", makeReport(s, calcScenario(s)), "text/markdown;charset=utf-8"); }
function copyReport(){ navigator.clipboard?.writeText(makeReport(activeScenario(), calcScenario(activeScenario()))); alert("Relatório copiado."); }
function importJson(e){
  const file=e.target.files?.[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{ try{ const arr=JSON.parse(reader.result); if(!Array.isArray(arr)) throw new Error("JSON inválido"); state.scenarios=arr.map(x=>({...createDefaultScenario(),...x,id:x.id||cryptoId()})); state.activeScenarioId=state.scenarios[0].id; saveState(); render(); }catch(err){ alert("Não foi possível importar: "+err.message); } };
  reader.readAsText(file);
}
function download(filename, content, type){ const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=filename; a.click(); URL.revokeObjectURL(a.href); }

render();
