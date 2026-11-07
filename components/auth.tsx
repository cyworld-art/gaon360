"use client";
// Supabase email auth, profile edit and admin member list.
// Security is enforced in the database (RLS, column grants, SECURITY DEFINER RPC) — not by this UI.
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, ShieldCheck } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';
import { CONTACT_EMAIL } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { SectionTitle } from './ui';

type Member = { id: string; email: string | null; display_name: string | null; role: string; status: string; created_at: string; last_sign_in_at: string | null };

export function AuthPage({ onSignedIn }: { onSignedIn: () => void }) {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const supabase = getSupabase();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) { setMessage(ko ? 'Supabase 연결 전입니다. README의 환경변수와 SQL을 설정해 주세요.' : 'Supabase is not connected. Configure env vars and SQL per README.'); return; }
    setBusy(true); setMessage('');
    try {
      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/account' });
        if (error) throw error;
        setMessage(ko ? '비밀번호 재설정 이메일을 발송했습니다.' : 'Password reset email sent.');
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name }, emailRedirectTo: window.location.origin + '/account' } });
        if (error) throw error;
        setMessage(ko ? '회원가입 요청이 완료되었습니다. 메일함에서 인증 링크를 확인해 주세요.' : 'Sign-up received. Please check your inbox for the confirmation link.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage(ko ? '로그인되었습니다.' : 'Signed in.');
        onSignedIn();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : ko ? '인증 오류가 발생했습니다.' : 'Authentication error.');
    } finally { setBusy(false); }
  }

  const heading = mode === 'signup' ? (ko ? '회원가입' : 'Create account') : mode === 'reset' ? (ko ? '비밀번호 재설정' : 'Reset password') : 'Welcome back.';
  return (
    <div className="container auth-wrap">
      <div className="auth-box">
        <span className="eyebrow">MEMBER PORTAL</span>
        <h1>{heading}</h1>
        <p>{ko ? 'GAONVYRA 360 기술 커뮤니티 (무료 · 비상업)' : 'GAONVYRA 360 tech community (free · non-commercial)'}</p>
        {!supabase && <div className="warn">{ko ? 'Supabase 미연결 · 화면 미리보기 모드' : 'Supabase not connected · preview mode'}</div>}
        <form onSubmit={submit}>
          {mode === 'signup' && <label>{ko ? '표시 이름' : 'Display name'}<input maxLength={70} value={name} onChange={e => setName(e.target.value)} placeholder={ko ? '선택사항' : 'Optional'} /></label>}
          <label>{ko ? '이메일' : 'Email'}<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" /></label>
          {mode !== 'reset' && <label>{ko ? '비밀번호' : 'Password'}<input required minLength={8} type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={ko ? '8자 이상' : 'At least 8 characters'} /></label>}
          {mode === 'signup' && (
            <label className="consent"><input type="checkbox" required />
              <span>{ko ? <><Link href="/privacy" target="_blank">개인정보 처리 안내</Link>를 읽고 회원가입을 위한 정보 처리에 동의합니다.</> : <>I have read the <Link href="/privacy" target="_blank">privacy notice</Link> and agree to processing for sign-up.</>}</span>
            </label>
          )}
          <button className="btn-primary full" disabled={busy} type="submit">
            {busy ? (ko ? '처리 중…' : 'Working…') : mode === 'signup' ? (ko ? '회원가입' : 'Sign up') : mode === 'reset' ? (ko ? '재설정 링크 발송' : 'Send reset link') : (ko ? '로그인' : 'Log in')} <ArrowRight size={17} />
          </button>
        </form>
        {message && <p role="status" className="form-message">{message}</p>}
        <div className="auth-switch">
          <button onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setMessage(''); }}>{mode === 'signup' ? (ko ? '이미 계정이 있나요? 로그인' : 'Have an account? Log in') : (ko ? '계정 만들기' : 'Create account')}</button>
          <button onClick={() => { setMode(mode === 'reset' ? 'login' : 'reset'); setMessage(''); }}>{mode === 'reset' ? (ko ? '로그인으로 돌아가기' : 'Back to login') : (ko ? '비밀번호 찾기' : 'Forgot password')}</button>
        </div>
      </div>
    </div>
  );
}

export function Account({ session }: { session: Session | null }) {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const supabase = getSupabase();
  const [displayName, setDisplayName] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (!session || !supabase) return;
    void supabase.from('profiles').select('display_name').eq('id', session.user.id).maybeSingle().then(({ data }) => setDisplayName(data?.display_name ?? ''));
  }, [session, supabase]);
  async function save(e: FormEvent) {
    e.preventDefault();
    if (!supabase || !session) return;
    // Only display_name is updatable — enforced by column-level GRANT + RLS.
    const { error } = await supabase.from('profiles').update({ display_name: displayName }).eq('id', session.user.id);
    setMsg(error ? error.message : ko ? '프로필을 저장했습니다.' : 'Profile saved.');
  }
  return (
    <div className="container inner-page">
      <SectionTitle label="MY ACCOUNT" title={ko ? '내 계정' : 'My account'} />
      {!session ? <div className="notice">{ko ? '로그인 후 이용할 수 있습니다.' : 'Please log in first.'} <Link href="/login">{ko ? '로그인' : 'Log in'}</Link></div> : (
        <div className="auth-box account">
          <p><strong>{ko ? '이메일' : 'Email'}:</strong> {session.user.email}</p>
          <p><strong>{ko ? '가입일' : 'Joined'}:</strong> {new Date(session.user.created_at).toLocaleDateString(ko ? 'ko-KR' : 'en-US')}</p>
          <form onSubmit={save}>
            <label>{ko ? '표시 이름' : 'Display name'}<input maxLength={70} value={displayName} onChange={e => setDisplayName(e.target.value)} /></label>
            <button type="submit" className="btn-primary">{ko ? '저장' : 'Save'}</button>
          </form>
          {msg && <p role="status" className="form-message">{msg}</p>}
          <p className="fine-print">{ko ? '계정 삭제 요청: ' : 'Account deletion requests: '}<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
      )}
    </div>
  );
}

