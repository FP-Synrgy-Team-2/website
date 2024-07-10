import { FC } from "react"
import DashboardCard from "./DashboardCard"

type ServiceCardProps = {
    serviceName: string,
    image: string
}

const ServiceCard: FC<ServiceCardProps> = ({ serviceName, image }) => {
    return (
        <DashboardCard image={image} text={serviceName} size='1.875rem' />
    )
}

export default ServiceCard