import { useEffect, useState } from 'react';
import bannerSVG from '../assets/banner.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type BannerContents = {
  title: string;
  subtitle: string;
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
            subtitle:
              'Nikmati kemudahan transaksi menggunakan internet banking',
            ariaLabel: 'Banner aplikasi Jangkau',
          }),
        3000
      );
    };

    fetch();
  }, []);

  return bannerContents ? (
    <section
      className="dash-banner"
      role="banner"
      style={{ backgroundImage: `url(${bannerSVG})` }}
      aria-label={bannerContents.ariaLabel}
      tabIndex={0}
    >
      <article className="flex w-85 flex-col gap-3.75 self-center">
        <h2 className="font-medium text-dark-grey">{bannerContents.title}</h2>
        <p className="text-xl font-normal">{bannerContents.subtitle}</p>
      </article>
    </section>
  ) : (
    <Skeleton className="h-50.75 w-155" />
  );
};

export default Banner;
