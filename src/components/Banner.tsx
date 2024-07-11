import { useEffect, useState } from 'react'
import bannerSVG from '../assets/banner.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type BannerContents = {
    title: string, 
    subtitle: string
}

const Banner = () => {
    const [bannerContents, setBannerContents] = useState<BannerContents>()

    useEffect(() => {
        const fetch = async () => {
            setTimeout(() => setBannerContents({
                title: 'Lakukan transaksi sekarang!',
                subtitle: 'Nikmati kemudahan transaksi menggunakan internet banking'
            }), 3000)
        }

        fetch()
    }, [])

    return bannerContents ?
        (
            <div className="dash-banner" role='banner' style={{ backgroundImage: `url(${bannerSVG})` }}>
                <div className="flex flex-col w-85 self-center gap-3.75">
                    <p className="text-ac-dark-grey font-medium">{bannerContents.title}</p>
                    <p className="text-xl font-normal">{bannerContents.subtitle}</p>
                </div>
            </div>
        ) :
        (<Skeleton className='h-50.75 w-155' />)
}

export default Banner
