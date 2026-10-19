import { getGarment, getPlacement } from '../data/catalog';

export const FREE_SHIPPING_FROM = 150000;
export const SHIPPING_COST = 12000;

export const COUPONS = {
  VIP10: { label: '10 % de descuento', percent: 10 },
};

export function unitPrice(product, garmentId, placementId = 'frente') {
  const garment = getGarment(garmentId);
  const placement = getPlacement(placementId);
  return product.designPrice + (garment?.basePrice ?? 0) + (placement?.priceDelta ?? 0);
}

/** Precio más bajo posible del producto (para mostrar "Desde"). */
export function fromPrice(product) {
  const prices = product.garments.map((id) => getGarment(id)?.basePrice ?? 0);
  return product.designPrice + Math.min(...prices);
}

export function computeTotals(subtotal, couponCode) {
  const coupon = couponCode ? COUPONS[couponCode] : null;
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = subtotal === 0 || afterDiscount >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  return { subtotal, discount, shipping, total: afterDiscount + shipping };
}

export function isNewProduct(product) {
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - new Date(product.createdAt).getTime() < THIRTY_DAYS;
}
