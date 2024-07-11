import { FC } from "react"

type DashboardCardProps = {
    text: string,
    image: string,
    alt: string,
    size: '3.125rem' | '2.1875rem' | '1.875rem' 
}

const DashboardCard: FC<DashboardCardProps> = ({ text, image, alt, size }) => {
    const onClick = () => {
        console.log('clicked!')
    }

    return (
        <button className="dash-card border-opacity-10 border-black" onClick={() => onClick()}>
            <div className="dash-avatar self-center bg-pr-light-blue">
                <img src={image} className="self-center" alt={alt} style={{ height: size, width: size }} />
            </div>

            <p className="text-center w-full text-ac-dark-grey">{text}</p>
        </button>
    )
}

export default DashboardCard
