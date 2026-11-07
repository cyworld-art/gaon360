// GAONVYRA 360 — bilingual-ready content (KO / EN).
// All demos are labeled Concept or Simulation. No commercial offers, no medical claims.

export type Lang = 'ko' | 'en';
export type L = Record<Lang, string>;
export type DemoLabel = 'Concept' | 'Simulation';

export const CONTACT_EMAIL = 'gaon360.admin@gmail.com';

export type Tech = {
  id: string;
  route: string;
  icon: 'cpu' | 'microchip' | 'heart' | 'brain' | 'circuit' | 'layers';
  title: string;
  eyebrow: string;
  desc: L;
  topics: string[];
  demos: { label: DemoLabel; text: L }[];
};

export const techs: Tech[] = [
  {
    id: 'npu', route: '/npu', icon: 'cpu', title: 'NPU & AI SDK', eyebrow: 'NEURAL PROCESSING',
    desc: {
      ko: 'NPU 드라이버·런타임·API와 딥러닝 모델의 엣지 배포 워크플로를 탐구합니다.',
      en: 'Exploring NPU drivers, runtimes, APIs and the edge deployment workflow for deep-learning models.',
    },
    topics: ['C/C++ · Python SDK', 'NPU Runtime & Driver', 'Model Compilation', 'INT8 Quantization'],
    demos: [
      { label: 'Concept', text: { ko: '공개 NPU SDK 구조 분석 노트', en: 'Study notes on public NPU SDK structure' } },
      { label: 'Simulation', text: { ko: '추론 파이프라인 시뮬레이션', en: 'Inference pipeline simulation' } },
    ],
  },
  {
    id: 'firmware', route: '/firmware', icon: 'microchip', title: '8/16/32-bit MCU Firmware', eyebrow: 'LOW-LEVEL ENGINEERING',
    desc: {
      ko: '초소형 8-bit MCU부터 RTOS 기반 32-bit 플랫폼까지 하드웨어에 가까운 펌웨어 기술을 다룹니다.',
      en: 'Close-to-the-metal firmware from tiny 8-bit MCUs to RTOS-based 32-bit platforms.',
    },
    topics: ['8-bit AVR', '16-bit MSP430', '32-bit ARM Cortex-M', 'Bare-metal · RTOS · Bootloader'],
    demos: [
      { label: 'Concept', text: { ko: 'UART · SPI · I²C · CAN 드라이버 구조', en: 'UART · SPI · I²C · CAN driver architecture' } },
      { label: 'Simulation', text: { ko: '센서 수집 및 통신 시뮬레이션', en: 'Sensor acquisition & bus simulation' } },
    ],
  },
  {
    id: 'healthcare', route: '/healthcare', icon: 'heart', title: 'Healthcare Technology', eyebrow: 'SYNTHETIC DATA ONLY',
    desc: {
      ko: '합성(가상) 생체신호만 사용하는 임베디드 신호처리 교육용 시연입니다. 의료기기가 아니며 진단·치료 목적이 없습니다.',
      en: 'An educational embedded signal-processing demo using synthetic signals only. Not a medical device; no diagnostic or treatment purpose.',
    },
    topics: ['Synthetic ECG · PPG', 'Wearable Sensor Interface', 'Digital Filtering (DSP)', 'Monitoring UI'],
    demos: [
      { label: 'Simulation', text: { ko: '합성 PPG/ECG 파형 생성기', en: 'Synthetic PPG/ECG waveform generator' } },
      { label: 'Concept', text: { ko: '개인정보 비수집 데이터 흐름 설계', en: 'No-personal-data pipeline design' } },
    ],
  },
  {
    id: 'inference', route: '/inference', icon: 'brain', title: 'AI Model Inference', eyebrow: 'INTELLIGENCE AT THE EDGE',
    desc: {
      ko: '모델 변환·양자화·최적화와 영상·센서 기반 엣지 추론을 연구합니다.',
      en: 'Model conversion, quantization, optimization and vision/sensor inference at the edge.',
    },
    topics: ['ONNX Models', 'Model Conversion', 'Real-time Inference', 'Benchmark & Evaluation'],
    demos: [
      { label: 'Simulation', text: { ko: '컴퓨터비전 추론 흐름 시뮬레이션', en: 'Computer-vision inference flow simulation' } },
      { label: 'Concept', text: { ko: '엣지 모델 성능 비교 방법론', en: 'Edge model benchmarking methodology' } },
    ],
  },
  {
    id: 'hardware', route: '/hardware', icon: 'circuit', title: 'Embedded Hardware', eyebrow: 'CIRCUITS TO SYSTEMS',
    desc: {
      ko: '회로도·PCB 아트웍부터 MCU/NPU 통합과 센서 인터페이스까지 확장합니다.',
      en: 'From schematics and PCB artwork to MCU/NPU integration and sensor interfaces.',
    },
    topics: ['Schematic & PCB', 'MCU · NPU Board', 'Power & Signal Integrity', 'Sensor Interface'],
    demos: [
      { label: 'Concept', text: { ko: '개념 엣지 보드 블록도', en: 'Concept edge-board block diagram' } },
      { label: 'Concept', text: { ko: '전원·인터페이스 설계 체크리스트', en: 'Power & interface design checklist' } },
    ],
  },
  {
    id: 'integration', route: '/integration', icon: 'layers', title: 'End-to-End System Integration', eyebrow: '360° ENGINEERING',
    desc: {
      ko: '펌웨어, 장치 API, 데이터베이스와 웹 대시보드를 하나의 시스템으로 연결합니다.',
      en: 'Connecting firmware, device APIs, databases and web dashboards into one system.',
    },
    topics: ['Device API', 'Data Pipeline', 'Dashboard', 'Testing & Validation'],
    demos: [
      { label: 'Simulation', text: { ko: 'IoT 텔레메트리 시뮬레이션', en: 'IoT telemetry simulation' } },
      { label: 'Concept', text: { ko: '웹 기반 기술 포트폴리오 아키텍처', en: 'Web-based portfolio architecture' } },
    ],
  },
];

