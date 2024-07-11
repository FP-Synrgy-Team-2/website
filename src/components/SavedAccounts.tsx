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
        {name: 'Chloe', image: '/images/vite.svg'}
    ]    

    useEffect(() => {
        const populate = async () => {
            setTimeout(() => setAccounts(data), 3000)
        }

        populate()
    }, [])
      
    return (
        <div className="w-55 flex flex-col gap-4.5">
            <p className="text-xl">REKENING TERSIMPAN</p>
            <div className="flex flex-wrap justify-between gap-y-5">
                {accounts.length != 0 ? 
                    accounts.map((a, i) => (
                        <SavedAccountCard image={a.image} name={a.name} key={i} />
                    )) : 
                    <Skeleton className="rounded-xl h-27.5 w-25" containerClassName="flex flex-wrap justify-between w-full gap-y-5" count={6}/>
                }
            </div>
        </div>
    )
}

export default SavedAccounts
