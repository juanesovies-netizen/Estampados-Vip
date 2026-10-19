/**
 * Servicio de autenticación SIMULADO (sin backend).
 *
 * Imita el comportamiento de una API real: latencia, contraseñas con hash,
 * sesiones con expiración, "recordarme" y bloqueo tras intentos fallidos.
 * Los datos viven en el navegador (localStorage), por lo que NO es seguro
 * para producción: reemplazar estas funciones por llamadas a un backend
 * (Firebase Auth, Supabase, API propia...) manteniendo la misma interfaz.
 */
import { uid } from '../lib/storage';

const USERS_KEY = 'vipwear.v2.users';
const SESSION_KEY = 'vipwear.v2.session';
const ATTEMPTS_KEY = 'vipwear.v2.loginAttempts';

const MAX_ATTEMPTS = 5;
const LOCK_MS = 5 * 60 * 1000;
const SESSION_SHORT_MS = 12 * 60 * 60 * 1000; // 12 h
const SESSION_LONG_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

export const DEMO_PASSWORD = 'Demo1234';
export const DEMO_ACCOUNTS = [
  { id: 'u_demo_buyer', name: 'Sofía Morales', email: 'comprador@vipwear.co', role: 'buyer' },
  {
    id: 'u_demo_seller',
    name: 'Mateo Ruiz',
    email: 'vendedor@vipwear.co',
    role: 'seller',
    creatorId: 'c2',
    storeName: 'Studio Kanso',
  },
];

export class AuthError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'AuthError';
    this.field = field;
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const readJSON = (storage, key, fallback) => {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const readUsers = () => readJSON(localStorage, USERS_KEY, []);
const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
const readAttempts = () => readJSON(localStorage, ATTEMPTS_KEY, {});
const writeAttempts = (attempts) => localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));

async function hashPassword(password) {
  const data = `vipwear::${password}`;
  if (globalThis.crypto?.subtle) {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Contextos no seguros (http por IP de red) no exponen crypto.subtle.
  let hash = 0;
  for (const char of data) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return `weak_${hash}`;
}

async function ensureSeedUsers() {
  const users = readUsers();
  if (users.some((u) => u.id === 'u_demo_buyer')) return users;
  const passwordHash = await hashPassword(DEMO_PASSWORD);
  const seeded = [
    ...users,
    ...DEMO_ACCOUNTS.map((account) => ({ ...account, passwordHash, createdAt: new Date().toISOString() })),
  ];
  writeUsers(seeded);
  return seeded;
}

// eslint-disable-next-line no-unused-vars
const toPublicUser = ({ passwordHash, ...user }) => user;

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function createSession(user, remember) {
  clearSession();
  const session = {
    token: uid('tok'),
    userId: user.id,
    expiresAt: Date.now() + (remember ? SESSION_LONG_MS : SESSION_SHORT_MS),
  };
  // "Recordarme" persiste entre cierres del navegador; si no, solo dura la pestaña.
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
}

export async function getCurrentUser() {
  await ensureSeedUsers();
  const session = readJSON(localStorage, SESSION_KEY, null) ?? readJSON(sessionStorage, SESSION_KEY, null);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    clearSession();
    return null;
  }
  const user = readUsers().find((u) => u.id === session.userId);
  return user ? toPublicUser(user) : null;
}

export async function login({ email, password, remember = false }) {
  await wait(700);
  const users = await ensureSeedUsers();
  const key = email.trim().toLowerCase();
  const attempts = readAttempts();
  const record = attempts[key];

  if (record?.lockedUntil && record.lockedUntil > Date.now()) {
    const minutes = Math.ceil((record.lockedUntil - Date.now()) / 60000);
    throw new AuthError(`Demasiados intentos fallidos. Intenta de nuevo en ${minutes} min.`);
  }

  const user = users.find((u) => u.email === key);
  const valid = user && user.passwordHash === (await hashPassword(password));

  if (!valid) {
    const count = (record?.lockedUntil ? 0 : record?.count ?? 0) + 1;
    if (count >= MAX_ATTEMPTS) {
      attempts[key] = { count: 0, lockedUntil: Date.now() + LOCK_MS };
      writeAttempts(attempts);
      throw new AuthError('Demasiados intentos fallidos. Por seguridad, bloqueamos el acceso durante 5 minutos.');
    }
    attempts[key] = { count };
    writeAttempts(attempts);
    const left = MAX_ATTEMPTS - count;
    // Mensaje genérico: no revela si el correo existe.
    throw new AuthError(
      `Correo o contraseña incorrectos.${left <= 2 ? ` Te queda${left === 1 ? '' : 'n'} ${left} intento${left === 1 ? '' : 's'}.` : ''}`,
    );
  }

  delete attempts[key];
  writeAttempts(attempts);
  createSession(user, remember);
  return toPublicUser(user);
}

export async function register({ name, email, password, role, storeName }) {
  await wait(800);
  const users = await ensureSeedUsers();
  const key = email.trim().toLowerCase();
  if (users.some((u) => u.email === key)) {
    throw new AuthError('Ya existe una cuenta con este correo. ¿Quieres iniciar sesión?', 'email');
  }
  const id = uid('u');
  const user = {
    id,
    name: name.trim(),
    email: key,
    role,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
    ...(role === 'seller' ? { creatorId: `cr_${id}`, storeName: storeName.trim() } : {}),
  };
  writeUsers([...users, user]);
  createSession(user, false);
  return toPublicUser(user);
}

export async function requestPasswordReset() {
  // Siempre responde igual para no revelar qué correos están registrados.
  await wait(900);
  return true;
}

export async function updateProfile(userId, changes) {
  await wait(500);
  const users = readUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index < 0) throw new AuthError('No encontramos tu cuenta. Vuelve a iniciar sesión.');
  users[index] = { ...users[index], ...changes };
  writeUsers(users);
  return toPublicUser(users[index]);
}

export async function logout() {
  await wait(150);
  clearSession();
}
