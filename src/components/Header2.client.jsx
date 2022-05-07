/* This example requires Tailwind CSS v2.0+ */
import {useCart} from '@shopify/hydrogen/client';
import {Image, Link} from '@shopify/hydrogen/client';
import {ShoppingBagIcon} from '@heroicons/react/outline';
import ZatarSamarLogo from '../assets/zatarsamar-logo.png';
import {translations} from '../translations';

export function Header2() {
  const {totalQuantity} = useCart();

  return (
    <header className=" bg-white fixed top-0 left-0 right-0 z-10">
      <nav aria-label="Top" className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* TODO: NEEDED when we have menus */}
        {/* <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0"> */}
        <div className="border-b border-gray-200 px-4 sm:px-0 ">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-1 flex">
              <Link to="/" className="flex items-center h-8 w-auto space-x-2">
                <span className="sr-only">{translations.zatarSamar.value}</span>
                <Image
                  className="h-8 w-auto"
                  src={ZatarSamarLogo}
                  alt="Zatar Samar Logo"
                  height={8}
                  width={10}
                />
                <span className="text-lg font-bold text-stone-700">
                  {translations.zatarSamar.ar}
                </span>
              </Link>
            </div>

            {/* Menus */}
            {/* <div className="absolute bottom-0 inset-x-0 sm:static sm:flex-1 sm:self-stretch">
              <div className="border-t h-14 px-4 grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-px sm:h-full sm:border-t-0 sm:justify-center sm:overflow-visible sm:pb-0">

                {navigation.other.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div> */}

            <div className="flex-1 flex items-center justify-end">
              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-8">
                <Link to="/cart" className="group -m-2 p-2 flex items-center">
                  <ShoppingBagIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className=" rtl:mr-2 ltr:ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {totalQuantity}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
