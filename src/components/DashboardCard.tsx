import { FC } from "react"

type DashboardCardProps = {
    text: string,
    image: string
    size: 'contain' | '2.1875rem' | '1.875rem'
}

const DashboardCard: FC<DashboardCardProps> = ({ text, image, size }) => {
    const onClick = () => {
        console.log('clicked!')
    }

    return (
        <div className="dash-card border-opacity-10 border-black" onClick={() => onClick()}>
            <div className="avatar self-center bg-pr-light-blue" style={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: size
            }}/>

            <p className="text-center text-ac-dark-grey">{text}</p>
        </div>
    )
}

export default DashboardCard