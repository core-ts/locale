import {currencyResources} from './CurrencyResources';

let initCurrency = false;
const cr: any = {};

interface CurrencyAlias {
  a?: string;
  b: number;
  c: string;
}

export interface Currency {
  currencyCode?: string;
  decimalDigits: number;
  currencySymbol: string;
}

function initCurrencyResources() {
  const keys = Object.keys(currencyResources);
  for (const key of keys) {
    const x: CurrencyAlias = currencyResources[key];
    const currency: Currency = {
      currencyCode: key,
      decimalDigits: (x.b?x.b:2),
      currencySymbol: x.c
    };
    cr[key] = currency;
  }
}

export interface CurrencyService {
  getCurrency(currencyCode: string): Currency;
}

export class DefaultCurrencyService implements CurrencyService {
  getCurrency(currencyCode: string): Currency {
    if (!currencyCode) {
      return null;
    }
    const code = currencyCode.toUpperCase();
    if (!initCurrency) {
      initCurrencyResources();
      initCurrency = true;
    }
    const c = cr[code];
    return c;
  }
}
