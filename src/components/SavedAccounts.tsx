import { FC, useState } from "react"
import SavedAccountCard from "./SavedAccountCard"

type Account = {
    name: string,
    image: string
}

type SavedAccountsProp = {
    accounts?: Account[]
}

const savedAccounts: Account[] = [
    {name: 'Maxine', image: '/images/max.png'},
    {name: 'Oscar', image: ''},
    {name: 'Kevin', image: ''},
    {name: 'Stanley', image: ''},
    {name: 'Chloe', image: '/images/vite.svg'}
]

const SavedAccounts: FC<SavedAccountsProp> = ({ accounts }) => {
    const [accs, setAccs] = useState(accounts || savedAccounts)

    return (
        <div className="w-55 flex flex-col gap-4.5">
            <p className="text-xl">REKENING TERSIMPAN</p>
            <div className="flex flex-wrap justify-between gap-y-5">
                {accs.map((a, i) => (
                    <SavedAccountCard image={a.image} name={a.name} key={i} />
                ))}
            </div>
        </div>
    )
}

export default SavedAccounts