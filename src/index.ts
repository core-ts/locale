import {DefaultCurrencyService} from './CurrencyService';
import {DefaultLocaleService} from './LocaleService';
export {Locale, LocaleService, DefaultLocaleService} from './LocaleService';
export {Currency, CurrencyService, DefaultCurrencyService} from './CurrencyService';
export const currrency = new DefaultCurrencyService();
export const locale = new DefaultLocaleService();
