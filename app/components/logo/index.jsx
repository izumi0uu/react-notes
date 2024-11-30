import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="link--unstyled">
      <section className="sidebar-header">
        <img
          className="logo"
          src="/logo.svg"
          width="22px"
          height="20px"
          alt=""
          role="presentation"
        />
        <strong>React Notes</strong>
      </section>
    </Link>
  );
};

export default Logo;
