function Login() {
    return (
        <div className="relative flex justify-between w-full h-screen">
            <img src="" alt="icon jangkau by bca" aria-label="icon jangkau by bca" className="
            absolute top-[50px] left-[68px]
            flex flex-col items-end
            w-[60px] h-5
            " />
            <form className="
                flex flex-col justify-center gap-y-10
                pl-[133px]
            ">
                <div className="
                    flex flex-col gap-y-5
                    w-[348px]
                ">
                    <h1 className="text-[36px] font-bold">
                        Masuk ke akun anda
                    </h1>
                    <span className="text-lg-body text-black text-opacity-40">
                        Nikmati kemudahan mengelola keuangan Anda kapan saja
                    </span>
                </div>
                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-2.5">
                        <label htmlFor="username" className="text-xl-body">
                            Username
                        </label>
                        <div className="relative">
                            <input type="text" id="username"  placeholder="Masukkan username anda" className="
                                w-full h-[55px]
                                pl-10
                                border border-black border-opacity-40
                                rounded-[5px]
                                placeholder:text-lg-body placeholder:text-black placeholder:text-opacity-40
                            " />
                            <div className="absolute top-0 left-2.5 flex items-center h-[55px]">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.3746 16.671C16.8353 16.575 17.1097 16.0929 16.8808 15.6818C16.3761 14.7754 15.5811 13.9789 14.5641 13.3719C13.2542 12.5902 11.6494 12.1665 9.99835 12.1665C8.34734 12.1665 6.74247 12.5902 5.43264 13.3719C4.41561 13.9789 3.62059 14.7754 3.11594 15.6818C2.88703 16.0929 3.16139 16.575 3.62207 16.671C7.82774 17.5475 12.169 17.5475 16.3746 16.671Z" fill="#0066AE"/>
                                    <ellipse cx="9.9987" cy="7.16667" rx="4.16667" ry="4.16667" fill="#0066AE"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2.5">
                        <label htmlFor="password" className="text-xl-body">
                            Password
                        </label>
                        <div className="relative">
                            <input type="text" id="password"  placeholder="Masukkan password anda" className="
                                w-full h-[55px]
                                pl-10
                                border border-black border-opacity-40
                                rounded-[5px]
                                placeholder:text-lg-body placeholder:text-black placeholder:text-opacity-40
                            " />
                            <div className="absolute top-0 left-2.5 flex items-center h-[55px]">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3346 7.16667V6.33333C13.3346 4.49239 11.8423 3 10.0013 3V3C8.16035 3 6.66797 4.49239 6.66797 6.33333V7.16667" stroke="#0066AE" strokeWidth="2" strokeLinecap="round"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.05332 7.59748C2.5 8.37731 2.5 9.48175 2.5 11.6906C2.5 14.6358 2.5 16.1084 3.23776 17.1482C3.49808 17.5151 3.81843 17.8354 4.18531 18.0957C5.22509 18.8335 6.69768 18.8335 9.64286 18.8335H10.3571C13.3023 18.8335 14.7749 18.8335 15.8147 18.0957C16.1816 17.8354 16.5019 17.5151 16.7622 17.1482C17.5 16.1084 17.5 14.6358 17.5 11.6906C17.5 9.48175 17.5 8.37731 16.9467 7.59748C16.7514 7.32232 16.5112 7.08205 16.236 6.88681C15.4562 6.3335 14.3517 6.3335 12.1429 6.3335H7.85714C5.64826 6.3335 4.54381 6.3335 3.76399 6.88681C3.48882 7.08205 3.24856 7.32232 3.05332 7.59748ZM10 12.6668C10.2761 12.6668 10.5 12.443 10.5 12.1668C10.5 11.8907 10.2761 11.6668 10 11.6668C9.72386 11.6668 9.5 11.8907 9.5 12.1668C9.5 12.443 9.72386 12.6668 10 12.6668ZM12.5 12.1668C12.5 13.192 11.883 14.073 11 14.4588V16.3335H9V14.4588C8.11705 14.073 7.5 13.192 7.5 12.1668C7.5 10.7861 8.61929 9.66683 10 9.66683C11.3807 9.66683 12.5 10.7861 12.5 12.1668Z" fill="#0066AE"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="
                    flex justify-center items-center
                    h-[60px]
                    border border-black border-opacity-40
                    rounded-[5px]
                    bg-primary-dark-blue
                    text-xl-body font-bold text-primary-light-blue
                ">
                    Masuk
                </button>
            </form>
            <div className="w-auto h-full">
                <img src="images/login/login_image.webp" alt="" className="w-full h-full" />
            </div>
        </div>
    )
}

export default Login;