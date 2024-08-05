import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import bannerSVG from '@/assets/banner.svg';

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
        1500
      );
    };

    fetch();
  }, []);

  return bannerContents ? (
    <section
      className="dash-banner"
      role="banner"
      style={{ backgroundImage: `url(${bannerSVG})` }}
      aria-labelledby="banner-text"
      aria-label={bannerContents.ariaLabel}
      tabIndex={0}
    >
      <article className="flex w-85 flex-col gap-3.75 self-center">
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
    <Skeleton className="h-50.75 w-155" />
  );
};

export default Banner;
