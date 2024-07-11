import Banner from "./Banner"
import SavedAccountCard from "./SavedAccountCard"
import ServiceCard from "./ServiceCard"
import transferSVG from '../assets/arrow-up-down.svg'
import reactSVG from '../assets/react.svg'
import maxPNG from '../assets/max.png'

const DashboardMain = () => {

    return (
        <div className="dash-main">
            <div className="w-161 flex flex-col content-center gap-11.25">
                <Banner  />
                <div className="flex flex-col gap-5">
                    <p className="text-ac-dark-grey text-sm font-medium">Rekening Tersimpan</p>
                    <div className="flex flex-wrap gap-5">
                        <SavedAccountCard image={maxPNG} name="Max"/>
                        <SavedAccountCard image="" name="Alex"/>
                        <SavedAccountCard image={reactSVG} name="Ryan"/>
                        <SavedAccountCard image="" name="Kevin"/>
                        <SavedAccountCard image="" name="Darryl"/>
                        <SavedAccountCard image="" name="Chloe"/>
                        <SavedAccountCard image="" name="Oscar"/>
                        <SavedAccountCard image="" name="Sean"/>
                        <SavedAccountCard image="" name="Stanley"/>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <p className="text-ac-dark-grey text-sm font-medium">Layanan</p>
                    <div className="flex flex-wrap gap-5">
                        <ServiceCard image={transferSVG} serviceName="Transfer"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardMain