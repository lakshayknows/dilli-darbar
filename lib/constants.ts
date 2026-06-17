export const WHATSAPP_NUMBER = "919818575939";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Delhi%20Darbar!%20I%27d%20like%20to%20place%20an%20order`;
export const SWIGGY_URL = "#";
export const ZOMATO_URL = "#";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
