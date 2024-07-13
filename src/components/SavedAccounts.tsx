import { useEffect, useState } from "react"
import SavedAccountCard from "./SavedAccountCard"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export type Account = {
    name: string,
    image: string
}

const SavedAccounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([])

    const data = [
        {name: 'Maxine', image: '/images/max.png'},
        {name: 'Oscar', image: ''},
        {name: 'Kevin', image: ''},
        {name: 'Stanley', image: ''},
        {name: 'Chloe', image: '/images/vite.svg'},
        {name: 'Dwight', image: ''},
        {name: 'Violet', image: ''},
        {name: 'Darryl', image: ''},
        {name: 'Caitlyn', image: ''},
        {name: 'Leslie', image: ''},
        {name: 'Franklin', image: ''},
        {name: 'Ron', image: ''},
        {name: 'Donna', image: ''}
    ]    

    useEffect(() => {
        const populate = async () => {
            setTimeout(() => setAccounts(data), 3000)
        }

        populate()
    }, [])
      
    return (
        <section className="flex flex-col gap-4.5 mt-2.5" id='saved-accounts' aria-label="Dafter Rekening Tersimpan">
            <h2 className="text-xl">REKENING TERSIMPAN</h2>
            <ul className="flex h-full flex-wrap justify-between gap-y-5 overflow-y-scroll snap-y snap-mandatory">
                {accounts.length != 0 ? 
                    accounts.map((a, i) => (
                        <SavedAccountCard image={a.image} name={a.name} key={i} index={i + 1} />
                    )) : 
                    <Skeleton className="rounded-xl h-27.5 w-25" containerClassName="flex flex-wrap justify-between w-full gap-y-5" count={6}/>
                }
            </ul>
        </section>
    )
}

export default SavedAccounts
