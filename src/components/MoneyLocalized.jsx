import {useMoney, useCountry} from '@shopify/hydrogen/client';

export function MoneyLocalized({amount}) {
  const [country] = useCountry();

  const localizedString = useMoney({
    currencyCode: country.currency.isoCode,
    amount,
  }).localizedString;

  return localizedString;
}
