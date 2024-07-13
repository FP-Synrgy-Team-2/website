import Banner from "../components/Banner";
import SavedAccounts from "../components/SavedAccounts";
import dashboardSVG from '../assets/dashboard.svg'

function Dashboard(){
    return (
        <main id="dashboard-main" className="helper-box" style={{backgroundImage: `url(${dashboardSVG})`}}>
            <div className="flex w-265 justify-between">
                <div className="h-full w-96 helper-box" />
                <Banner />
            </div>
            <div className="flex w-265 justify-between">
                <div className="w-182.5 helper-box" />
                <SavedAccounts />
            </div>
        </main>
    )
}

export default Dashboard;