import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-stone-700',
  secondary: 'border border-stone-300 bg-white text-ink hover:border-ink',
  ghost: 'text-stone-700 hover:bg-stone-100 hover:text-ink',
  accent: 'bg-accent text-white hover:brightness-110',
  danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50',
  light: 'bg-paper text-ink hover:bg-white',
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
};

export function Spinner({ className = 'h-4 w-4' }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} inline-block animate-spin rounded-full border-2 border-current border-t-transparent`}
    />
  );
}

export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" {...props} disabled={loading || props.disabled} className={classes}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
