import bannerSVG from '../assets/banner.svg'

const Banner = () => {

    return (
        <div className="dash-banner" role='banner' style={{ backgroundImage: `url(${bannerSVG})` }}>
            <div className="flex flex-col w-85 self-center gap-3.75">
                <p className="text-ac-dark-grey font-medium">Lakukan transaksi sekarang!</p>
                <p className="text-xl font-normal">Nikmati kemudahan transaksi menggunakan internet banking</p>
            </div>
        </div>
    )
}

export default Banner