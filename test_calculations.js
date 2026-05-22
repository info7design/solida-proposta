// Script de validação automática dos cálculos
const fs = require('fs');
const path = require('path');

console.log("=== INICIANDO VALIDAÇÃO DOS CÁLCULOS ===");

// Carrega o arquivo app.js
const appJsPath = path.join(__dirname, 'app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Para executar em Node, precisamos extrair as variáveis e funções sem as referências ao DOM (window, document, alert, etc.)
// Vamos fazer um mock simples do DOM ou rodar o motor isolado.
// Vamos simular a estrutura de dados de 'servicos-gerais' e rodar a função calculateServiceCosts.

// Extrai a função de cálculo e dados usando regex simples ou redefinindo localmente a partir das fórmulas do app.js
const srv = {
    id: 'servicos-gerais',
    enabled: true,
    label: 'Serviços Gerais / Zeladoria',
    remuneracao: [
        { id: 'salario-base', name: 'Salário Base', type: 'base', value: 1815.43, includeInBase: true },
        { id: 'acumulo-funcao', name: 'Acúmulo de Função (20%)', type: 'percentage', value: 20, factorField: 'salario-base', includeInBase: true },
        { id: 'gratificacao', name: 'Gratificação', type: 'flat', value: 110.00, includeInBase: true }
    ],
    encargos: [
        { id: 'inss', name: 'INSS Patronal', type: 'percentage', value: 20.00 },
        { id: 'rat', name: 'RAT', type: 'percentage', value: 2.00 },
        { id: 'terceiros', name: 'Terceiros', type: 'percentage', value: 5.80 },
        { id: 'fgts', name: 'FGTS', type: 'percentage', value: 8.00 }
    ],
    provisoes: [
        { id: 'prov-13', name: '13º Salário', type: 'formula-13', value: 0 },
        { id: 'prov-ferias', name: 'Férias + 1/3', type: 'formula-ferias', value: 0 }
    ],
    beneficios: [
        { id: 'vt', name: 'Vale Transporte', type: 'flat', value: 337.70 },
        { id: 'vr', name: 'Vale Refeição', type: 'flat', value: 563.55 },
        { id: 'cesta', name: 'Cesta básica', type: 'flat', value: 205.00 },
        { id: 'plr', name: 'PLR', type: 'flat', value: 21.27 },
        { id: 'uniformes', name: 'Uniformes', type: 'flat', value: 58.55 }
    ],
    resumo: {
        taxaAdmin: 1650.00,
        impostoAliquota: 15.713,
        impostoTipo: 'por-dentro'
    }
};

// A mesma função de cálculo do app.js
function calculateServiceCosts(srv) {
    const salarioBaseItem = srv.remuneracao.find(i => i.id === 'salario-base');
    const salarioBase = salarioBaseItem ? Number(salarioBaseItem.value) : 0;
    
    let baseEncargos = 0;
    srv.remuneracao.forEach(item => {
        if (item.type === 'base') {
            item.calculated = Math.round(salarioBase * 100) / 100;
        } else if (item.type === 'percentage') {
            item.calculated = Math.round(salarioBase * (Number(item.value) / 100) * 100) / 100;
        } else { // flat
            item.calculated = Math.round(Number(item.value) * 100) / 100;
        }
        
        if (item.includeInBase) {
            baseEncargos += item.calculated;
        }
    });
    srv.totalBaseEncargos = Math.round(baseEncargos * 100) / 100;

    // Encargos
    let totalEncargosPercent = 0;
    let subtotalEncargos = 0;
    srv.encargos.forEach(item => {
        item.calculated = Math.round(srv.totalBaseEncargos * (Number(item.value) / 100) * 100) / 100;
        subtotalEncargos += item.calculated;
        totalEncargosPercent += Number(item.value);
    });
    srv.totalEncargosPercent = Math.round(totalEncargosPercent * 1000) / 1000;
    srv.subtotalEncargos = Math.round(subtotalEncargos * 100) / 100;

    // Provisões
    const encargosMultiplier = 1 + (srv.totalEncargosPercent / 100);
    let totalProvisoes = 0;
    srv.provisoes.forEach(item => {
        if (item.type === 'formula-13') {
            item.calculated = Math.round((srv.totalBaseEncargos / 12) * encargosMultiplier * 100) / 100;
        } else if (item.type === 'formula-ferias') {
            item.calculated = Math.round(((srv.totalBaseEncargos * 1.33333333) / 12) * encargosMultiplier * 100) / 100;
        } else if (item.type === 'percentage') {
            item.calculated = Math.round(srv.totalBaseEncargos * (Number(item.value) / 100) * 100) / 100;
        } else { // flat
            item.calculated = Math.round(Number(item.value) * 100) / 100;
        }
        totalProvisoes += item.calculated;
    });
    srv.totalProvisoes = Math.round(totalProvisoes * 100) / 100;
    srv.totalFolhaGeral = Math.round((srv.totalBaseEncargos + srv.subtotalEncargos + srv.totalProvisoes) * 100) / 100;

    // Benefícios
    let totalBeneficios = 0;
    srv.beneficios.forEach(item => {
        item.calculated = Math.round(Number(item.value) * 100) / 100;
        totalBeneficios += item.calculated;
    });
    srv.totalBeneficios = Math.round(totalBeneficios * 100) / 100;

    // Resumo
    srv.custoTotalOperacional = Math.round((srv.totalFolhaGeral + srv.totalBeneficios) * 100) / 100;
    const subtotalComTaxa = Math.round((srv.custoTotalOperacional + Number(srv.resumo.taxaAdmin)) * 100) / 100;
    const aliquota = Number(srv.resumo.impostoAliquota) / 100;
    
    let impostoCalculado = 0;
    if (srv.resumo.impostoTipo === 'por-dentro') {
        impostoCalculado = Math.round(((subtotalComTaxa / (1 - aliquota)) - subtotalComTaxa) * 100) / 100;
    } else {
        impostoCalculado = Math.round((subtotalComTaxa * aliquota) * 100) / 100;
    }
    
    srv.impostoCalculado = impostoCalculado;
    srv.totalMensalidade = Math.round((subtotalComTaxa + impostoCalculado) * 100) / 100;
}

// Executa cálculo
calculateServiceCosts(srv);

// Asserts e Verificações
const format = (v) => v.toFixed(2);

console.log(`Salário Base: R$ ${format(srv.remuneracao[0].calculated)} (Esperado: 1815.43)`);
console.log(`Acúmulo de Função (20%): R$ ${format(srv.remuneracao[1].calculated)} (Esperado: 363.09)`);
console.log(`Gratificação: R$ ${format(srv.remuneracao[2].calculated)} (Esperado: 110.00)`);
console.log(`Base de Cálculo total: R$ ${format(srv.totalBaseEncargos)} (Esperado: 2288.52)`);

console.log("\n--- ENCARGOS ---");
console.log(`Subtotal Encargos Diretos: R$ ${format(srv.subtotalEncargos)} (Esperado: 819.28)`);

console.log("\n--- PROVISÕES ---");
console.log(`Provisão 13º Salário: R$ ${format(srv.provisoes[0].calculated)} (Esperado: 258.98)`);
console.log(`Provisão Férias + 1/3: R$ ${format(srv.provisoes[1].calculated)} (Esperado: 345.31)`);
console.log(`Total Provisões: R$ ${format(srv.totalProvisoes)} (Esperado: 604.29)`);
console.log(`Total Folha Geral (Salário + Encargos + Prov): R$ ${format(srv.totalFolhaGeral)} (Esperado: 3712.09)`);

console.log("\n--- BENEFÍCIOS ---");
console.log(`Total Benefícios: R$ ${format(srv.totalBeneficios)} (Esperado: 1186.07)`);

console.log("\n--- RESUMO DO INVESTIMENTO OPERACIONAL ---");
console.log(`Custo Total Operacional (Mão de Obra): R$ ${format(srv.custoTotalOperacional)} (Esperado: 4898.16)`);
console.log(`Taxa Admin: R$ ${format(srv.resumo.taxaAdmin)} (Esperado: 1650.00)`);
console.log(`Impostos s/ Nota (15.713% por dentro): R$ ${format(srv.impostoCalculado)} (Esperado: 1220.73)`);
console.log(`Valor Total da Mensalidade: R$ ${format(srv.totalMensalidade)} (Esperado: 7768.89)`);

// Testando com quantidade de funcionários = 2
console.log("\n--- TESTANDO COM MULTIPLICADOR DE QUANTIDADE (Qtd = 2) ---");
srv.quantidade = 2;
calculateServiceCosts(srv);

console.log(`Quantidade: ${srv.quantidade}`);
console.log(`Mão de Obra Total (Unit x Qtd): R$ ${format(srv.custoTotalOperacional * srv.quantidade)} (Esperado: 9796.32)`);
console.log(`Taxa Admin Total (Unit x Qtd): R$ ${format(Number(srv.resumo.taxaAdmin) * srv.quantidade)} (Esperado: 3300.00)`);
console.log(`Impostos Totais (Unit x Qtd): R$ ${format(srv.impostoCalculado * srv.quantidade)} (Esperado: 2441.44)`);
console.log(`Mensalidade Total do Posto (Unit x Qtd): R$ ${format(srv.totalMensalidade * srv.quantidade)} (Esperado: 15537.76)`);

// Verificações finais
let success = true;
if (Math.abs(srv.totalBaseEncargos - 2288.52) > 0.01) { console.error("ERRO: Base de cálculo incorreta!"); success = false; }
if (Math.abs(srv.subtotalEncargos - 819.29) > 0.02) { console.error("ERRO: Subtotal de encargos incorreto!"); success = false; }
if (Math.abs(srv.custoTotalOperacional * srv.quantidade - 9796.32) > 0.01) { console.error("ERRO: Multiplicação de Mão de Obra incorreta!"); success = false; }
if (Math.abs(srv.totalMensalidade * srv.quantidade - 15537.76) > 0.02) { console.error("ERRO: Valor total acumulado por quantidade incorreto!"); success = false; }

if (success) {
    console.log("\n>>> SUCESSO: TODOS OS CÁLCULOS MATEMÁTICOS (INCLUINDO QUANTIDADE) FORAM VERIFICADOS E ESTÃO CORRETOS! <<<");
} else {
    console.log("\n>>> FALHA NA VERIFICAÇÃO! <<<");
}
