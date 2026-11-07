import type { DemoLabel } from '@/lib/content';

export function SectionTitle({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

export function DemoBadge({ label }: { label: DemoLabel }) {
  return <span className={'demo-badge ' + (label === 'Simulation' ? 'sim' : 'concept')}>{label.toUpperCase()}</span>;
}
