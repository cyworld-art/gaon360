"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Github, LogOut, Mail, Menu, ShieldCheck, UserRound, X } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';
import { CONTACT_EMAIL, nav, t, techs } from '@/lib/content';
import { LangProvider, useLang } from '@/lib/i18n';
import { About, Brand, Homepage, Notes, Privacy, Projects, TechDetail } from './pages';
import { Account, Admin, AuthPage } from './auth';

export default function Site({ section }: { section?: string }) {
  return <LangProvider><Shell section={section} /></LangProvider>;
}

function Shell({ section }: { section?: string }) {
  const pathname = usePathname();
  const active = section || pathname.split('/')[1] || 'home';
  const { lang, setLang, tr } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const supabase = getSupabase();

  useEffect(() => {
    if (!supabase) { setAuthReady(true); return; }
    void supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, [supabase]);

  async function logout() { if (supabase) { await supabase.auth.signOut(); setSession(null); } }

  const tech = techs.find(x => x.id === active);
  const isActive = (key: string) => key === active ? 'active' : '';

  let page: React.ReactNode;
  switch (active) {
    case 'home': page = <Homepage />; break;
    case 'brand': page = <Brand />; break;
    case 'about': page = <About />; break;
    case 'projects': page = <Projects />; break;
    case 'notes': page = <Notes />; break;
    case 'privacy': page = <Privacy />; break;
    case 'login': page = <AuthPage onSignedIn={() => { window.location.href = '/account'; }} />; break;
    case 'account': page = authReady ? <Account session={session} /> : null; break;
    case 'admin': page = authReady ? <Admin session={session} /> : null; break;
    default: page = tech ? <TechDetail tech={tech} /> : (
      <div className="container inner-page"><h1>{tr(t.notFound)}</h1><Link className="btn-outline" href="/">{tr(t.home)}</Link></div>
    );
  }

  return (
    <>
      <div className="topbar">
        <span><span className="signal" /> {tr(t.topbarLeft)}</span>
        <span>{tr(t.topbarRight)}</span>
      </div>
      <header className="header">
        <Link className="logo" href="/" aria-label="GAONVYRA 360 home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-mark" src="/brand/mark.svg" alt="" width={40} height={40} />
          <span className="logo-word"><span className="w-gaon">GAON</span><span className="w-vyra">VYRA</span> <b>360</b><small>ALL-ROUND EMBEDDED &amp; AI TECHNOLOGY</small></span>
        </Link>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main">
          {nav.map(item => <Link key={item.href} className={isActive(item.key)} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
          <Link className={'nav-admin ' + isActive('admin')} href="/admin" onClick={() => setMenuOpen(false)}><ShieldCheck size={13} /> Admin</Link>
        </nav>
        <div className="header-right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === 'ko' ? 'on' : ''} onClick={() => setLang('ko')} aria-pressed={lang === 'ko'}>KO</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
          </div>
          {session ? (
            <>
              <Link className="header-account" href="/account" title="Account" aria-label="Account"><UserRound size={18} /></Link>
              <button className="logout" onClick={logout} title="Log out" aria-label="Log out"><LogOut size={18} /></button>
            </>
          ) : <Link className="login-link" href="/login">Login <ArrowRight size={15} /></Link>}
          <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>
      <main>{page}</main>
      <footer className="footer">
        <div className="container footer-main">
          <div>
            <Link href="/" className="footer-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/brand/mark.svg" alt="" width={34} height={34} /><span className="logo-word"><span className="w-gaon">GAON</span><span className="w-vyra">VYRA</span> <b>360</b></span></Link>
            <p>All-Round Embedded &amp; AI Technology</p>
            <p className="footer-disclaimer">{tr(t.footerDisclaimer)}</p>
          </div>
          <div>
            <strong>EXPLORE</strong>
            <Link href="/about">About</Link><Link href="/brand">Brand</Link><Link href="/projects">Projects</Link><Link href="/notes">Tech Notes</Link>
          </div>
          <div>
            <strong>PLATFORM</strong>
            <Link href="/login">Member Portal</Link><Link href="/admin">Admin</Link><Link href="/privacy">Privacy Notice</Link>
          </div>
          <div>
            <strong>{tr(t.contact).toUpperCase()}</strong>
            <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={14} /> {CONTACT_EMAIL}</a>
            <a href="https://github.com/DEEPX-AI" rel="noopener noreferrer" target="_blank"><Github size={14} /> Public NPU SDK reference</a>
            <span className="footer-small">{lang === 'ko' ? '외부 저장소 인용 시 원 라이선스를 따릅니다. 공식 제휴 아님.' : 'External repos are cited under their own licenses. Not affiliated.'}</span>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>© 2026 GAONVYRA 360 · FICTIONAL TECHNICAL DEMO · NO OFFICIAL AFFILIATION</span>
          <span>ALL DEMOS: CONCEPT / SIMULATION</span>
        </div>
      </footer>
    </>
  );
}
