import { FC } from "react"
import personSvg from '../assets/person-fill.svg'
import DashboardCard from "./DashboardCard"

type SavedAccountCardProps = {
    name: string,
    image: string
}

const SavedAccountCard: FC<SavedAccountCardProps> = ({ name, image }) => {
    return (
        <DashboardCard image={image ? image : personSvg} text={name} size={image ? 'contain' : '2.1875rem'}/>
    )
}

export default SavedAccountCard