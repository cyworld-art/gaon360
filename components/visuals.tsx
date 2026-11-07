// Pure SVG visual motifs — no external assets, no paid libraries.

const traces = [
  'M0 120 H180 L220 160 H420 L460 120 H620',
  'M0 260 H120 L170 310 H360 L400 270 H560 L600 230 H760',
  'M0 420 H240 L290 370 H470 L510 410 H700',
  'M80 0 V90 L130 140 V300 L90 340 V520',
  'M330 0 V60 L380 110 V200 L340 240 V520',
  'M560 0 V140 L520 180 V330 L570 380 V520',
  'M760 60 H680 L640 100 V260 L690 310 H760',
];
const vias: [number, number][] = [
  [180, 120], [420, 160], [620, 120], [120, 260], [360, 310], [560, 270], [240, 420], [470, 370],
  [700, 410], [130, 140], [130, 300], [380, 110], [380, 200], [520, 180], [570, 380], [640, 100], [690, 310],
];

export function PcbBackdrop({ className = '' }: { className?: string }) {
  return (
    <svg className={'pcb-backdrop ' + className} viewBox="0 0 760 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="pcbFade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3ed5ed" stopOpacity="0" />
          <stop offset=".45" stopColor="#3ed5ed" stopOpacity=".55" />
          <stop offset="1" stopColor="#3ed5ed" stopOpacity=".2" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#pcbFade)" strokeWidth="1.4" strokeLinejoin="round">
        {traces.map(d => <path key={d} d={d} />)}
      </g>
      <g fill="none" stroke="#7ff0ff" strokeWidth="2" strokeLinecap="round" className="pcb-pulse">
        {traces.map((d, i) => <path key={d} d={d} style={{ animationDelay: `${i * 0.9}s` }} />)}
      </g>
      <g>
        {vias.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="5.5" fill="#071525" stroke="#3ed5ed" strokeOpacity=".7" strokeWidth="1.4" />
            <circle cx={x} cy={y} r="1.8" fill="#3ed5ed" fillOpacity=".8" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function ChipArt() {
  const pins = Array.from({ length: 9 }, (_, i) => 92 + i * 24);
  return (
    <svg className="chip-art" viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <radialGradient id="dieGlow" cx=".5" cy=".5" r=".6">
          <stop offset="0" stopColor="#1d6b8a" />
          <stop offset="1" stopColor="#0a1a2c" />
        </radialGradient>
        <pattern id="dieGrid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0H0V14" fill="none" stroke="#3ed5ed" strokeOpacity=".16" strokeWidth="1" />
        </pattern>
      </defs>
      {/* pins */}
      <g stroke="#6fdcef" strokeOpacity=".75" strokeWidth="4" strokeLinecap="square">
        {pins.map(p => (
          <g key={p}>
            <line x1={p} y1="46" x2={p} y2="78" /><line x1={p} y1="322" x2={p} y2="354" />
            <line x1="46" y1={p} x2="78" y2={p} /><line x1="322" y1={p} x2="354" y2={p} />
          </g>
        ))}
      </g>
      {/* package */}
      <rect x="78" y="78" width="244" height="244" rx="10" fill="#0b1626" stroke="#3ed5ed" strokeOpacity=".55" strokeWidth="1.5" />
      {/* die */}
      <rect x="118" y="118" width="164" height="164" rx="4" fill="url(#dieGlow)" stroke="#3ed5ed" strokeWidth="1.2" />
      <rect x="118" y="118" width="164" height="164" fill="url(#dieGrid)" />
      {/* functional blocks */}
      <g fill="#3ed5ed" fillOpacity=".12" stroke="#3ed5ed" strokeOpacity=".6" strokeWidth="1">
        <rect x="132" y="132" width="60" height="44" /><rect x="200" y="132" width="68" height="44" />
        <rect x="132" y="184" width="40" height="84" /><rect x="180" y="184" width="88" height="84" />
      </g>
      <g fill="#a9f3ff" fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="1">
        <text x="138" y="158">MCU</text><text x="206" y="158">NPU</text>
        <text x="136" y="230">I/O</text><text x="190" y="230">AI · DSP CORE</text>
      </g>
      <circle cx="94" cy="94" r="4" fill="#3ed5ed" />
      <text x="200" y="306" textAnchor="middle" fill="#7fb6c9" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="3">GV-360 · CONCEPT</text>
    </svg>
  );
}

/** Deterministic synthetic waveform — mathematically generated, not real physiological data. */
export function SyntheticWave({ kind = 'ppg' }: { kind?: 'ppg' | 'ecg' }) {
  const W = 600, H = 120, pts: string[] = [];
  for (let x = 0; x <= W; x += 3) {
    const ph = (x % 150) / 150;
    let y: number;
    if (kind === 'ecg') {
      y = ph > .40 && ph < .44 ? -48 * Math.sin((ph - .40) / .04 * Math.PI)
        : ph > .44 && ph < .47 ? 14 * Math.sin((ph - .44) / .03 * Math.PI)
        : ph > .62 && ph < .76 ? -10 * Math.sin((ph - .62) / .14 * Math.PI) : 0;
    } else {
      y = -34 * Math.exp(-((ph - .3) ** 2) / .006) - 12 * Math.exp(-((ph - .55) ** 2) / .004);
    }
    pts.push(`${x},${(H / 2 + 18 + y).toFixed(1)}`);
  }
  return (
    <svg className="wave" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Synthetic ${kind.toUpperCase()} waveform (simulation)`}>
      <polyline points={pts.join(' ')} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
