interface NavbarLogoProps {
  className?: string;
}

function NavbarLogo({ className }: NavbarLogoProps) {
  return (
    <img
      className={`${className}`}
      src="/images/logo.webp"
      alt="Icon jangkau by BCA"
    />
  );
}

export default NavbarLogo;
