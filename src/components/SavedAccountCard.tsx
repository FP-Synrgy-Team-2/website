import { FC } from "react"
import personSvg from '../assets/person-fill.svg'
import DashboardCard from "./DashboardCard"

type SavedAccountCardProps = {
    name: string,
    image: string,
    index: number
}

const SavedAccountCard: FC<SavedAccountCardProps> = ({ name, image, index }) => {
    return (
        <DashboardCard image={image ? image : personSvg} text={name} size={image ? '3.125rem' : '2.1875rem'} alt={`${name}'s avatar`} index={index} ariaLabel={`Transfer ke ${name}`} />
    )
}

export default SavedAccountCard