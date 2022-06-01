import {Image} from '@shopify/hydrogen';
import HeroImage from '../assets/hero-2.svg';
import HeroImageSm from '../assets/hero-2-sm.svg';

/**
 * A server component that displays the content on the homepage of the Hydrogen app
 */
export default function Welcome() {
  return (
    <>
      <div className="pt-20 lg:pt-0 lg:mt-16">
        <Image
          width={1500}
          height={951}
          className="hidden lg:block h-full w-full object-cover object object-center"
          src="/assets/hero-2.svg"
          alt="Zatar Samar Hero"
        />
        <Image
          width={914}
          height={527}
          className="block lg:hidden h-full w-full object-cover object-center"
          src="/assets/hero-2-sm.svg"
          alt="Zatar Samar Hero"
        />
      </div>
    </>
  );
}
