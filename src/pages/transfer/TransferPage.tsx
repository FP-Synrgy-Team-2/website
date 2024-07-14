import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SavedAccount } from "../../types/saved-accounts";

function Transfer(){
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    // WHEN THE API IS READY
    // const [savedAccounts, setSavedAccounts] = useState<SavedAccounts[] | null>(null)
    const savedAccounts: SavedAccount[] = [
        {
            account_number: "2448901238",
            owner_name: "ZAKIYANSYAH"
        },
        {
            account_number: "19827635112",
            owner_name: "JOHN"
        },
        {
            account_number: "19827635112",
            owner_name: "BUDI"
        },
        {
            account_number: "19827635112",
            owner_name: "DANI"
        },
        {
            account_number: "19827635112",
            owner_name: "DANI"
        },
    ]
    const navigate = useNavigate()

    // WHEN THE API IS READY
    // const fetchSavedAccounts = async () => {
    //     try {
    //         const response = await fetch("http://127.0.0.1:3001/saved-accounts");
    //         const res: SavedAccount[] = await response.json();
    //         setSavedAccounts(res)
    //     } catch {
    //         setSavedAccounts(null)
    //     }
    // }

    // useEffect(() => {
    //     fetchSavedAccounts()
    // }, [])

    return (
        <main className="container mx-auto bg-neutral-50 px-11 py-14">
            <section className="w-1/2">
                <h1 className="my-5 text-lg-display">Transfer</h1>
                <h2 className="my-5 text-sm-display">Rekening tujuan</h2>
                <Link to={'/transfer/new'} className="flex gap-[6px] px-4 py-3 bg-primary-blue rounded-2xl border-[0.5px] border-grey text-neutral-01 text-xs-display w-full">
                    <img src="images/icons/plus-circle.svg" alt="" />
                    Input Baru
                </Link>
                <h2 className="text-sm-display my-3">Atau pilih dari daftar rekening tersimpan</h2>
                <button onClick={() => setShowDropdown(!showDropdown)} className="bg-transparent border-[0.5px] border-grey rounded-[20px] px-4 py-6 w-full flex justify-between text-xs-display text-grey items-center">
                    Pilih nomor rekening yang tersimpan
                    <img src="images/icons/arrow_drop_down_big.svg" alt="" className={`duration-100 ease-in-out transition-transform ${showDropdown ? 'rotate-180' : ''}`}/>
                </button>
                {showDropdown && (
                    <div className="scrollbar my-4 flex flex-wrap rounded-[20px] bg-neutral-01 border-[0.5px] border-grey divide-y-[1px] divide-grey max-h-[437px] overflow-y-auto">
                        {savedAccounts ? (savedAccounts.map((account, idx) => (
                            <button onClick={() => navigate('/transfer/saved', {state: {account}})} className="w-full text-start px-4 py-6 flex flex-wrap gap-1" key={idx}>
                                <p className="w-full text-lg-body">{account.owner_name}</p>
                                <p className="w-full text-lg-body text-grey">{account.account_number}</p>
                            </button>
                        ))) : (
                            <p>Failed to fetch data</p>
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Transfer;