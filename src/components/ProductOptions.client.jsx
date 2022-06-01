import {useProduct, ProductPrice} from '@shopify/hydrogen/client';
import {RadioGroup} from '@headlessui/react';
import {translations} from '../translations';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * A client component that tracks a selected variant and/or selling plan state, as well as callbacks for modifying the state
 */
export default function ProductOptions() {
  const {options, setSelectedOption, selectedOptions, variants} = useProduct();
  const hasMoreThanOneOption = options.length > 1;

  return (
    <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
      <section aria-labelledby="options-heading">
        <form>
          <div className="sm:flex sm:justify-between">
            {hasMoreThanOneOption &&
              options.map(({name, values}) => {
                const selectedOption = selectedOptions[name];
                return (
                  <RadioGroup
                    key={name}
                    value={selectedOption}
                    onChange={(val) => setSelectedOption(name, val)}
                  >
                    <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                      {translations[name]?.ar || 'No translation found'}
                    </RadioGroup.Label>
                    <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {values.map((value) => {
                        const optionValueiId = `option-${name}-${value}`;
                        return (
                          <RadioGroup.Option
                            as="div"
                            key={optionValueiId}
                            value={value}
                            className={({active}) =>
                              classNames(
                                active ? 'ring-2 ring-indigo-500' : '',
                                'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none',
                              )
                            }
                          >
                            {({active, checked}) => (
                              <>
                                <RadioGroup.Label
                                  as="p"
                                  className="text-base font-medium text-gray-900"
                                >
                                  {value}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="p"
                                  className="mt-1 text-sm text-gray-500"
                                >
                                  <ProductPrice
                                    as="span"
                                    variantId={
                                      variants.find((v) => v.title === value).id
                                    }
                                  />
                                </RadioGroup.Description>
                                <div
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-indigo-500'
                                      : 'border-transparent',
                                    'absolute -inset-px rounded-lg pointer-events-none',
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        );
                      })}
                    </div>
                  </RadioGroup>
                );
              })}
          </div>
        </form>
      </section>
    </div>
  );
}