export const projects: { title: string; label: DemoLabel; type: string; desc: L; chips: string[] }[] = [
  { title: 'NPU Vision Pipeline', label: 'Concept', type: 'NPU / AI',
    desc: { ko: '영상 입력부터 NPU 추론·결과 시각화까지의 기술 흐름을 설명하는 개념 설계입니다.', en: 'A concept design describing the flow from camera input through NPU inference to visualization.' },
    chips: ['NPU SDK', 'ONNX', 'Python'] },
  { title: '32-bit Sensor Gateway', label: 'Simulation', type: 'Firmware',
    desc: { ko: 'Cortex-M 계열 MCU와 센서·통신 인터페이스의 가상 연동 시뮬레이션입니다.', en: 'A virtual simulation of a Cortex-M MCU talking to sensors and buses.' },
    chips: ['Cortex-M', 'RTOS', 'I²C'] },
  { title: 'Healthcare Signal Lab', label: 'Simulation', type: 'Healthcare',
    desc: { ko: '실제 환자 데이터 없이 합성 PPG/ECG 신호로만 필터링 흐름을 시연합니다.', en: 'Demonstrates filtering using synthetic PPG/ECG only — no real patient data.' },
    chips: ['Synthetic PPG', 'DSP', 'Web UI'] },
  { title: 'Embedded Edge Node', label: 'Concept', type: 'Hardware',
    desc: { ko: 'MCU + NPU + 통신 모듈을 결합한 개념 하드웨어 플랫폼입니다.', en: 'A concept hardware platform combining MCU, NPU and a radio module.' },
    chips: ['PCB', 'MCU', 'NPU'] },
];

export const notes: { name: L; detail: string }[] = [
  { name: { ko: '공개 NPU SDK 탐색', en: 'Exploring a public NPU SDK' }, detail: 'SDK · Runtime · Compiler · Model Zoo' },
  { name: { ko: 'MCU 통신 프로토콜 비교', en: 'Comparing MCU bus protocols' }, detail: 'UART · SPI · I²C · CAN' },
  { name: { ko: '헬스케어 신호 시뮬레이션 원칙', en: 'Principles for health-signal simulation' }, detail: 'Synthetic signals · No personal data' },
  { name: { ko: '임베디드 보드 설계 체크리스트', en: 'Embedded board design checklist' }, detail: 'Power · Interfaces · PCB' },
];

