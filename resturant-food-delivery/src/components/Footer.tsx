import Link from "next/link";

const Footer = () => {
  return ( 
    <div className="h-12 md:h-24 p-4 lg:p-20 xl:p-40">
      <Link href="/">MASSIMO</Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </div>
  )
}

export default Footer;