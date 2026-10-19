import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageOff, Star } from 'lucide-react';
import { initials } from '../../lib/format';
import Button from './Button';

const TONES = {
  amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  blue: 'bg-sky-50 text-sky-800 ring-sky-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
  green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  violet: 'bg-violet-50 text-violet-800 ring-violet-200',
  stone: 'bg-stone-100 text-stone-700 ring-stone-200',
  dark: 'bg-ink text-paper ring-ink',
};

export function Badge({ tone = 'stone', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ map, status }) {
  const meta = map[status] ?? { label: status, tone: 'stone' };
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}

/** Imagen con carga diferida y respaldo neutro si la URL falla. */
export function SmartImage({ src, alt, className = '' }) {
  const [failedSrc, setFailedSrc] = useState(null);
  if (!src || failedSrc === src) {
    return (
      <div className={`flex items-center justify-center bg-stone-200 text-stone-400 ${className}`} aria-label={alt}>
        <ImageOff className="h-6 w-6" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} className={className} />;
}

export function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-16 w-16 text-lg', xl: 'h-24 w-24 text-2xl' };
  if (src) {
    return <SmartImage src={src} alt={name} className={`${sizes[size]} shrink-0 rounded-full object-cover ${className}`} />;
  }
  return (
    <span
      aria-label={name}
      className={`${sizes[size]} inline-flex shrink-0 items-center justify-center rounded-full bg-stone-800 font-medium text-paper ${className}`}
    >
      {initials(name)}
    </span>
  );
}

export function Rating({ value, count }) {
  if (!value) return <span className="text-xs text-stone-400">Sin reseñas aún</span>;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-stone-600">
      <Star className="h-3.5 w-3.5 fill-ink text-ink" />
      <span className="font-medium text-ink">{value.toFixed(1)}</span>
      {count != null && <span>({count})</span>}
    </span>
  );
}

export function EmptyState({ icon: Icon, title, description, action, to }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-300 px-6 py-14 text-center">
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <h3 className="font-medium text-ink">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-stone-500">{description}</p>}
      {action && to && (
        <Button to={to} variant="secondary" size="sm" className="mt-5">
          {action}
        </Button>
      )}
    </div>
  );
}

export function Logo({ className = '', light = false }) {
  return (
    <Link to="/" className={`inline-flex items-baseline gap-1 ${className}`} aria-label="VIP WEAR, ir al inicio">
      <span className={`font-display text-2xl leading-none ${light ? 'text-paper' : 'text-ink'}`}>VIP</span>
      <span className={`text-[11px] font-semibold tracking-[0.3em] ${light ? 'text-paper/80' : 'text-stone-500'}`}>
        WEAR
      </span>
    </Link>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Cargando">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-ink" />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
        {description && <p className="mt-2 text-sm text-stone-500 sm:text-base">{description}</p>}
      </div>
      {action}
    </div>
  );
}
