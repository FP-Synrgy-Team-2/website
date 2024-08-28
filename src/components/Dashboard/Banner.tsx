import { memo, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type BannerContents = {
  title: string;
  text: string;
  ariaLabel: string;
};

const Banner = () => {
  const [bannerContents, setBannerContents] = useState<BannerContents>();

  useEffect(() => {
    const fetch = async () => {
      setTimeout(
        () =>
          setBannerContents({
            title: 'Lakukan transaksi sekarang!',
            text: 'Nikmati kemudahan transaksi menggunakan internet banking',
            ariaLabel: 'Banner homepage',
          }),
        1000
      );
    };

    fetch();
  }, []);

  return bannerContents ? (
    <section
      className="sm:max-w-85 flex h-[12.5rem] min-w-[12.75] max-w-[38.75rem] shrink grow bg-[#f0f5ff] bg-contain bg-bottom bg-no-repeat p-[2.1875rem]"
      role="banner"
      style={{ backgroundImage: `url('/images/icons/banner.svg')` }}
      aria-labelledby="banner-text"
      aria-label={bannerContents.ariaLabel}
      tabIndex={0}
    >
      <article className="flex w-full flex-col gap-3.75 self-center">
        <h2 className="font-medium text-dark-grey">{bannerContents.title}</h2>
        <p
          className="text-xl font-normal"
          id="banner-text"
          aria-label={'Banner homepage' + ' ' + bannerContents.text}
        >
          {bannerContents.text}
        </p>
      </article>
    </section>
  ) : (
    <Skeleton className="sm:max-w-85 h-[12.5rem] w-[32.3dvw] max-w-[38.75rem] grow" />
  );
};

export default memo(Banner);
