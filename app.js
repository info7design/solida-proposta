/* ==========================================================================
   SÓLIDA ZELADORIA - LOGICA DA APLICAÇÃO (APP.JS)
   ========================================================================== */

// 1. DADOS PADRÃO E ESTADO DA APLICAÇÃO
const DEFAULT_SERVICES = {
    'portaria': {
        id: 'portaria',
        enabled: true,
        quantidade: 1,
        label: 'Serviço de Portaria',
        scope: [
            'Controle de acesso de pedestres e veículos.',
            'Identificação e cadastro de visitantes e prestadores de serviço.',
            'Recebimento e registro de correspondências e encomendas.',
            'Monitoramento de câmeras e sistemas de segurança da portaria.'
        ],
        remuneracao: [
            { id: 'salario-base', name: 'Salário Base', type: 'base', value: 1950.00, includeInBase: true, editable: false, deletable: false },
            { id: 'acumulo-funcao', name: 'Acúmulo de Função (20%)', type: 'percentage', value: 0, factorField: 'salario-base', includeInBase: true, editable: true, deletable: true },
            { id: 'gratificacao', name: 'Gratificação', type: 'flat', value: 100.00, includeInBase: true, editable: true, deletable: true }
        ],
        encargos: [
            { id: 'inss', name: 'INSS Patronal', type: 'percentage', value: 20.00, editable: true, deletable: true },
            { id: 'rat', name: 'RAT (Risco Ambiental do Trabalho)', type: 'percentage', value: 2.00, editable: true, deletable: true },
            { id: 'terceiros', name: 'Terceiros (Sistema S)', type: 'percentage', value: 5.80, editable: true, deletable: true },
            { id: 'fgts', name: 'FGTS', type: 'percentage', value: 8.00, editable: true, deletable: true }
        ],
        provisoes: [
            { id: 'prov-13', name: 'Provisão Mensal de 13º Salário (com encargos/FGTS)', type: 'formula-13', formulaText: '(Base / 12) + Encargos', value: 0, editable: false, deletable: false },
            { id: 'prov-ferias', name: 'Provisão Mensal de Férias + 1/3 (com encargos/FGTS)', type: 'formula-ferias', formulaText: '(Base * 1.333 / 12) + Encargos', value: 0, editable: false, deletable: false }
        ],
        beneficios: [
            { id: 'vt', name: 'Vale Transporte (VT)', type: 'flat', value: 337.70, editable: true, deletable: true },
            { id: 'vr', name: 'Vale Refeição (VR)', type: 'flat', value: 563.55, editable: true, deletable: true },
            { id: 'cesta', name: 'Cesta básica', type: 'flat', value: 205.00, editable: true, deletable: true },
            { id: 'plr', name: 'PLR (Participação Lucros e Resultados)', type: 'flat', value: 21.27, editable: true, deletable: true },
            { id: 'uniformes', name: 'Uniformes e EPIs', type: 'flat', value: 58.55, editable: true, deletable: true }
        ],
        resumo: {
            taxaAdmin: 1650.00,
            impostoAliquota: 15.713,
            impostoTipo: 'por-dentro'
        }
    },
    'vigia': {
        id: 'vigia',
        enabled: false,
        quantidade: 1,
        label: 'Serviço de Vigia',
        scope: [
            'Rondas periódicas nas dependências do condomínio.',
            'Monitoramento de pontos vulneráveis e segurança perimetral.',
            'Registro de ocorrências e acionamento de autoridades se necessário.',
            'Zelo pela integridade física do patrimônio durante o turno.'
        ],
        remuneracao: [
            { id: 'salario-base', name: 'Salário Base', type: 'base', value: 2100.00, includeInBase: true, editable: false, deletable: false },
            { id: 'adicional-noturno', name: 'Adicional Noturno (20%)', type: 'percentage', value: 20, factorField: 'salario-base', includeInBase: true, editable: true, deletable: true },
            { id: 'gratificacao', name: 'Gratificação', type: 'flat', value: 120.00, includeInBase: true, editable: true, deletable: true }
        ],
        encargos: [
            { id: 'inss', name: 'INSS Patronal', type: 'percentage', value: 20.00, editable: true, deletable: true },
            { id: 'rat', name: 'RAT (Risco Ambiental do Trabalho)', type: 'percentage', value: 2.00, editable: true, deletable: true },
            { id: 'terceiros', name: 'Terceiros (Sistema S)', type: 'percentage', value: 5.80, editable: true, deletable: true },
            { id: 'fgts', name: 'FGTS', type: 'percentage', value: 8.00, editable: true, deletable: true }
        ],
        provisoes: [
            { id: 'prov-13', name: 'Provisão Mensal de 13º Salário (com encargos/FGTS)', type: 'formula-13', formulaText: '(Base / 12) + Encargos', value: 0, editable: false, deletable: false },
            { id: 'prov-ferias', name: 'Provisão Mensal de Férias + 1/3 (com encargos/FGTS)', type: 'formula-ferias', formulaText: '(Base * 1.333 / 12) + Encargos', value: 0, editable: false, deletable: false }
        ],
        beneficios: [
            { id: 'vt', name: 'Vale Transporte (VT)', type: 'flat', value: 337.70, editable: true, deletable: true },
            { id: 'vr', name: 'Vale Refeição (VR)', type: 'flat', value: 563.55, editable: true, deletable: true },
            { id: 'cesta', name: 'Cesta básica', type: 'flat', value: 205.00, editable: true, deletable: true },
            { id: 'plr', name: 'PLR (Participação Lucros e Resultados)', type: 'flat', value: 21.27, editable: true, deletable: true },
            { id: 'uniformes', name: 'Uniformes e EPIs', type: 'flat', value: 58.55, editable: true, deletable: true }
        ],
        resumo: {
            taxaAdmin: 1750.00,
            impostoAliquota: 15.713,
            impostoTipo: 'por-dentro'
        }
    },
    'servicos-gerais': {
        id: 'servicos-gerais',
        enabled: true,
        quantidade: 1,
        label: 'Serviços Gerais / Zeladoria',
        scope: [
            'Coordenação e fiscalização das atividades de limpeza e manutenção.',
            'Zelo pelo cumprimento do regimento interno do condomínio.',
            'Ponto de contato direto entre administração e moradores/usuários.',
            'Pequenos reparos e manutenção preventiva predial.'
        ],
        remuneracao: [
            { id: 'salario-base', name: 'Salário Base', type: 'base', value: 1815.43, includeInBase: true, editable: false, deletable: false },
            { id: 'acumulo-funcao', name: 'Acúmulo de Função (20%)', type: 'percentage', value: 20, factorField: 'salario-base', includeInBase: true, editable: true, deletable: true },
            { id: 'gratificacao', name: 'Gratificação', type: 'flat', value: 110.00, includeInBase: true, editable: true, deletable: true }
        ],
        encargos: [
            { id: 'inss', name: 'INSS Patronal', type: 'percentage', value: 20.00, editable: true, deletable: true },
            { id: 'rat', name: 'RAT (Risco Ambiental do Trabalho)', type: 'percentage', value: 2.00, editable: true, deletable: true },
            { id: 'terceiros', name: 'Terceiros (Sistema S)', type: 'percentage', value: 5.80, editable: true, deletable: true },
            { id: 'fgts', name: 'FGTS', type: 'percentage', value: 8.00, editable: true, deletable: true }
        ],
        provisoes: [
            { id: 'prov-13', name: 'Provisão Mensal de 13º Salário (com encargos/FGTS)', type: 'formula-13', formulaText: '(Base / 12) + Encargos', value: 0, editable: false, deletable: false },
            { id: 'prov-ferias', name: 'Provisão Mensal de Férias + 1/3 (com encargos/FGTS)', type: 'formula-ferias', formulaText: '(Base * 1.333 / 12) + Encargos', value: 0, editable: false, deletable: false }
        ],
        beneficios: [
            { id: 'vt', name: 'Vale Transporte (VT)', type: 'flat', value: 337.70, editable: true, deletable: true },
            { id: 'vr', name: 'Vale Refeição (VR)', type: 'flat', value: 563.55, editable: true, deletable: true },
            { id: 'cesta', name: 'Cesta básica', type: 'flat', value: 205.00, editable: true, deletable: true },
            { id: 'plr', name: 'PLR (Participação Lucros e Resultados)', type: 'flat', value: 21.27, editable: true, deletable: true },
            { id: 'uniformes', name: 'Uniformes e EPIs', type: 'flat', value: 58.55, editable: true, deletable: true }
        ],
        resumo: {
            taxaAdmin: 1650.00,
            impostoAliquota: 15.713,
            impostoTipo: 'por-dentro'
        }
    },
    'jardinagem': {
        id: 'jardinagem',
        enabled: false,
        quantidade: 1,
        label: 'Serviço de Jardinagem',
        scope: [
            'Manutenção e conservação de todas as áreas verdes e jardins.',
            'Poda periódica de árvores, arbustos e corte adequado da grama.',
            'Irrigação, adubação e controle preventivo de pragas.',
            'Limpeza e destinação correta de resíduos orgânicos das podas.'
        ],
        remuneracao: [
            { id: 'salario-base', name: 'Salário Base', type: 'base', value: 1750.00, includeInBase: true, editable: false, deletable: false },
            { id: 'acumulo-funcao', name: 'Acúmulo de Função (20%)', type: 'percentage', value: 0, factorField: 'salario-base', includeInBase: true, editable: true, deletable: true },
            { id: 'gratificacao', name: 'Gratificação', type: 'flat', value: 80.00, includeInBase: true, editable: true, deletable: true }
        ],
        encargos: [
            { id: 'inss', name: 'INSS Patronal', type: 'percentage', value: 20.00, editable: true, deletable: true },
            { id: 'rat', name: 'RAT (Risco Ambiental do Trabalho)', type: 'percentage', value: 2.00, editable: true, deletable: true },
            { id: 'terceiros', name: 'Terceiros (Sistema S)', type: 'percentage', value: 5.80, editable: true, deletable: true },
            { id: 'fgts', name: 'FGTS', type: 'percentage', value: 8.00, editable: true, deletable: true }
        ],
        provisoes: [
            { id: 'prov-13', name: 'Provisão Mensal de 13º Salário (com encargos/FGTS)', type: 'formula-13', formulaText: '(Base / 12) + Encargos', value: 0, editable: false, deletable: false },
            { id: 'prov-ferias', name: 'Provisão Mensal de Férias + 1/3 (com encargos/FGTS)', type: 'formula-ferias', formulaText: '(Base * 1.333 / 12) + Encargos', value: 0, editable: false, deletable: false }
        ],
        beneficios: [
            { id: 'vt', name: 'Vale Transporte (VT)', type: 'flat', value: 337.70, editable: true, deletable: true },
            { id: 'vr', name: 'Vale Refeição (VR)', type: 'flat', value: 563.55, editable: true, deletable: true },
            { id: 'cesta', name: 'Cesta básica', type: 'flat', value: 205.00, editable: true, deletable: true },
            { id: 'plr', name: 'PLR (Participação Lucros e Resultados)', type: 'flat', value: 21.27, editable: true, deletable: true },
            { id: 'uniformes', name: 'Uniformes e EPIs', type: 'flat', value: 58.55, editable: true, deletable: true }
        ],
        resumo: {
            taxaAdmin: 1500.00,
            impostoAliquota: 15.713,
            impostoTipo: 'por-dentro'
        }
    }
};

