import {useMemo, useCallback} from 'react';
import {useShop} from '@shopify/hydrogen/client';

export function useLocalizedAmount(currencyCode) {
  const {locale} = useShop();

  const options = useMemo(
    () => ({
      style: 'currency',
      currency: currencyCode,
    }),
    [currencyCode],
  );

  return [
    useCallback(
      (value) => new Intl.NumberFormat(locale, options).format(value),
      [locale, options],
    ),
  ];
}
