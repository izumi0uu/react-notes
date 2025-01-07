import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={"/"} className="link--unstyled">
      <section className="sidebar-header">
        <Image
          className="logo"
          src="/logo.svg"
          width={22}
          height={20}
          alt="Logo"
        />
        <strong>React Notes</strong>
      </section>
    </Link>
  );
};

export default Logo;