export const nav: { key: string; label: string; href: string }[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'brand', label: 'Brand', href: '/brand' },
  { key: 'npu', label: 'NPU & AI', href: '/npu' },
  { key: 'firmware', label: 'Firmware', href: '/firmware' },
  { key: 'healthcare', label: 'Healthcare', href: '/healthcare' },
  { key: 'hardware', label: 'Embedded', href: '/hardware' },
  { key: 'projects', label: 'Projects', href: '/projects' },
  { key: 'notes', label: 'Tech Notes', href: '/notes' },
];

// UI dictionary
export const t = {
  topbarLeft: { ko: '연구·시연 프로젝트', en: 'RESEARCH & DEMONSTRATION' },
  topbarRight: { ko: '가상 기술 플랫폼 · 공식 제휴 없음', en: 'FICTIONAL TECH PLATFORM · NO OFFICIAL AFFILIATION' },
  heroDesc: {
    ko: '8-bit 펌웨어부터 NPU 기반 Edge AI까지 — 하드웨어와 인공지능의 경계를 잇는 통합 엔지니어링 포트폴리오.',
    en: 'From 8-bit firmware to NPU-powered edge AI — an engineering portfolio bridging hardware and intelligence.',
  },
  exploreProjects: { ko: '프로젝트 보기', en: 'Explore Projects' },
  discoverBrand: { ko: '브랜드 이야기', en: 'Discover the Brand' },
  capTitle: { ko: '하나의 플랫폼, 모든 계층.', en: 'One platform. Every layer.' },
  capDesc: { ko: '회로·펌웨어·NPU·애플리케이션까지 전 계층을 연결합니다.', en: 'Circuits, firmware, NPUs and applications — connected end to end.' },
  projTitle: { ko: '진행 중인 엔지니어링.', en: 'Engineering in progress.' },
  projDesc: { ko: '모든 데모는 Concept 또는 Simulation으로 표시되며 실제 상용 제품이 아닙니다.', en: 'Every demo is labeled Concept or Simulation — none are commercial products.' },
  viewAll: { ko: '전체 프로젝트', en: 'View all projects' },
  readMore: { ko: '자세히 보기', en: 'Learn more' },
  philosophy: { ko: 'GAONVYRA 360은 하드웨어와 인공지능을 잇는 가상 기술 시연 프로젝트입니다.', en: 'GAONVYRA 360 is a fictional technical demonstration bridging hardware and intelligence.' },
  ourPhilosophy: { ko: '브랜드 철학', en: 'Our Philosophy' },
  coreTopics: { ko: '핵심 주제', en: 'Core Topics' },
  researchDemos: { ko: '연구 & 데모', en: 'Research & Demos' },
  detailFine: { ko: '이 페이지는 포트폴리오·교육용 기술 소개이며, 기술 사양은 개별 프로젝트에서 별도로 검증해야 합니다.', en: 'This page is an educational portfolio overview; specifications must be verified per project.' },
  techNotes: { ko: '기술 노트', en: 'Tech Notes' },
  healthBanner: {
    ko: '합성 데이터 전용 · 의료기기 아님 · 진단/치료/건강 판단에 사용 금지 · 실제 환자 정보 업로드 금지',
    en: 'Synthetic data only · Not a medical device · Not for diagnosis, treatment or health decisions · Never upload real patient data',
  },
  footerDisclaimer: {
    ko: '본 사이트는 가상(fictional) 기술 시연 프로젝트입니다. 의료 서비스를 제공하지 않으며, 언급된 어떤 기업·기관과도 공식 제휴 관계가 없습니다.',
    en: 'This site is a fictional technical demo. It offers no medical services and has no official affiliation with any company or organization mentioned.',
  },
  contact: { ko: '대표 연락처', en: 'Contact' },
  notFound: { ko: '페이지를 찾을 수 없습니다.', en: 'Page not found.' },
  home: { ko: '홈으로', en: 'Go home' },
} satisfies Record<string, L>;
