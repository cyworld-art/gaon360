"use client";
import Link from 'next/link';
import { Activity, AlertTriangle, ArrowRight, BookOpen, BrainCircuit, CheckCircle, ChevronRight, CircuitBoard, Cpu, HeartPulse, Layers, Mail } from 'lucide-react';
import { CONTACT_EMAIL, notes, projects, t, techs, type Tech } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { ChipArt, PcbBackdrop, SyntheticWave } from './visuals';
import { DemoBadge, SectionTitle } from './ui';

const icons = { cpu: Cpu, microchip: Cpu, heart: HeartPulse, brain: BrainCircuit, circuit: CircuitBoard, layers: Layers };
function TechIcon({ tech, size = 23 }: { tech: Tech; size?: number }) {
  const C = icons[tech.icon] ?? Cpu;
  return <C size={size} strokeWidth={1.8} />;
}

export function TechCards() {
  const { tr } = useLang();
  return (
    <div className="tech-grid">
      {techs.map((x, i) => (
        <Link href={x.route} className="tech-card" key={x.id}>
          <span className="card-index">0{i + 1}</span>
          <span className="tech-icon"><TechIcon tech={x} /></span>
          <span className="tech-eyebrow">{x.eyebrow}</span>
          <h3>{x.title}</h3>
          <p>{tr(x.desc)}</p>
          <span className="read-more">{tr(t.readMore)} <ArrowRight size={16} /></span>
        </Link>
      ))}
    </div>
  );
}

