import { FC } from "react"
import personSvg from '../assets/person-fill.svg'
import DashboardCard from "./DashboardCard"

type SavedAccountCardProps = {
    name: string,
    image: string
}

const SavedAccountCard: FC<SavedAccountCardProps> = ({ name, image }) => {
    return (
        <DashboardCard image={image ? image : personSvg} text={name} size={image ? '3.125rem' : '2.1875rem'} alt={`${name}'s avatar`}/>
    )
}

export default SavedAccountCard