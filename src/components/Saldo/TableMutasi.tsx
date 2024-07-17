import sortArrow from "../../assets/icons/Sort_arrow.png"

function TableMutasi() {

    function formatNumber(num: number) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    return (
        <div className=" w-full  h-full">
            <div className="flex justify-between items-center">
                <h1 className="uppercase font-xl-body" aria-label="mutasi rekening">Mutasi Rekening</h1>
                <button className="p-2 bg-primary-blue text-neutral-01 rounded-lg font-[550] uppercase font-lg-body" aria-label="tombol tampilkan semua">Tampilkan Semua</button>
            </div>
            <div className="border border-grey rounded-lg h-auto mt-2 py-7">
            <div className="w-10/12 mx-auto flex flex-col py-4 border-b ">
                <div className="flex gap-2 items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary-light-blue text-primary-blue flex items-center justify-center">
                    <img src={sortArrow} alt="Arrow" />
                    </div>
                    <p className="font-bold text-lg-body" aria-label="Transfer">Transfer</p>
                </div>
                <div className="flex gap-2 items-center justify-between text-md-body uppercase font-regular">
                    <p>bca</p>
                    <p className=" normal-case" aria-label={"Rp. "}>Rp. {formatNumber(2000000)}</p>
                    <p className="text-grey" aria-label="tanggal"> tanggal</p>
                </div>
            </div>
            <div className="w-10/12 mx-auto flex flex-col py-4 border-b ">
                <div className="flex gap-2 items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary-light-blue text-primary-blue flex items-center justify-center">
                    <img src={sortArrow} alt="Arrow" />
                    </div>
                    <p className="font-bold text-lg-body" aria-label="Transfer">Transfer</p>
                </div>
                <div className="flex gap-2 items-center justify-between text-md-body uppercase font-regular">
                    <p>bca</p>
                    <p className=" normal-case" aria-label={"Rp. "}>Rp. {formatNumber(2000000)}</p>
                    <p className="text-grey" aria-label="tanggal"> tanggal</p>
                </div>
            </div>
            <div className="w-10/12 mx-auto flex flex-col py-4 border-b ">
                <div className="flex gap-2 items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary-light-blue text-primary-blue flex items-center justify-center">
                    <img src={sortArrow} alt="Arrow" />
                    </div>
                    <p className="font-bold text-lg-body" aria-label="Transfer">Transfer</p>
                </div>
                <div className="flex gap-2 items-center justify-between text-md-body uppercase font-regular">
                    <p>bca</p>
                    <p className=" normal-case" aria-label={"Rp. "}>Rp. {formatNumber(2000000)}</p>
                    <p className="text-grey" aria-label="tanggal"> tanggal</p>
                </div>
            </div>
            <div className="w-10/12 mx-auto flex flex-col py-4 border-b ">
                <div className="flex gap-2 items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary-light-blue text-primary-blue flex items-center justify-center">
                    <img src={sortArrow} alt="Arrow" />
                    </div>
                    <p className="font-bold text-lg-body" aria-label="Transfer">Transfer</p>
                </div>
                <div className="flex gap-2 items-center justify-between text-md-body uppercase font-regular">
                    <p>bca</p>
                    <p className=" normal-case" aria-label={"Rp. "}>Rp. {formatNumber(2000000)}</p>
                    <p className="text-grey" aria-label="tanggal"> tanggal</p>
                </div>
            </div>
            <div className="w-10/12 mx-auto flex flex-col py-4 border-b ">
                <div className="flex gap-2 items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary-light-blue text-primary-blue flex items-center justify-center">
                    <img src={sortArrow} alt="Arrow" />
                    </div>
                    <p className="font-bold text-lg-body" aria-label="Transfer">Transfer</p>
                </div>
                <div className="flex gap-2 items-center justify-between text-md-body uppercase font-regular">
                    <p>bca</p>
                    <p className=" normal-case" aria-label={"Rp. "}>Rp. {formatNumber(2000000)}</p>
                    <p className="text-grey" aria-label="tanggal"> tanggal</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default TableMutasi;