export function ProjectCards() {
  const { tr } = useLang();
  const art = [BrainCircuit, Cpu, Activity, CircuitBoard];
  return (
    <div className="project-grid">
      {projects.map((p, i) => {
        const A = art[i];
        return (
          <article key={p.title} className="project-card">
            <div className={'project-art project-art-' + i}>
              <PcbBackdrop className="mini" />
              <span className="art-index">0{i + 1} / R&amp;D</span>
              <DemoBadge label={p.label} />
              <A size={72} strokeWidth={1.2} />
            </div>
            <div className="project-content">
              <span className="eyebrow">{p.type}</span>
              <h3>{p.title}</h3>
              <p>{tr(p.desc)}</p>
              <div className="chips">{p.chips.map(c => <span key={c}>{c}</span>)}</div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function Homepage() {
  const { tr } = useLang();
  return (
    <>
      <section className="hero">
        <PcbBackdrop />
        <div className="hero-content">
          <div className="hero-kicker"><span className="signal" /> ENGINEERING WITHOUT BOUNDARIES <span className="version">FICTIONAL LAB / 2026</span></div>
          <h1>All-Round<br /><em>Embedded &amp; AI</em><br />Technology<span className="cursor">_</span></h1>
          <p className="hero-description">{tr(t.heroDesc)}</p>
          <div className="hero-actions">
            <Link className="btn-primary" href="/projects">{tr(t.exploreProjects)} <ArrowRight size={18} /></Link>
            <Link href="/brand" className="btn-outline">{tr(t.discoverBrand)} <ChevronRight size={16} /></Link>
          </div>
          <div className="hero-stats">
            <div><strong>06</strong><span>TECH DOMAINS</span></div>
            <div><strong>8–32</strong><span>BIT FIRMWARE</span></div>
            <div><strong>360°</strong><span>END-TO-END</span></div>
          </div>
        </div>
        <div className="hero-art"><ChipArt /></div>
      </section>
      <div className="domain-strip" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map(k => <span key={k}>NPU SDK ◆ MCU FIRMWARE ◆ SYNTHETIC HEALTH SIGNALS ◆ AI INFERENCE ◆ EMBEDDED HARDWARE ◆ SYSTEM INTEGRATION ◆ </span>)}
        </div>
      </div>
      <section className="section container">
        <SectionTitle label="01 / CAPABILITIES" title={tr(t.capTitle)} desc={tr(t.capDesc)} />
        <TechCards />
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionTitle label="02 / SELECTED PROJECTS" title={tr(t.projTitle)} desc={tr(t.projDesc)} />
          <ProjectCards />
          <div className="center-action"><Link href="/projects" className="btn-outline">{tr(t.viewAll)} <ArrowRight size={17} /></Link></div>
        </div>
      </section>
      <section className="cta container">
        <div>
          <span className="eyebrow">03 / PHILOSOPHY</span>
          <h2>Built from bits.<br /><span>Driven by intelligence.</span></h2>
          <p>{tr(t.philosophy)}</p>
        </div>
        <Link href="/brand" className="btn-primary">{tr(t.ourPhilosophy)} <ArrowRight size={18} /></Link>
      </section>
    </>
  );
}

export function Brand() {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const parts = [
    { a: 'GAON', sub: ko ? '중심 · 연결' : 'Center · Connection',
      c: ko ? '순우리말 "가온(가운데)"에서 온 이름으로, 모든 기술 계층의 중심에서 서로를 잇는다는 뜻을 담았습니다.' : 'From the Korean word "gaon" (center). It stands for sitting at the center of every technology layer and connecting them.' },
    { a: 'VYRA', sub: 'Versatile Yield through Research & Advancement',
      c: ko ? '"연구와 진보를 통한 다재다능한 성과"라는 뜻으로 브랜드가 만든 조어(coined phrase)입니다. 실제 기관명이나 약어가 아닙니다.' : 'A coined phrase created for this brand — not the name or acronym of any real organization.' },
    { a: '360°', sub: 'All-Round · End-to-End',
      c: ko ? '회로·펌웨어·NPU·AI·애플리케이션까지 한 바퀴를 모두 다룬다는 전방위 통합 엔지니어링을 의미합니다.' : 'A full circle of engineering — circuits, firmware, NPUs, AI and applications, end to end.' },
  ];
  return (
    <div className="container inner-page">
      <SectionTitle label="THE BRAND / IDENTITY" title="GAONVYRA 360" desc="All-Round Embedded & AI Technology" />
      <div className="brand-showcase">
        <PcbBackdrop />
        <div className="brand-mark"><span>GAON</span><span className="vyra">VYRA</span><strong>360<span className="degree">°</span></strong></div>
        <p>FROM 8-BIT FIRMWARE TO EDGE AI</p>
      </div>
      <div className="brand-grid">
        {parts.map((x, i) => (
          <article className="brand-part" key={x.a}>
            <span className="eyebrow">COMPONENT 0{i + 1}</span>
            <h3>{x.a}</h3>
            <h4>{x.sub}</h4>
            <p>{x.c}</p>
          </article>
        ))}
      </div>
      <div className="notice"><AlertTriangle size={20} /><div>
        <strong>{ko ? '상표 등록 상태: 미확인' : 'Trademark status: unverified'}</strong>
        <p>{ko ? '이 명칭은 비상업적 가상 프로젝트 브랜드이며 등록상표 또는 어떤 기업과의 공식 제휴를 의미하지 않습니다.' : 'This is a fictional, non-commercial project brand. It is not a registered trademark and implies no official affiliation with any company.'}</p>
      </div></div>
    </div>
  );
}

export function TechDetail({ tech }: { tech: Tech }) {
  const { tr, lang } = useLang();
  const health = tech.id === 'healthcare';
  return (
    <div className="container inner-page">
      {health && <div className="health-banner" role="note"><HeartPulse size={18} /> {tr(t.healthBanner)}</div>}
      <div className="detail-heading">
        <span className="tech-icon"><TechIcon tech={tech} size={36} /></span>
        <div><span className="eyebrow">TECH DOMAIN / {tech.eyebrow}</span><h1>{tech.title}</h1><p>{tr(tech.desc)}</p></div>
      </div>
      {health && (
        <div className="wave-panel">
          <div className="wave-head"><span className="eyebrow">SYNTHETIC PPG · ECG</span><span className="demo-badge sim">SIMULATION</span></div>
          <div className="wave-row ppg"><span>PPG*</span><SyntheticWave kind="ppg" /></div>
          <div className="wave-row ecg"><span>ECG*</span><SyntheticWave kind="ecg" /></div>
          <p className="fine-print">{lang === 'ko' ? '* 수학 함수로 생성한 가상 파형입니다. 실제 사람의 측정값이 아니며 어떠한 건강 상태도 나타내지 않습니다.' : '* Mathematically generated waveforms. Not measured from any person and indicative of no health condition.'}</p>
        </div>
      )}
      <div className="detail-grid">
        <article className="panel">
          <h2>{tr(t.coreTopics)}</h2>
          {tech.topics.map((v, i) => <div className="topic-row" key={v}><span>0{i + 1}</span><strong>{v}</strong><ArrowRight size={16} /></div>)}
        </article>
        <article className="panel">
          <h2>{tr(t.researchDemos)}</h2>
          {tech.demos.map(d => <div className="bullet-item" key={d.text.en}><CheckCircle size={18} /><span>{tr(d.text)}</span><DemoBadge label={d.label} /></div>)}
          <p className="fine-print">{tr(t.detailFine)}</p>
        </article>
      </div>
      <div className="detail-bottom">
        <Link href="/projects" className="btn-primary">{tr(t.exploreProjects)} <ArrowRight size={16} /></Link>
        <Link href="/notes" className="btn-outline">{tr(t.techNotes)} <BookOpen size={16} /></Link>
      </div>
    </div>
  );
}

export function About() {
  const { lang } = useLang();
  const ko = lang === 'ko';
  return (
    <div className="container inner-page">
      <SectionTitle label="ABOUT / MISSION" title="Intelligence across every layer."
        desc={ko ? 'GAONVYRA 360은 하드웨어, 펌웨어, 엣지 AI, 헬스케어 신호처리 기술의 접점을 탐구하는 비상업적 가상 기술기업 프로젝트입니다.' : 'GAONVYRA 360 is a non-commercial, fictional technology company project exploring where hardware, firmware, edge AI and health-signal processing meet.'} />
      <div className="about-panel">
        <h3>{ko ? '무엇을 다루나요' : 'What we build'}</h3>
        <p>{ko ? 'MCU 펌웨어부터 NPU API·SDK, 모델 추론, PCB 설계, 합성 생체신호 시뮬레이션까지 학습·개발 사례를 구조적으로 정리합니다.' : 'We organize learning and development work from MCU firmware to NPU APIs/SDKs, model inference, PCB design and synthetic bio-signal simulation.'}</p>
        <h3>{ko ? '하지 않는 것' : 'What we do not do'}</h3>
        <p>{ko ? '영업, 계약, 결제, 유료 서비스, 의료 진단 서비스는 제공하지 않습니다. 모든 데모는 Concept 또는 Simulation으로 구분합니다.' : 'No sales, contracts, payments, paid services or medical diagnosis. Every demo is labeled Concept or Simulation.'}</p>
        <h3>{ko ? '연락' : 'Contact'}</h3>
        <p><a className="mail-link" href={`mailto:${CONTACT_EMAIL}`}><Mail size={15} /> {CONTACT_EMAIL}</a></p>
      </div>
      <TechCards />
    </div>
  );
}

export function Projects() {
  const { lang } = useLang();
  return (
    <div className="container inner-page">
      <SectionTitle label="OUR WORK / ARCHIVE" title="Projects & Demos" desc={lang === 'ko' ? '모든 항목은 Concept(개념 설계) 또는 Simulation(가상 시뮬레이션)이며 실제 제품이 아닙니다.' : 'Every item is a Concept (design study) or Simulation (virtual model) — not a real product.'} />
      <ProjectCards />
    </div>
  );
}

export function Notes() {
  const { tr, lang } = useLang();
  return (
    <div className="container inner-page">
      <SectionTitle label="KNOWLEDGE BASE" title="Tech Notes" desc={lang === 'ko' ? '학습·연구 자료를 정리하는 기술 노트 공간입니다.' : 'A space for study and research notes.'} />
      <div className="notes-list">
        {notes.map((v, i) => (
          <article className="note" key={v.name.en}>
            <span>0{i + 1}</span>
            <div><h3>{tr(v.name)}</h3><p>{v.detail}</p></div>
            <span className="project-tag">PLANNED</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Privacy() {
  const { lang } = useLang();
  const ko = lang === 'ko';
  return (
    <div className="container inner-page">
      <SectionTitle label="POLICY · DRAFT" title={ko ? '개인정보 처리 안내 (초안)' : 'Privacy Notice (draft)'} desc={ko ? '비상업적 기술 시연 사이트의 개인정보 최소 수집 원칙' : 'Minimal data collection for a non-commercial demo site'} />
      <div className="about-panel">
        <h3>{ko ? '수집 정보' : 'Data collected'}</h3>
        <p>{ko ? '회원가입 시 이메일, 선택한 표시 이름, Supabase가 생성한 회원 ID·가입일·마지막 로그인 시각을 사용합니다.' : 'Email, optional display name, and the member ID, sign-up date and last sign-in time generated by Supabase.'}</p>
        <h3>{ko ? '이용 목적' : 'Purpose'}</h3>
        <p>{ko ? '로그인, 계정 관리, 관리자 가입자 현황 확인에만 사용합니다. 건강정보·환자정보·결제정보는 수집하지 않습니다.' : 'Login, account management and admin member overview only. No health, patient or payment data is collected.'}</p>
        <h3>{ko ? '처리 및 보관' : 'Processing & storage'}</h3>
        <p>{ko ? 'Supabase Auth 및 PostgreSQL(서울 리전)에 저장하며, 전체 회원 목록은 관리자에게만 공개됩니다.' : 'Stored in Supabase Auth and PostgreSQL (Seoul region). The full member list is visible to admins only.'}</p>
        <h3>{ko ? '문의 및 삭제 요청' : 'Contact & deletion'}</h3>
        <p><a className="mail-link" href={`mailto:${CONTACT_EMAIL}`}><Mail size={15} /> {CONTACT_EMAIL}</a></p>
        <p className="fine-print">{ko ? '공개 운영 전 개인정보 보호책임자, 보유·파기 기간, 국외 이전/위탁 등 법정 고지사항을 보완해야 합니다.' : 'Before public launch, add the data-protection officer, retention periods and any cross-border transfer notices required by law.'}</p>
      </div>
    </div>
  );
}
