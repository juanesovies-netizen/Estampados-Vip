export function inputClass(error) {
  return `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-400 transition focus:outline-none focus:ring-4 disabled:bg-stone-100 disabled:text-stone-500 ${
    error
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-stone-300 focus:border-ink focus:ring-stone-200/70'
  }`;
}

export function Field({ label, htmlFor, error, hint, optional = false, action, children }) {
  return (
    <div className="space-y-1.5">
      {(label || action) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <label htmlFor={htmlFor} className="text-sm font-medium text-stone-800">
              {label}
              {optional && <span className="ml-1.5 text-xs font-normal text-stone-400">(opcional)</span>}
            </label>
          )}
          {action}
        </div>
      )}
      {children}
      {error ? (
        <p id={htmlFor ? `${htmlFor}-error` : undefined} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-stone-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function Checkbox({ id, checked, onChange, children, error }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-sm text-stone-600">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-ink ${error ? 'outline outline-red-400' : ''}`}
      />
      <span>{children}</span>
    </label>
  );
}
