import bannerSVG from '../assets/banner.svg'

const Banner = () => {

    return (
        <div className="dash-banner" role='banner' style={{ backgroundImage: `url(${bannerSVG})` }}>
            <div className="flex flex-col h-full w-85 self-center justify-between">
                <p className="text-ac-dark-grey text-sm font-medium">Lakukan transaksi sekarang!</p>
                <p className="text-lg font-medium">Nikmati kemudahan transaksi menggunakan internet banking</p>
            </div>
        </div>
    )
}

export default Banner