let proposalState = {
    clientName: 'CARMELA EMPREENDIMENTOS',
    proposalNumber: '001/2026',
    date: '2026-05-22',
    reference: 'Prestação de Serviços de Portaria e Auxiliar de Limpeza',
    textApresentacao: 'Nossa proposta visa garantir a conservação, segurança e manutenção de seu patrimônio através de profissionais qualificados. Diferenciamo-nos pela total transparência na composição de custos e pelo rigoroso cumprimento das obrigações trabalhistas, garantindo segurança jurídica ao contratante.',
    showAnaliseComparativa: true,
    textAnaliseComparativa: 'Entendemos que a função de auxiliar de limpeza com algumas, não todas, das atividades de zeladoria onde exige polivalência. Abaixo, demonstramos a diferença entre um posto padrão e um posto com Acúmulo de Função (20%), que garante maior agilidade na resolução de problemas técnicos:',
    textConsideracoesGerais: 'Informamos também que sugerimos analisar, caso haja no condomínio a necessidade de manuseio de lixo ativo nas limpezas, ou a limpeza onde a utilização de banheiros coletivos seja superior a 25 utilizações diárias, onde requer uma de ação intensificada de auxiliar de serviços gerais (ASG), o que confere a necessidade de considerar a aplicação de fator de Insalubridade, preservando o trabalhador, e assegurando tanto a contratada, quanto a contratante de possíveis passivos trabalhistas.',
    signerName: 'Jefferson dos Santos',
    signerPhone: '(12) 68156-5700',
    signerEmail: 'comercial@solidazeladoria.com.br',
    services: JSON.parse(JSON.stringify(DEFAULT_SERVICES))
};

// Aba ativa no editor de postos
let activePostTab = 'portaria';

// 2. INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    // Configura a data padrão como hoje se vazia
    if (!proposalDateInput().value) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        proposalState.date = `${yyyy}-${mm}-${dd}`;
    }

    loadSavedProposalsList();
    setupEventListeners();
    bindStateToInputs();
    recalculateAll();
    renderUI();
});

// 3. REFERÊNCIAS DO DOM (HELPERS DE ACESSO)
const srvCheckbox = (id) => document.getElementById(`srv-${id}`);
const proposalDateInput = () => document.getElementById('proposal-date');