export function Admin({ session }: { session: Session | null }) {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const loc = ko ? 'ko-KR' : 'en-US';
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const supabase = getSupabase();

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true); setError('');
      if (!session || !supabase) { setLoading(false); return; }
      const { data, error: roleError } = await supabase.from('profiles').select('role').eq('id', session.user.id).maybeSingle();
      if (!alive) return;
      if (roleError || data?.role !== 'admin') { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);
      // Server re-checks admin role inside the SECURITY DEFINER function.
      const { data: list, error: rpcError } = await supabase.rpc('admin_list_members', { p_search: q.trim(), p_limit: 20, p_offset: page * 20 });
      if (!alive) return;
      if (rpcError) { setError(rpcError.message); setMembers([]); }
      else { setMembers((list ?? []) as Member[]); setTotal(Number(list?.[0]?.total_count ?? 0)); }
      setLoading(false);
    }
    void load();
    return () => { alive = false; };
  }, [session, supabase, q, page]);

  return (
    <div className="container inner-page">
      <SectionTitle label="SECURE WORKSPACE" title="Admin Dashboard" desc={ko ? 'Supabase Auth와 데이터베이스 측 권한 검증으로 보호되는 관리자 화면' : 'Protected by Supabase Auth and database-side authorization'} />
      {!supabase ? <div className="notice">{ko ? 'Supabase 연결이 필요합니다.' : 'Supabase connection required.'}</div>
        : !session ? <div className="notice">{ko ? '관리자 로그인이 필요합니다.' : 'Admin login required.'} <Link href="/login">{ko ? '로그인' : 'Log in'}</Link></div>
        : loading ? <div className="notice">{ko ? '관리자 권한을 확인하고 있습니다…' : 'Checking permissions…'}</div>
        : !isAdmin ? <div className="notice"><ShieldCheck size={20} />{ko ? '접근 권한이 없습니다. 관리자는 SQL 콘솔에서만 지정됩니다.' : 'Access denied. Admins are assigned only via the SQL console.'}</div>
        : <>
          <div className="admin-stats">
            <article><span>{ko ? '검색 결과' : 'Results'}</span><strong>{total}</strong></article>
            <article><span>{ko ? '접근 권한' : 'Access'}</span><strong>ADMIN</strong></article>
            <article><span>{ko ? '조회 범위' : 'Scope'}</span><strong>{ko ? '가입자' : 'Members'}</strong></article>
          </div>
          <div className="admin-table">
            <div className="table-top">
              <strong>{ko ? '회원 목록' : 'Members'}</strong>
              <div className="search"><Search size={17} /><input aria-label={ko ? '회원 검색' : 'Search members'} placeholder={ko ? '이메일·이름 검색' : 'Search email or name'} value={q} onChange={e => { setQ(e.target.value); setPage(0); }} /></div>
            </div>
            {error ? <div className="notice">{ko ? '조회 오류' : 'Query error'}: {error}</div> : (
              <div className="table-scroll"><table>
                <thead><tr><th>{ko ? '이메일' : 'Email'}</th><th>{ko ? '표시 이름' : 'Name'}</th><th>{ko ? '가입일' : 'Joined'}</th><th>{ko ? '최근 로그인' : 'Last sign-in'}</th><th>{ko ? '권한' : 'Role'}</th></tr></thead>
                <tbody>
                  {members.map(m => <tr key={m.id}><td>{m.email ?? '—'}</td><td>{m.display_name || '—'}</td><td>{new Date(m.created_at).toLocaleDateString(loc)}</td><td>{m.last_sign_in_at ? new Date(m.last_sign_in_at).toLocaleDateString(loc) : '—'}</td><td><span className="role">{m.role}</span></td></tr>)}
                  {members.length === 0 && <tr><td colSpan={5}>{ko ? '조회된 회원이 없습니다.' : 'No members found.'}</td></tr>}
                </tbody>
              </table></div>
            )}
            <div className="pagination">
              <span>{ko ? `총 ${total}명 · 페이지 ${page + 1}` : `${total} total · page ${page + 1}`}</span>
              <div><button disabled={page === 0} onClick={() => setPage(v => v - 1)}>{ko ? '이전' : 'Prev'}</button><button disabled={(page + 1) * 20 >= total} onClick={() => setPage(v => v + 1)}>{ko ? '다음' : 'Next'}</button></div>
            </div>
          </div>
          <div className="notice"><ShieldCheck size={20} /><p>{ko ? '회원 이메일·로그인 기록은 관리자에게만 표시됩니다. 권한 변경은 웹에서 허용되지 않으며 SQL 콘솔에서만 수행합니다.' : 'Member emails and sign-in data are visible to admins only. Role changes are not possible from the web — SQL console only.'}</p></div>
        </>}
    </div>
  );
}
