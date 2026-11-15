/* eslint-disable @next/next/no-img-element */
// GAON-forward wordmark: "GA[O]N" in heavy 3D type where the O is the 360° cycle ring
// with the V→Y mark, followed by a lighter "VYRA 360".

export function GaonWord({ className = '' }: { className?: string }) {
  return (
    <span className={'gaon-word ' + className} aria-label="GAON">
      <span aria-hidden="true">GA</span>
      <img className="gaon-o" src="/brand/gaon-o.svg" alt="" aria-hidden="true" />
      <span aria-hidden="true">N</span>
    </span>
  );
}

export function Wordmark({ size = 'md', stacked = false }: { size?: 'sm' | 'md' | 'lg' | 'xl'; stacked?: boolean }) {
  return (
    <span className={`wordmark wm-${size}${stacked ? ' wm-stacked' : ''}`} aria-label="GAONVYRA 360">
      <GaonWord />
      <span className="wm-sub" aria-hidden="true">
        <span className="wm-vyra">VYRA</span>
        <span className="wm-360">360</span>
      </span>
    </span>
  );
}

export function Emblem3D({ className = '', size }: { className?: string; size?: number }) {
  return <img className={'emblem-3d ' + className} src="/brand/emblem-3d.svg" alt="GAONVYRA 360 emblem" width={size} height={size} />;
}
