import CurrencyResources from './CurrencyResources';

export interface Currency {
  currencyCode: string;
  currencySymbol: string;
  decimalDigits: number;
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
    const c = CurrencyResources[code];
    return (c ? {currencyCode: code, currencySymbol: c.currencySymbol, decimalDigits: c.decimalDigits} : null);
  }
}
