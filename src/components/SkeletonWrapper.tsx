import { PropsWithChildren } from "react"

const SkeletonWrapper = ({ children }: PropsWithChildren) => {
    return (
        <figure className="flex" aria-label="Loading">
            {children}
            <figcaption className="visually-hidden">Loading</figcaption>
        </figure>
    )
}

export default SkeletonWrapper