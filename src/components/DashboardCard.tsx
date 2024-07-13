import { FC } from "react"

type DashboardCardProps = {
    text: string,
    image: string,
    alt: string,
    size: '3.125rem' | '2.1875rem' | '1.875rem',
    index: number,
    ariaLabel: string
}

const DashboardCard: FC<DashboardCardProps> = ({ text, image, alt, size, index, ariaLabel }) => {
    const onClick = () => {
        console.log('clicked!')
    }

    return (
        <li className="snap-center snap-normal dash-card border-opacity-10 border-black text-center text-dark-grey" onClick={() => onClick()} tabIndex={index} aria-label={ariaLabel} >
            <figure className="dash-avatar self-center bg-primary-light-blue">
                <img src={image} className="self-center" alt={alt} style={{ height: size, width: size }} />
            </figure>
            
            {text}
        </li>
    )
}

export default DashboardCard
