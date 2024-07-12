import { FC } from "react"
import DashboardCard from "./DashboardCard"

type ServiceCardProps = {
    serviceName: string,
    image: string,
    index: number
}

const ServiceCard: FC<ServiceCardProps> = ({ serviceName, image, index }) => {
    return (
        <DashboardCard image={image} text={serviceName} size='1.875rem' alt={`${serviceName} service's icon`} index={index} />
    )
}

export default ServiceCard