export type SlideType =
  | 'cover' | 'intro' | 'image-list' | 'five-roles' | 'flow'
  | 'misalignment' | 'crisis-action' | 'data-grid' | 'xray'
  | 'research' | 'venn' | 'channels' | 'calendar' | 'plan-flow'
  | 'metrics' | 'transform' | 'case-study' | 'action-cycle'
  | 'commandments' | 'conclusion'

export interface Sector { name: string; items: string[] }
export interface CalendarRow { sector: string; items: string[] }

export interface Slide {
  id: number
  type: SlideType
  label?: string
  title?: string
  subtitle?: string
  body?: string
  quote?: string
  image?: string
  intro?: string
  statement?: string
  message?: string
  question?: string
  rule?: string
  solution?: string
  result?: string
  intersection?: string
  items?: string[]
  steps?: string[]
  points?: string[]
  actions?: string[]
  roles?: string[]
  voices?: string[]
  consequences?: string[]
  questions?: string[]
  indicators?: string[]
  discoveries?: string[]
  circles?: string[]
  external?: string[]
  internal?: string[]
  description?: string[]
  problem?: string[]
  action?: string[]
  sectors?: Sector[]
  rows?: CalendarRow[]
  lines?: string[]
}

export const SLIDES: Slide[] = [
  {
    id: 0,
    type: 'cover',
    image: '/images/cover.jpg',
    title: 'Se amanhã o Instagram acabar, sua comunicação continua existindo?',
  },
  {
    id: 1,
    type: 'intro',
    label: 'COMUNICAÇÃO PÚBLICA',
    title: 'Da divulgação à transformação da gestão',
    subtitle: 'Como a comunicação ajuda a melhorar serviços, prevenir crises e gerar resultados para a população.',
    body: 'Comunicação pública não é apenas contar o que foi feito. É ajudar a gestão a tomar melhores decisões, prestar melhores serviços e construir confiança com a população.',
  },
  {
    id: 2,
    type: 'image-list',
    image: '/images/assessor.png',
    label: 'O PROCESSO EQUIVOCADO',
    title: 'O erro mais comum',
    items: ['Fazer arte', 'Tirar foto', 'Escrever legenda', 'Publicar conteúdo'],
    body: 'Mas isso é apenas a parte final do processo. A boa comunicação começa muito antes da publicação.',
  },
  {
    id: 3,
    type: 'five-roles',
    label: 'PAPEL DO ASSESSOR',
    title: 'O papel do assessor de comunicação',
    roles: [
      'Produção de informação',
      'Planejamento',
      'Relacionamento',
      'Gestão de crise',
      'Inteligência para apoiar decisões',
    ],
    quote: 'O assessor não é apenas um divulgador. É um tradutor entre a gestão e a população.',
  },
  {
    id: 4,
    type: 'flow',
    label: 'SISTEMA',
    title: 'Comunicação é um sistema',
    image: '/images/system.png',
    steps: ['Prefeito', 'Secretaria de Comunicação', 'Secretarias', 'Assessores', 'População', 'Retorno para gestão'],
    description: [
      'Topo da hierarquia de decisão.',
      'Organiza e distribui a narrativa.',
      'Produzem informação especializada.',
      'Traduzem e entregam à população.',
      'Recebe e responde.',
      'A gestão escuta e o ciclo recomeça.',
    ],
  },
  {
    id: 5,
    type: 'misalignment',
    label: 'ALINHAMENTO',
    title: 'Por que o alinhamento é tão importante?',
    voices: ['Secretaria fala uma coisa', 'Secom fala outra', 'Prefeito fala uma terceira'],
    consequences: ['Confusão', 'Perda de credibilidade', 'Crise ampliada'],
    quote: 'A comunicação pode resolver uma crise. Mas também pode criar uma.',
  },
  {
    id: 6,
    type: 'crisis-action',
    label: 'GESTÃO DE CRISE',
    title: 'Como agir em momentos de crise',
    rule: 'Não responder imediatamente.',
    steps: [
      'Entender os fatos',
      'Levantar informações',
      'Alinhar com a Secom',
      'Definir porta-voz',
      'Definir estratégia',
    ],
    questions: ['Quem fala?', 'O que fala?', 'Quando fala?', 'Como fala?'],
  },
  {
    id: 7,
    type: 'data-grid',
    label: 'MATÉRIA-PRIMA',
    title: 'A matéria-prima da comunicação é a informação',
    intro: 'Antes de comunicar, precisamos conhecer a realidade.',
    sectors: [
      {
        name: 'Saúde',
        items: ['Quantos postos?', 'Quantos atendimentos?', 'Quantas equipes?', 'Qual fila de espera?'],
      },
      {
        name: 'Educação',
        items: ['Quantos alunos?', 'Quantas escolas?', 'Qual evasão escolar?', 'Qual índice de alfabetização?'],
      },
      {
        name: 'Esporte',
        items: ['Quantos atletas?', 'Quantos projetos?', 'Quantos participantes?'],
      },
    ],
    quote: 'Quem não conhece seus números não consegue contar sua história.',
  },
  {
    id: 8,
    type: 'xray',
    label: 'DIAGNÓSTICO',
    title: 'Construir o raio-X da secretaria',
    items: ['Estrutura', 'Serviços', 'Programas', 'Equipes', 'Equipamentos', 'Indicadores', 'Metas'],
    statement: 'Transformar informação dispersa em conhecimento organizado.',
  },
  {
    id: 9,
    type: 'research',
    label: 'INTELIGÊNCIA',
    title: 'A importância da pesquisa',
    question: 'Como a população avalia sua secretaria?',
    body: 'Muitas vezes ninguém sabe.',
    discoveries: [
      'Principais problemas',
      'Demandas reprimidas',
      'Serviços mais conhecidos',
      'Serviços menos conhecidos',
      'Pontos fortes',
      'Pontos fracos',
    ],
    quote: 'Comunicação sem pesquisa é opinião. Comunicação com pesquisa é estratégia.',
  },
  {
    id: 10,
    type: 'venn',
    label: 'AGENDA',
    title: 'O que comunicar?',
    circles: ['Necessidade da população', 'Prioridade da gestão', 'Capacidade de entrega'],
    intersection: 'Agenda de comunicação',
  },
  {
    id: 11,
    type: 'channels',
    label: 'CANAIS',
    title: 'Quais meios eu tenho?',
    external: ['Instagram', 'Facebook', 'Site', 'Rádio', 'TV', 'Blogs', 'WhatsApp'],
    internal: ['Servidores', 'Diretores', 'Coordenadores', 'Professores', 'Agentes comunitários', 'Lideranças locais'],
    message: 'Nem toda comunicação acontece nas redes sociais.',
  },
  {
    id: 12,
    type: 'calendar',
    label: 'PLANEJAMENTO',
    title: 'O calendário é seu melhor amigo',
    intro: 'Existem ações previsíveis.',
    rows: [
      { sector: 'Saúde', items: ['Vacinação', 'Outubro Rosa', 'Novembro Azul'] },
      { sector: 'Educação', items: ['Matrículas', 'Volta às aulas', 'Resultados educacionais'] },
      { sector: 'Assistência', items: ['Benefícios', 'Cadastros', 'Campanhas sociais'] },
    ],
    message: 'Planejamento reduz improviso.',
  },
  {
    id: 13,
    type: 'plan-flow',
    label: 'ESTRUTURA',
    title: 'Planejamento de comunicação',
    subtitle: 'Estrutura simples, resultado consistente.',
    steps: ['Objetivo', 'Público', 'Mensagem', 'Canais', 'Cronograma', 'Orçamento', 'Indicadores'],
  },
  {
    id: 14,
    type: 'metrics',
    label: 'MENSURAÇÃO',
    title: 'Como medir resultado?',
    intro: 'Não basta publicar. Precisamos medir.',
    indicators: ['Alcance', 'Engajamento', 'Participação', 'Comparecimento', 'Procura por serviços', 'Redução de faltas', 'Satisfação'],
    quote: 'Comunicação boa não é a que aparece mais. É a que gera resultado.',
  },
  {
    id: 15,
    type: 'transform',
    label: 'INOVAÇÃO',
    title: 'Comunicação também pode melhorar a gestão',
    subtitle: 'Quando a comunicação ajuda a criar soluções.',
    points: [
      'O assessor está próximo da população.',
      'Ele enxerga problemas.',
      'Ele identifica oportunidades.',
      'Ele pode propor soluções.',
    ],
  },
  {
    id: 16,
    type: 'case-study',
    label: 'CASO 01',
    title: 'Alimenta Marechal',
    problem: ['Gestão reconhecida por obras', 'Baixa percepção na área social'],
    action: ['Pesquisa', 'Benchmark', 'Construção de solução'],
    result: 'Programa criado e incorporado pela gestão.',
    quote: 'A comunicação ajudou a criar política pública.',
  },
  {
    id: 17,
    type: 'case-study',
    label: 'CASO 02',
    title: 'Circuito da Gestante',
    problem: ['Baixa adesão ao pré-natal'],
    solution: 'Gamificação',
    action: ['Orientação', 'Benefício', 'Item do enxoval'],
    result: 'Mais acompanhamento. Mais engajamento. Mais proteção à mãe e ao bebê.',
    quote: 'Comunicação não serviu para divulgar. Serviu para mudar comportamento.',
  },
  {
    id: 18,
    type: 'action-cycle',
    label: 'GERAÇÃO DE VALOR',
    title: 'O assessor que gera valor',
    intro: 'Ele não espera demanda.',
    actions: ['Escuta', 'Pesquisa', 'Analisa', 'Planeja', 'Propõe', 'Executa', 'Avalia'],
  },
  {
    id: 19,
    type: 'commandments',
    label: 'OS 10 MANDAMENTOS',
    title: 'Os 10 mandamentos da comunicação pública',
    items: [
      'Conheça seus números.',
      'Planeje antes de publicar.',
      'Trabalhe alinhado com a Secom.',
      'Nunca improvise em crises.',
      'Escute a população.',
      'Use pesquisa.',
      'Tenha calendário.',
      'Meça resultados.',
      'Pense além das redes sociais.',
      'Ajude a melhorar a gestão.',
    ],
  },
  {
    id: 20,
    type: 'conclusion',
    title: 'Conclusão',
    lines: [
      'Comunicação pública não é produzir conteúdo.',
      'É transformar informação em confiança.',
      'Confiança em participação.',
      'E participação em melhores resultados para a população.',
    ],
  },
]