// 4. MOTOR DE CÁLCULO FINANCEIRO (REATIVO)
function calculateServiceCosts(srv) {
    srv.quantidade = Math.max(1, parseInt(srv.quantidade) || 1);
    // A. Remuneração
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

    // B. Encargos Sociais
    let totalEncargosPercent = 0;
    let subtotalEncargos = 0;
    srv.encargos.forEach(item => {
        item.calculated = Math.round(srv.totalBaseEncargos * (Number(item.value) / 100) * 100) / 100;
        subtotalEncargos += item.calculated;
        totalEncargosPercent += Number(item.value);
    });
    srv.totalEncargosPercent = Math.round(totalEncargosPercent * 1000) / 1000;
    srv.subtotalEncargos = Math.round(subtotalEncargos * 100) / 100;

    // C. Provisões Legais (Férias e 13º com Encargos)
    // Multiplicador = 1 + (Soma dos Encargos Diretos % / 100)
    const encargosMultiplier = 1 + (srv.totalEncargosPercent / 100);
    let totalProvisoes = 0;

    srv.provisoes.forEach(item => {
        if (item.type === 'formula-13') {
            item.calculated = Math.round((srv.totalBaseEncargos / 12) * encargosMultiplier * 100) / 100;
        } else if (item.type === 'formula-ferias') {
            // Férias é (Base * 1.3333333 / 12) * multiplicador de encargos
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

    // D. Benefícios e Insumos Operacionais
    let totalBeneficios = 0;
    srv.beneficios.forEach(item => {
        item.calculated = Math.round(Number(item.value) * 100) / 100;
        totalBeneficios += item.calculated;
    });
    srv.totalBeneficios = Math.round(totalBeneficios * 100) / 100;

    // E. Resumo
    srv.custoTotalOperacional = Math.round((srv.totalFolhaGeral + srv.totalBeneficios) * 100) / 100;
    
    const subtotalComTaxa = Math.round((srv.custoTotalOperacional + Number(srv.resumo.taxaAdmin)) * 100) / 100;
    let impostoCalculado = 0;
    const aliquota = Number(srv.resumo.impostoAliquota) / 100;

    if (srv.resumo.impostoTipo === 'por-dentro') {
        // Cálculo "por dentro" padrão: Subtotal / (1 - alíquota) - Subtotal
        impostoCalculado = Math.round(((subtotalComTaxa / (1 - aliquota)) - subtotalComTaxa) * 100) / 100;
    } else {
        // Imposto simples
        impostoCalculado = Math.round((subtotalComTaxa * aliquota) * 100) / 100;
    }
    
    srv.impostoCalculado = impostoCalculado;
    srv.totalMensalidade = Math.round((subtotalComTaxa + impostoCalculado) * 100) / 100;
}

function recalculateAll() {
    Object.keys(proposalState.services).forEach(key => {
        calculateServiceCosts(proposalState.services[key]);
    });
}

// 5. ATUALIZAR INTERFACE E TEXTOS DO PREVIEW (REATIVIDADE)
function renderUI() {
    recalculateAll();
    
    // Atualizar Dados Gerais na Proposta
    document.querySelectorAll('.bind-proposal-number').forEach(el => el.textContent = proposalState.proposalNumber);
    document.querySelectorAll('.bind-client-name').forEach(el => el.textContent = proposalState.clientName);
    document.querySelectorAll('.bind-proposal-ref').forEach(el => el.textContent = proposalState.reference);
    
    // Formatar data em PT-BR
    if (proposalState.date) {
        const parts = proposalState.date.split('-');
        if (parts.length === 3) {
            const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            document.querySelectorAll('.bind-proposal-date').forEach(el => {
                el.textContent = dateObj.toLocaleDateString('pt-BR', options);
            });
        }
    }

    document.getElementById('bind-text-apresentacao').textContent = proposalState.textApresentacao;
    document.getElementById('bind-text-consideracoes-gerais').textContent = proposalState.textConsideracoesGerais;
    
    document.getElementById('bind-signer-name').textContent = proposalState.signerName;
    document.getElementById('bind-signer-phone').textContent = proposalState.signerPhone;
    document.getElementById('bind-signer-email').textContent = proposalState.signerEmail;

    // Atualizar Abas de Configuração de Postos
    renderPostsConfigTabs();

    // 2. ESCOPO DOS SERVIÇOS (PREVIEW)
    renderScopePreview();

    // 3. DETALHAMENTO DE CUSTOS POR POSTO (PREVIEW)
    renderDetailedCostsPreview();

    // 4. RESUMO CONSOLIDADO (PREVIEW)
    renderConsolidatedSummaryPreview();

    // 5. ANÁLISE COMPARATIVA (PREVIEW)
    renderComparativeAnalysisPreview();
    
    // Contagem de Páginas Virtuais (estético no preview)
    updatePageCounter();
}

function bindStateToInputs() {
    document.getElementById('client-name').value = proposalState.clientName;
    document.getElementById('proposal-number').value = proposalState.proposalNumber;
    document.getElementById('proposal-date').value = proposalState.date;
    document.getElementById('proposal-ref').value = proposalState.reference;
    document.getElementById('text-apresentacao').value = proposalState.textApresentacao;
    document.getElementById('show-analise-comparativa').checked = proposalState.showAnaliseComparativa;
    document.getElementById('text-analise-comparativa').value = proposalState.textAnaliseComparativa;
    document.getElementById('text-consideracoes-gerais').value = proposalState.textConsideracoesGerais;
    document.getElementById('signer-name').value = proposalState.signerName;
    document.getElementById('signer-phone').value = proposalState.signerPhone;
    document.getElementById('signer-email').value = proposalState.signerEmail;

    // Checkboxes dos postos
    Object.keys(proposalState.services).forEach(key => {
        const cb = srvCheckbox(key);
        if (cb) cb.checked = proposalState.services[key].enabled;
    });
}

// 6. RENDERIZADORES ESPECÍFICOS DO PREVIEW E DO EDITOR

// Renderiza abas no painel do editor
function renderPostsConfigTabs() {
    const header = document.getElementById('posts-tabs-header');
    const content = document.getElementById('posts-tabs-content');
    
    const activeServicesKeys = Object.keys(proposalState.services).filter(k => proposalState.services[k].enabled);
    
    if (activeServicesKeys.length === 0) {
        header.innerHTML = '';
        content.innerHTML = '<div class="section-desc" style="color:var(--danger)">Nenhum serviço selecionado. Selecione pelo menos um posto acima para configurar.</div>';
        return;
    }

    // Se a aba selecionada anteriormente não estiver mais ativa, ativa a primeira disponível
    if (!activeServicesKeys.includes(activePostTab)) {
        activePostTab = activeServicesKeys[0];
    }

    // Renderiza cabeçalhos das abas
    header.innerHTML = activeServicesKeys.map(key => `
        <button class="tab-btn ${activePostTab === key ? 'active' : ''}" onclick="switchPostTab('${key}')">
            ${proposalState.services[key].label.split('/')[0].split('Serviço de')[1] || proposalState.services[key].label}
        </button>
    `).join('');

    // Renderiza o painel ativo
    const srv = proposalState.services[activePostTab];
    content.innerHTML = `
        <div class="tab-pane active">
            <!-- Salário Base e Quantidade -->
            <div class="form-grid" style="margin-bottom: 15px; background: rgba(212,175,55,0.05); padding: 10px; border-radius: var(--radius-sm); border: 1px solid rgba(212,175,55,0.2);">
                <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="color:var(--gold-primary)">Salário Base</label>
                    <div class="row-value-wrapper" style="width: 100%;">
                        <span style="font-size:12px; color:var(--text-secondary); margin-right:4px;">R$</span>
                        <input type="number" step="0.01" class="row-input" style="font-size:14px; font-weight:bold; color:var(--gold-primary);" 
                               value="${srv.remuneracao.find(i => i.id === 'salario-base').value}" 
                               onchange="updateSalarioBase('${activePostTab}', this.value)">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="color:var(--gold-primary)">Qtd. Colaboradores</label>
                    <div class="row-value-wrapper" style="width: 100%;">
                        <input type="number" min="1" class="row-input" style="font-size:14px; font-weight:bold; color:var(--gold-primary); text-align: center;" 
                               value="${srv.quantidade || 1}" 
                               onchange="updateQuantidade('${activePostTab}', this.value)">
                    </div>
                </div>
                <div style="grid-column: span 2; margin-top: 5px;">
                    <small class="formula-tooltip">Alterar o salário base ou a quantidade atualizará automaticamente todos os cálculos unitários e totais do posto.</small>
                </div>
            </div>

            <!-- Accordions para as 5 tabelas do Posto -->
            
            <!-- 1. ESCOPO DO SERVIÇO -->
            ${renderCostSectionCard('Escopo e Atividades', renderEscopoForm(srv))}

            <!-- 2. REMUNERAÇÃO -->
            ${renderCostSectionCard('3.1. Remuneração e Base Salarial', renderRemuneracaoForm(srv))}

            <!-- 3. ENCARGOS -->
            ${renderCostSectionCard('3.2. Encargos Sociais', renderEncargosForm(srv))}

            <!-- 4. PROVISÕES -->
            ${renderCostSectionCard('3.3. Provisões Legais', renderProvisoesForm(srv))}

            <!-- 5. BENEFÍCIOS -->
            ${renderCostSectionCard('3.4. Benefícios e Insumos', renderBeneficiosForm(srv))}

            <!-- 6. RESUMO E IMPOSTOS -->
            ${renderCostSectionCard('4. Resumo e Parâmetros Tributários', renderResumoForm(srv))}
        </div>
    `;
}

function renderCostSectionCard(title, bodyHtml) {
    return `
        <div class="cost-section-card">
            <button class="cost-section-header" onclick="toggleCostSection(this)">
                <span>${title}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="cost-section-body">
                ${bodyHtml}
            </div>
        </div>
    `;
}

function toggleCostSection(btn) {
    const card = btn.parentElement;
    card.classList.toggle('open');
}

// Renderizadores de formulário interno para cada seção de custo no editor

function renderEscopoForm(srv) {
    let html = '<div class="editor-table-list" id="escopo-list">';
    srv.scope.forEach((item, index) => {
        html += `
            <div class="editor-table-row">
                <input type="text" class="form-input" style="font-size:11px;" value="${item}" onchange="updateScopeItem('${srv.id}', ${index}, this.value)">
                <button class="btn-row-del" onclick="deleteScopeItem('${srv.id}', ${index})" title="Excluir item de escopo"><i class="fas fa-times"></i></button>
            </div>
        `;
    });
    html += '</div>';
    html += `
        <div class="table-add-action">
            <button class="btn btn-secondary" style="width:100%; font-size:11px;" onclick="addScopeItem('${srv.id}')">
                <i class="fas fa-plus"></i> Adicionar Item de Escopo
            </button>
        </div>
    `;
    return html;
}

function renderRemuneracaoForm(srv) {
    let html = '<div class="editor-table-list">';
    srv.remuneracao.forEach(item => {
        const isBase = item.id === 'salario-base';
        html += `
            <div class="editor-table-row">
                <span class="row-label">${item.name} ${item.includeInBase ? '<strong style="color:var(--gold-primary); font-size:9px;" title="Incluído na Base de Encargos">(BASE)</strong>' : ''}</span>
                <div class="row-value-wrapper">
                    <span style="font-size:11px; color:var(--text-secondary);">${item.type === 'percentage' ? '%' : 'R$'}</span>
                    <input type="number" step="0.01" class="row-input" value="${item.value}" ${isBase ? 'disabled' : ''} 
                           onchange="updateRowValue('${srv.id}', 'remuneracao', '${item.id}', this.value)">
                </div>
                <div class="row-actions">
                    ${item.deletable ? `<button class="btn-row-del" onclick="deleteRow('${srv.id}', 'remuneracao', '${item.id}')"><i class="fas fa-trash-alt"></i></button>` : ''}
                </div>
            </div>
        `;
    });
    html += '</div>';
    html += `
        <button class="btn btn-secondary" style="width:100%; font-size:11px; margin-top:5px;" onclick="openAddFieldForm('${srv.id}', 'remuneracao')">
            <i class="fas fa-plus"></i> Adicionar Campo à Remuneração
        </button>
        <div class="add-field-form" id="add-remuneracao-form">
            <div class="form-group">
                <label class="form-label">Nome do Campo</label>
                <input type="text" id="add-rem-name" placeholder="Ex: Adicional Noturno (20%)" class="form-input">
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Tipo</label>
                    <select id="add-rem-type" class="form-select">
                        <option value="percentage">Percentual da Base (%)</option>
                        <option value="flat">Valor Fixo (R$)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Valor Padrão</label>
                    <input type="number" step="0.01" id="add-rem-val" value="0" class="form-input">
                </div>
            </div>
            <div class="form-group check-row" style="margin-top: 5px;">
                <input type="checkbox" id="add-rem-base" checked>
                <label for="add-rem-base" class="form-label-inline">Incide Encargos (Soma na Base total)?</label>
            </div>
            <div class="row-flex" style="margin-top:10px;">
                <button class="btn btn-primary flex-grow" onclick="addNewField('${srv.id}', 'remuneracao')">Salvar Campo</button>
                <button class="btn btn-secondary" onclick="closeAddFieldForm('remuneracao')">Cancelar</button>
            </div>
        </div>
    `;
    return html;
}

function renderEncargosForm(srv) {
    let html = '<div class="editor-table-list">';
    srv.encargos.forEach(item => {
        html += `
            <div class="editor-table-row">
                <span class="row-label">${item.name}</span>
                <div class="row-value-wrapper">
                    <span style="font-size:11px; color:var(--text-secondary);">%</span>
                    <input type="number" step="0.01" class="row-input" value="${item.value}" 
                           onchange="updateRowValue('${srv.id}', 'encargos', '${item.id}', this.value)">
                </div>
                <div class="row-actions">
                    ${item.deletable ? `<button class="btn-row-del" onclick="deleteRow('${srv.id}', 'encargos', '${item.id}')"><i class="fas fa-trash-alt"></i></button>` : ''}
                </div>
            </div>
        `;
    });
    html += '</div>';
    html += `
        <button class="btn btn-secondary" style="width:100%; font-size:11px; margin-top:5px;" onclick="openAddFieldForm('${srv.id}', 'encargos')">
            <i class="fas fa-plus"></i> Adicionar Campo a Encargos
        </button>
        <div class="add-field-form" id="add-encargos-form">
            <div class="form-group">
                <label class="form-label">Nome do Encargo</label>
                <input type="text" id="add-enc-name" placeholder="Ex: Contribuição Social Extra" class="form-input">
            </div>
            <div class="form-group">
                <label class="form-label">Alíquota (%)</label>
                <input type="number" step="0.01" id="add-enc-val" value="0.00" class="form-input">
            </div>
            <div class="row-flex" style="margin-top:10px;">
                <button class="btn btn-primary flex-grow" onclick="addNewField('${srv.id}', 'encargos')">Salvar Encargo</button>
                <button class="btn btn-secondary" onclick="closeAddFieldForm('encargos')">Cancelar</button>
            </div>
        </div>
    `;
    return html;
}

function renderProvisoesForm(srv) {
    let html = '<div class="editor-table-list">';
    srv.provisoes.forEach(item => {
        const isFormula = item.type.startsWith('formula');
        html += `
            <div class="editor-table-row">
                <div>
                    <span class="row-label">${item.name}</span>
                    ${isFormula ? `<span class="formula-tooltip">Fórmula: ${item.formulaText}</span>` : ''}
                </div>
                <div class="row-value-wrapper">
                    <span style="font-size:11px; color:var(--text-secondary);">${item.type === 'percentage' ? '%' : 'R$'}</span>
                    <input type="number" step="0.01" class="row-input" value="${item.value}" ${isFormula ? 'disabled style="opacity:0.6"' : ''} 
                           onchange="updateRowValue('${srv.id}', 'provisoes', '${item.id}', this.value)">
                </div>
                <div class="row-actions">
                    ${item.deletable ? `<button class="btn-row-del" onclick="deleteRow('${srv.id}', 'provisoes', '${item.id}')"><i class="fas fa-trash-alt"></i></button>` : ''}
                </div>
            </div>
        `;
    });
    html += '</div>';
    html += `
        <button class="btn btn-secondary" style="width:100%; font-size:11px; margin-top:5px;" onclick="openAddFieldForm('${srv.id}', 'provisoes')">
            <i class="fas fa-plus"></i> Adicionar Provisão Adicional
        </button>
        <div class="add-field-form" id="add-provisoes-form">
            <div class="form-group">
                <label class="form-label">Nome da Provisão</label>
                <input type="text" id="add-prov-name" placeholder="Ex: Provisão Multa Rescisória" class="form-input">
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Tipo</label>
                    <select id="add-prov-type" class="form-select">
                        <option value="percentage">Percentual da Base (%)</option>
                        <option value="flat">Valor Fixo (R$)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Valor Padrão</label>
                    <input type="number" step="0.01" id="add-prov-val" value="0.00" class="form-input">
                </div>
            </div>
            <div class="row-flex" style="margin-top:10px;">
                <button class="btn btn-primary flex-grow" onclick="addNewField('${srv.id}', 'provisoes')">Salvar Provisão</button>
                <button class="btn btn-secondary" onclick="closeAddFieldForm('provisoes')">Cancelar</button>
            </div>
        </div>
    `;
    return html;
}

function renderBeneficiosForm(srv) {
    let html = '<div class="editor-table-list">';
    srv.beneficios.forEach(item => {
        html += `
            <div class="editor-table-row">
                <span class="row-label">${item.name}</span>
                <div class="row-value-wrapper">
                    <span style="font-size:11px; color:var(--text-secondary);">R$</span>
                    <input type="number" step="0.01" class="row-input" value="${item.value}" 
                           onchange="updateRowValue('${srv.id}', 'beneficios', '${item.id}', this.value)">
                </div>
                <div class="row-actions">
                    ${item.deletable ? `<button class="btn-row-del" onclick="deleteRow('${srv.id}', 'beneficios', '${item.id}')"><i class="fas fa-trash-alt"></i></button>` : ''}
                </div>
            </div>
        `;
    });
    html += '</div>';
    html += `
        <button class="btn btn-secondary" style="width:100%; font-size:11px; margin-top:5px;" onclick="openAddFieldForm('${srv.id}', 'beneficios')">
            <i class="fas fa-plus"></i> Adicionar Benefício / Insumo
        </button>
        <div class="add-field-form" id="add-beneficios-form">
            <div class="form-group">
                <label class="form-label">Nome do Benefício</label>
                <input type="text" id="add-ben-name" placeholder="Ex: Seguro de Vida Individual" class="form-input">
            </div>
            <div class="form-group">
                <label class="form-label">Custo Mensal (R$)</label>
                <input type="number" step="0.01" id="add-ben-val" value="0.00" class="form-input">
            </div>
            <div class="row-flex" style="margin-top:10px;">
                <button class="btn btn-primary flex-grow" onclick="addNewField('${srv.id}', 'beneficios')">Salvar Benefício</button>
                <button class="btn btn-secondary" onclick="closeAddFieldForm('beneficios')">Cancelar</button>
            </div>
        </div>
    `;
    return html;
}

function renderResumoForm(srv) {
    return `
        <div class="form-group">
            <label class="form-label">Taxa de Administração Mensal (R$)</label>
            <input type="number" step="0.01" class="form-input" value="${srv.resumo.taxaAdmin}" 
                   onchange="updateResumoParam('${srv.id}', 'taxaAdmin', this.value)">
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Alíquota de Impostos (%)</label>
                <input type="number" step="0.001" class="form-input" value="${srv.resumo.impostoAliquota}" 
                       onchange="updateResumoParam('${srv.id}', 'impostoAliquota', this.value)">
            </div>
            <div class="form-group">
                <label class="form-label">Tipo de Cálculo</label>
                <select class="form-select" onchange="updateResumoParam('${srv.id}', 'impostoTipo', this.value)">
                    <option value="por-dentro" ${srv.resumo.impostoTipo === 'por-dentro' ? 'selected' : ''}>Imposto por Dentro (Padrão)</option>
                    <option value="simples" ${srv.resumo.impostoTipo === 'simples' ? 'selected' : ''}>Imposto Simples</option>
                </select>
            </div>
        </div>
        <small class="formula-tooltip">
            ${srv.resumo.impostoTipo === 'por-dentro' 
                ? 'Cálculo por Dentro: (Custo + Taxa) / (1 - Alíquota) - (Custo + Taxa). É o cálculo oficial da Nota Fiscal de serviços.'
                : 'Cálculo Simples: (Custo + Taxa) * Alíquota. Imposto incidindo apenas diretamente sobre o custo bruto.'
            }
        </small>
    `;
}

// 7. RENDERIZADORES DA PROPOSTA COMERCIAL (PREVIEW DIREITA)

function renderScopePreview() {
    const container = document.getElementById('bind-escopo-container');
    const activeKeys = Object.keys(proposalState.services).filter(k => proposalState.services[k].enabled);
    
    if (activeKeys.length === 0) {
        container.innerHTML = '<p class="doc-paragraph" style="color:red; font-weight:bold;">[Selecione pelo menos um serviço ativo no painel de controle]</p>';
        return;
    }

    container.innerHTML = activeKeys.map(key => {
        const srv = proposalState.services[key];
        return `
            <div style="margin-bottom:12px;">
                <p style="font-size:11px; font-weight:700; color:#1a1a1a; margin-bottom:4px;">&bull; ${srv.label}:</p>
                <ul class="doc-list" style="margin-top:0px; margin-bottom:4px;">
                    ${srv.scope.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }).join('');
}

function renderDetailedCostsPreview() {
    const container = document.getElementById('bind-custos-postos-container');
    const activeKeys = Object.keys(proposalState.services).filter(k => proposalState.services[k].enabled);
    
    if (activeKeys.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    activeKeys.forEach((key, index) => {
        const srv = proposalState.services[key];
        
        html += `
            <div class="posto-detalhamento" style="${index > 0 ? 'margin-top: 25px; border-top: 1px dashed #cccccc; padding-top: 20px;' : ''}">
                <h3 style="font-family:var(--font-heading); font-size:12px; font-weight:800; color:#d4af37; margin-bottom:12px; text-transform:uppercase;">
                    ${srv.label}
                </h3>
                
                <!-- 3.1. REMUNERAÇÃO E BASE SALARIAL -->
                <div class="doc-table-wrapper">
                    <div class="doc-table-title">3.${index*5 + 1}. REMUNERAÇÃO E BASE SALARIAL</div>
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th class="col-desc">Descrição</th>
                                <th class="col-val">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${srv.remuneracao.map(item => `
                                <tr>
                                    <td>${item.name} ${item.type === 'percentage' ? `(${formatNumber(item.value)}%)` : ''}</td>
                                    <td class="col-val">R$ ${formatNumber(item.calculated)}</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td>Base total para encargos</td>
                                <td class="col-val">R$ ${formatNumber(srv.totalBaseEncargos)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 3.2. ENCARGOS SOCIAIS -->
                <div class="doc-table-wrapper">
                    <div class="doc-table-title">3.${index*5 + 2}. ENCARGOS SOCIAIS E TRABALHISTAS (MENSAIS)</div>
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th class="col-desc">Descrição</th>
                                <th class="col-calc">Alíquota</th>
                                <th class="col-val">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${srv.encargos.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${formatNumber(item.value)}%</td>
                                    <td class="col-val">R$ ${formatNumber(item.calculated)}</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td>Subtotal Encargos Diretos</td>
                                <td>${formatNumber(srv.totalEncargosPercent)}%</td>
                                <td class="col-val">R$ ${formatNumber(srv.subtotalEncargos)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 3.3. PROVISÕES LEGAIS -->
                <div class="doc-table-wrapper">
                    <div class="doc-table-title">3.${index*5 + 3}. PROVISÕES LEGAIS (FÉRIAS E 13º)</div>
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th class="col-desc">Descrição</th>
                                <th class="col-calc">Fórmula / Referência</th>
                                <th class="col-val">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${srv.provisoes.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td style="font-size:9px; font-style:italic; color:#555;">${item.type.startsWith('formula') ? item.formulaText : `${formatNumber(item.value)}%`}</td>
                                    <td class="col-val">R$ ${formatNumber(item.calculated)}</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td>Total de Provisões</td>
                                <td>Cálculo Consolidado</td>
                                <td class="col-val">R$ ${formatNumber(srv.totalProvisoes)}</td>
                            </tr>
                            <tr class="grand-total-row">
                                <td colspan="2">Total Folha Geral (Salário + Encargos + Provisões)</td>
                                <td class="col-val">R$ ${formatNumber(srv.totalFolhaGeral)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 3.4. BENEFÍCIOS -->
                <div class="doc-table-wrapper">
                    <div class="doc-table-title">3.${index*5 + 4}. BENEFÍCIOS E INSUMOS OPERACIONAIS</div>
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th class="col-desc">Benefício</th>
                                <th class="col-calc">Detalhamento</th>
                                <th class="col-val">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${srv.beneficios.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td style="font-size:9px; color:#555;">Média mensal rateada</td>
                                    <td class="col-val">R$ ${formatNumber(item.calculated)}</td>
                                </tr>
                            `).join('')}
                            <tr class="grand-total-row">
                                <td colspan="2">Total Benefícios</td>
                                <td class="col-val">R$ ${formatNumber(srv.totalBeneficios)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 3.5. QUADRO RESUMO DO POSTO -->
                <div class="doc-table-wrapper" style="margin-top: 15px;">
                    <div class="doc-table-title">3.${index*5 + 5}. QUADRO RESUMO DO POSTO - ${srv.label.toUpperCase()}</div>
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th class="col-desc">Descrição do Item</th>
                                <th style="width: 25%; text-align: right;">Valor Unitário (R$)</th>
                                <th style="width: 15%; text-align: center;">Quantidade</th>
                                <th style="width: 30%; text-align: right;">Valor Total Mensal (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mão de Obra Operacional (Folha + Benefícios)</td>
                                <td class="col-val">R$ ${formatNumber(srv.custoTotalOperacional)}</td>
                                <td rowspan="4" style="text-align: center; font-weight: bold; vertical-align: middle; background-color: #ffffff;">
                                    <input type="number" min="1" value="${srv.quantidade}" class="doc-input-qty" onchange="updateQuantidade('${key}', this.value)">
                                </td>
                                <td class="col-val">R$ ${formatNumber(srv.custoTotalOperacional * srv.quantidade)}</td>
                            </tr>
                            <tr>
                                <td>Taxa de Administração Mensal</td>
                                <td class="col-val">R$ ${formatNumber(srv.resumo.taxaAdmin)}</td>
                                <td class="col-val">R$ ${formatNumber(Number(srv.resumo.taxaAdmin) * srv.quantidade)}</td>
                            </tr>
                            <tr>
                                <td>Impostos s/ Nota Fiscal (${formatNumber(srv.resumo.impostoAliquota)}%)</td>
                                <td class="col-val">R$ ${formatNumber(srv.impostoCalculado)}</td>
                                <td class="col-val">R$ ${formatNumber(srv.impostoCalculado * srv.quantidade)}</td>
                            </tr>
                            <tr class="grand-total-row" style="background-color: #FFFF00; color: #000000; font-weight: bold;">
                                <td>VALOR TOTAL DO POSTO</td>
                                <td class="col-val">R$ ${formatNumber(srv.totalMensalidade)}</td>
                                <td class="col-val">R$ ${formatNumber(srv.totalMensalidade * srv.quantidade)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function renderConsolidatedSummaryPreview() {
    const container = document.getElementById('bind-resumo-consolidado-container');
    const activeKeys = Object.keys(proposalState.services).filter(k => proposalState.services[k].enabled);
    
    if (activeKeys.length === 0) {
        container.innerHTML = '<p class="doc-paragraph" style="color:red;">Nenhum serviço ativo para consolidar.</p>';
        return;
    }

    // Gerar linhas da tabela para cada serviço ativo
    let trsHtml = '';
    let totalGeralMaoDeObra = 0;
    let totalGeralTaxaAdmin = 0;
    let totalGeralImpostos = 0;
    let totalGeralProposta = 0;

    activeKeys.forEach(key => {
        const srv = proposalState.services[key];
        
        totalGeralMaoDeObra += srv.custoTotalOperacional * srv.quantidade;
        totalGeralTaxaAdmin += Number(srv.resumo.taxaAdmin) * srv.quantidade;
        totalGeralImpostos += srv.impostoCalculado * srv.quantidade;
        totalGeralProposta += srv.totalMensalidade * srv.quantidade;

        trsHtml += `
            <tr style="border-bottom:1px dashed #ddd;">
                <td style="font-weight:bold;">${srv.label}</td>
                <td style="text-align:center; font-weight:bold;">
                    <input type="number" min="1" value="${srv.quantidade}" class="doc-input-qty" onchange="updateQuantidade('${key}', this.value)">
                </td>
                <td class="col-val">
                    <div>R$ ${formatNumber(srv.custoTotalOperacional)}</div>
                    <div style="font-size:8px; color:#666; font-weight:normal;">Tot: R$ ${formatNumber(srv.custoTotalOperacional * srv.quantidade)}</div>
                </td>
                <td class="col-val">
                    <div>R$ ${formatNumber(srv.resumo.taxaAdmin)}</div>
                    <div style="font-size:8px; color:#666; font-weight:normal;">Tot: R$ ${formatNumber(Number(srv.resumo.taxaAdmin) * srv.quantidade)}</div>
                </td>
                <td class="col-val">
                    <div>R$ ${formatNumber(srv.impostoCalculado)} <span style="color:#666; font-size:8px;">(${formatNumber(srv.resumo.impostoAliquota)}%)</span></div>
                    <div style="font-size:8px; color:#666; font-weight:normal;">Tot: R$ ${formatNumber(srv.impostoCalculado * srv.quantidade)}</div>
                </td>
                <td class="col-val" style="font-weight:700;">
                    <div>R$ ${formatNumber(srv.totalMensalidade)}</div>
                    <div style="font-size:8px; color:#c59b27; font-weight:bold;">Tot: R$ ${formatNumber(srv.totalMensalidade * srv.quantidade)}</div>
                </td>
            </tr>
        `;
    });

    const multiplePosts = activeKeys.length > 1;

    let html = `
        <table class="doc-table consolidated-table">
            <thead>
                <tr>
                    <th style="width: 25%;">Serviço / Posto</th>
                    <th style="width: 8%; text-align: center;">Qtd</th>
                    <th style="width: 17%; text-align: right;">Mão Obra (Unit/Tot)</th>
                    <th style="width: 16%; text-align: right;">Taxa Admin (Unit/Tot)</th>
                    <th style="width: 17%; text-align: right;">Impostos (Unit/Tot)</th>
                    <th style="width: 17%; text-align: right;">Valor Mensal (Unit/Tot)</th>
                </tr>
            </thead>
            <tbody>
                ${trsHtml}
                ${multiplePosts ? `
                    <tr class="grand-total-row" style="background-color: #f1f1f1;">
                        <td>SUBTOTAIS ACUMULADOS</td>
                        <td style="text-align:center; font-weight:bold;">-</td>
                        <td class="col-val">R$ ${formatNumber(totalGeralMaoDeObra)}</td>
                        <td class="col-val">R$ ${formatNumber(totalGeralTaxaAdmin)}</td>
                        <td class="col-val">R$ ${formatNumber(totalGeralImpostos)}</td>
                        <td class="col-val" style="color:var(--gold-hover);">R$ ${formatNumber(totalGeralProposta)}</td>
                    </tr>
                ` : ''}
                <tr class="grand-total-row" style="background-color: #e5c158; color:#000000; font-size:12px;">
                    <td colspan="5" style="text-align: right; text-transform: uppercase; font-weight:800; font-family:var(--font-heading);">VALOR TOTAL DA MENSALIDADE DA PROPOSTA</td>
                    <td class="col-val" style="font-weight:800; font-size:13px; border:2px solid #000;">R$ ${formatNumber(totalGeralProposta)}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

function renderComparativeAnalysisPreview() {
    const section = document.getElementById('doc-section-analise-comparativa');
    const textBind = document.getElementById('bind-text-analise-comparativa');
    const container = document.getElementById('bind-analise-comparativa-dados');
    
    if (!proposalState.showAnaliseComparativa) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    textBind.textContent = proposalState.textAnaliseComparativa;
    
    // Para a análise comparativa, usaremos o posto 'servicos-gerais' (ou o primeiro ativo) para demonstrar a diferença com/sem acúmulo de função
    const activeKeys = Object.keys(proposalState.services).filter(k => proposalState.services[k].enabled);
    const referenceKey = activeKeys.includes('servicos-gerais') ? 'servicos-gerais' : activeKeys[0];
    
    if (!referenceKey) {
        container.innerHTML = '<p class="doc-paragraph" style="color:red; font-style:italic;">Habilite pelo menos um posto para ver a análise comparativa.</p>';
        return;
    }
    
    const srv = proposalState.services[referenceKey];
    
    // Criamos uma versão clonada e desabilitamos o acúmulo de função para fazer o cálculo comparativo
    const clonedSrv = JSON.parse(JSON.stringify(srv));
    const acumuloItemIndex = clonedSrv.remuneracao.findIndex(i => i.id === 'acumulo-funcao');
    if (acumuloItemIndex !== -1) {
        clonedSrv.remuneracao[acumuloItemIndex].value = 0; // zera o acúmulo
    }
    // Recalcula o clone
    calculateServiceCosts(clonedSrv);
    
    const valorComAcumulo = srv.totalMensalidade * srv.quantidade;
    const valorSemAcumulo = clonedSrv.totalMensalidade * srv.quantidade;
    const investimentoAdicional = valorComAcumulo - valorSemAcumulo;
    const acumuloPercent = srv.remuneracao.find(i => i.id === 'acumulo-funcao')?.value || 20;

    container.innerHTML = `
        <ul class="doc-list" style="margin-bottom:15px; font-weight:500;">
            <li><strong>Custo Total Mensal do Posto (Sem Acúmulo de Função):</strong> R$ ${formatNumber(valorSemAcumulo)}</li>
            <li><strong>Custo Total Mensal do Posto (Com Acúmulo de Função ${formatNumber(acumuloPercent)}%):</strong> R$ ${formatNumber(valorComAcumulo)}</li>
            <li><strong>Investimento Adicional Requerido para o Posto (${srv.quantidade} func.):</strong> R$ ${formatNumber(investimentoAdicional)} / Mês</li>
        </ul>
        <div class="comp-benefit-box">
            <strong>VANTAGEM LEGAL:</strong> O acúmulo de função regulariza legalmente o colaborador para exercer atividades complementares combinadas, eliminando riscos de passivos trabalhistas futuros por desvio de função e garantindo uma manutenção muito mais ágil e multifuncional no condomínio.
        </div>
    `;
}

// 8. EVENTOS E MANIPULAÇÃO DE DADOS

function setupEventListeners() {
    // Inputs gerais do cliente
    document.getElementById('client-name').addEventListener('input', (e) => {
        proposalState.clientName = e.target.value;
        document.querySelectorAll('.bind-client-name').forEach(el => el.textContent = e.target.value);
    });
    
    document.getElementById('proposal-number').addEventListener('input', (e) => {
        proposalState.proposalNumber = e.target.value;
        document.querySelectorAll('.bind-proposal-number').forEach(el => el.textContent = e.target.value);
    });
    
    proposalDateInput().addEventListener('change', (e) => {
        proposalState.date = e.target.value;
        renderUI();
    });
    
    document.getElementById('proposal-ref').addEventListener('input', (e) => {
        proposalState.reference = e.target.value;
        document.querySelectorAll('.bind-proposal-ref').forEach(el => el.textContent = e.target.value);
    });

    // Checkboxes dos Serviços / Postos
    Object.keys(proposalState.services).forEach(key => {
        const cb = srvCheckbox(key);
        if (cb) {
            cb.addEventListener('change', (e) => {
                proposalState.services[key].enabled = e.target.checked;
                renderUI();
            });
        }
    });

    // Accordions Gerais de Texto
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('open');
        });
    });

    // Eventos de Textos
    document.getElementById('text-apresentacao').addEventListener('input', (e) => {
        proposalState.textApresentacao = e.target.value;
        document.getElementById('bind-text-apresentacao').textContent = e.target.value;
    });

    document.getElementById('show-analise-comparativa').addEventListener('change', (e) => {
        proposalState.showAnaliseComparativa = e.target.checked;
        renderUI();
    });

    document.getElementById('text-analise-comparativa').addEventListener('input', (e) => {
        proposalState.textAnaliseComparativa = e.target.value;
        renderUI();
    });

    document.getElementById('text-consideracoes-gerais').addEventListener('input', (e) => {
        proposalState.textConsideracoesGerais = e.target.value;
        document.getElementById('bind-text-consideracoes-gerais').textContent = e.target.value;
    });

    // Assinatura
    document.getElementById('signer-name').addEventListener('input', (e) => {
        proposalState.signerName = e.target.value;
        document.getElementById('bind-signer-name').textContent = e.target.value;
    });
    document.getElementById('signer-phone').addEventListener('input', (e) => {
        proposalState.signerPhone = e.target.value;
        document.getElementById('bind-signer-phone').textContent = e.target.value;
    });
    document.getElementById('signer-email').addEventListener('input', (e) => {
        proposalState.signerEmail = e.target.value;
        document.getElementById('bind-signer-email').textContent = e.target.value;
    });

    // Ações de Botões (Salvar/Excluir/Imprimir/Tema)
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('print-proposal-btn').addEventListener('click', () => window.print());
    document.getElementById('save-proposal-btn').addEventListener('click', saveProposal);
    document.getElementById('load-proposal-btn').addEventListener('click', loadProposal);
    document.getElementById('delete-proposal-btn').addEventListener('click', deleteProposal);
}

// Alterna tema escuro/claro apenas no painel do editor
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    const icon = document.querySelector('#theme-toggle i');
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Troca a aba do posto em edição
function switchPostTab(key) {
    activePostTab = key;
    renderPostsConfigTabs();
}

// Atualiza o Salário Base do posto e recalcula
function updateSalarioBase(srvKey, value) {
    const srv = proposalState.services[srvKey];
    const item = srv.remuneracao.find(i => i.id === 'salario-base');
    if (item) {
        item.value = Math.max(0, Number(value));
        renderUI();
    }
}

// Atualiza a quantidade de colaboradores e recalcula
function updateQuantidade(srvKey, value) {
    const srv = proposalState.services[srvKey];
    if (srv) {
        srv.quantidade = Math.max(1, parseInt(value) || 1);
        renderUI();
    }
}

// Atualiza um campo de tabela específico
function updateRowValue(srvKey, sectionKey, rowId, value) {
    const srv = proposalState.services[srvKey];
    const item = srv[sectionKey].find(i => i.id === rowId);
    if (item) {
        item.value = Number(value);
        renderUI();
    }
}

// Atualiza um parâmetro de resumo tributário
function updateResumoParam(srvKey, paramKey, value) {
    const srv = proposalState.services[srvKey];
    srv.resumo[paramKey] = paramKey === 'impostoTipo' ? value : Number(value);
    renderUI();
}

// 9. FUNÇÕES DE ADICIONAR E REMOVER LINHAS NAS TABELAS DINAMICAMENTE

function deleteRow(srvKey, sectionKey, rowId) {
    const srv = proposalState.services[srvKey];
    srv[sectionKey] = srv[sectionKey].filter(i => i.id !== rowId);
    renderUI();
}

function openAddFieldForm(srvKey, sectionKey) {
    document.getElementById(`add-${sectionKey}-form`).classList.add('open');
}

function closeAddFieldForm(sectionKey) {
    document.getElementById(`add-${sectionKey}-form`).classList.remove('open');
}

function addNewField(srvKey, sectionKey) {
    const srv = proposalState.services[srvKey];
    const form = document.getElementById(`add-${sectionKey}-form`);
    
    let nameInput, valInput, typeSelect, includeInBaseCheck;
    const rowId = 'custom-' + Date.now();

    if (sectionKey === 'remuneracao') {
        nameInput = document.getElementById('add-rem-name');
        valInput = document.getElementById('add-rem-val');
        typeSelect = document.getElementById('add-rem-type');
        includeInBaseCheck = document.getElementById('add-rem-base');

        if (!nameInput.value.trim()) return;

        srv.remuneracao.push({
            id: rowId,
            name: nameInput.value.trim(),
            type: typeSelect.value,
            value: Number(valInput.value),
            factorField: 'salario-base',
            includeInBase: includeInBaseCheck.checked,
            editable: true,
            deletable: true
        });

        // Limpa form
        nameInput.value = '';
        valInput.value = '0';
    } else if (sectionKey === 'encargos') {
        nameInput = document.getElementById('add-enc-name');
        valInput = document.getElementById('add-enc-val');

        if (!nameInput.value.trim()) return;

        srv.encargos.push({
            id: rowId,
            name: nameInput.value.trim(),
            type: 'percentage',
            value: Number(valInput.value),
            editable: true,
            deletable: true
        });

        nameInput.value = '';
        valInput.value = '0.00';
    } else if (sectionKey === 'provisoes') {
        nameInput = document.getElementById('add-prov-name');
        valInput = document.getElementById('add-prov-val');
        typeSelect = document.getElementById('add-prov-type');

        if (!nameInput.value.trim()) return;

        srv.provisoes.push({
            id: rowId,
            name: nameInput.value.trim(),
            type: typeSelect.value,
            value: Number(valInput.value),
            editable: true,
            deletable: true
        });

        nameInput.value = '';
        valInput.value = '0.00';
    } else if (sectionKey === 'beneficios') {
        nameInput = document.getElementById('add-ben-name');
        valInput = document.getElementById('add-ben-val');

        if (!nameInput.value.trim()) return;

        srv.beneficios.push({
            id: rowId,
            name: nameInput.value.trim(),
            type: 'flat',
            value: Number(valInput.value),
            editable: true,
            deletable: true
        });

        nameInput.value = '';
        valInput.value = '0.00';
    }

    form.classList.remove('open');
    renderUI();
}

// Manipulação do Escopo de Serviços por Posto
function updateScopeItem(srvKey, index, value) {
    proposalState.services[srvKey].scope[index] = value;
    renderUI();
}

function deleteScopeItem(srvKey, index) {
    proposalState.services[srvKey].scope.splice(index, 1);
    renderUI();
}

function addScopeItem(srvKey) {
    proposalState.services[srvKey].scope.push('Nova atividade para o escopo do serviço.');
    renderUI();
}

// 10. INTEGRAÇÃO E PERSISTÊNCIA LOCAL (LOCALSTORAGE)

function saveProposal() {
    const nameInput = document.getElementById('proposal-name-input');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Por favor, insira um nome para salvar o modelo da proposta.');
        return;
    }

    let saved = localStorage.getItem('solida_propostas');
    saved = saved ? JSON.parse(saved) : {};
    
    saved[name] = proposalState;
    localStorage.setItem('solida_propostas', JSON.stringify(saved));
    
    nameInput.value = '';
    loadSavedProposalsList();
    alert(`Proposta "${name}" salva com sucesso!`);
}

function loadSavedProposalsList() {
    const select = document.getElementById('saved-proposals-select');
    let saved = localStorage.getItem('solida_propostas');
    saved = saved ? JSON.parse(saved) : {};

    select.innerHTML = '<option value="">-- Selecione uma proposta salva --</option>';
    Object.keys(saved).forEach(name => {
        select.innerHTML += `<option value="${name}">${name}</option>`;
    });
}

function loadProposal() {
    const select = document.getElementById('saved-proposals-select');
    const name = select.value;
    
    if (!name) {
        alert('Por favor, selecione uma proposta da lista para carregar.');
        return;
    }

    let saved = localStorage.getItem('solida_propostas');
    saved = saved ? JSON.parse(saved) : {};
    
    if (saved[name]) {
        // Sobrepõe o estado mantendo chaves novas caso venha de versões antigas
        proposalState = Object.assign({}, proposalState, saved[name]);
        bindStateToInputs();
        renderUI();
        alert(`Proposta "${name}" carregada com sucesso!`);
    }
}

function deleteProposal() {
    const select = document.getElementById('saved-proposals-select');
    const name = select.value;
    
    if (!name) {
        alert('Por favor, selecione uma proposta para excluir.');
        return;
    }

    if (confirm(`Tem certeza que deseja excluir permanentemente o modelo "${name}"?`)) {
        let saved = localStorage.getItem('solida_propostas');
        saved = saved ? JSON.parse(saved) : {};
        
        delete saved[name];
        localStorage.setItem('solida_propostas', JSON.stringify(saved));
        
        loadSavedProposalsList();
        alert(`Proposta "${name}" excluída.`);
    }
}

// 11. EXTRA / HELPERS DE INTERFACE

// Formata valores numéricos para moeda BRL
function formatNumber(num) {
    if (isNaN(num)) return '0,00';
    return Number(num).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3 // Suporta alíquota de impostos de 3 casas decimais se necessário
    });
}

// Atualiza o contador de páginas do documento (Apenas estético no preview)
function updatePageCounter() {
    const totalPages = document.querySelectorAll('.document-pages .page').length;
    document.querySelectorAll('.total-pages-count').forEach(el => {
        el.textContent = totalPages;
    });
}
