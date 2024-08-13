import { FaLaptopCode, FaShippingFast, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  return (
    <div className="p-5 outline outline-1 outline-black flex flex-row justify-between items-center">
      <Link href="/">
        <div className="flex flex-row justify-center items-center">
          <FaLaptopCode className="text-3xl text-indigo-600" />
          <h1 className="font-extrabold text-3xl">TECHFREAK</h1>
        </div>
      </Link>
      <Link href={"/cart"}>
        <FaShoppingCart className="text-3xl" />
      </Link>
    </div>
  );
}
