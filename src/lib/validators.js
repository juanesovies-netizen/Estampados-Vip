export function isEmail(value = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Requisitos mínimos de contraseña mostrados en el registro. */
export function passwordChecks(password = '') {
  return [
    { id: 'length', label: 'Mínimo 8 caracteres', ok: password.length >= 8 },
    { id: 'upper', label: 'Al menos una mayúscula', ok: /[A-ZÁÉÍÓÚÑ]/.test(password) },
    { id: 'number', label: 'Al menos un número', ok: /\d/.test(password) },
  ];
}

/** Puntaje 0–4 para la barra de seguridad de la contraseña. */
export function passwordStrength(password = '') {
  if (!password) return 0;
  const base = passwordChecks(password).filter((c) => c.ok).length;
  const bonus = password.length >= 12 && /[^A-Za-z0-9]/.test(password) ? 1 : 0;
  return Math.min(4, base + bonus);
}

/** Celular colombiano: 10 dígitos iniciando en 3. */
export function isColombianMobile(value = '') {
  return /^3\d{9}$/.test(value.replace(/\s/g, ''));
}

export function isDocumentId(value = '') {
  return /^\d{6,10}$/.test(value.replace(/[.\s]/g, ''));
}

export function isUrl(value = '') {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
