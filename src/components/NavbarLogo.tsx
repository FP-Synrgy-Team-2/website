interface NavbarLogoProps {
    className?: string;
}

function NavbarLogo({className}: NavbarLogoProps) {
    return (
        <img className={`navbar-brand ${className}`} src="/images/logo.png" alt="Icon jangkau by BCA" />
    )
}

export default NavbarLogo;