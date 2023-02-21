import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="py-5 border-b border-gray-200  z-10 relative">
      <div className="container flex items-center">
        <Link href="/">
          <Image
            width={190}
            height={50}
            src="/svg/life-calander-logo.svg"
            alt="logo"
          />
        </Link>
        <div className="flex-grow" />
        <ul className="flex items-center gap-3">
          <IoSunnyOutline className="text-xl cursor-pointer" />
          <IoMoonOutline className="text-xl cursor-pointer" />

          {session ? (
            <>
              {/* Account */}
              <Link href="/account">
                <button className="btn ">
                  Account
                  <Image
                    width={20}
                    height={20}
                    src={session?.user?.image ?? ""}
                    alt="avatar"
                    className="rounded-full ml-2"
                  />
                </button>
              </Link>
              {/* Logout */}
              <button onClick={() => signOut()} className="btn btn-green">
                Log out
                <IoLogOutOutline className="text-lg ml-1" />
              </button>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <button className="btn btn-green">
                Log in
                <IoPersonCircleOutline className="text-lg ml-1" />
              </button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
