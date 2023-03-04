import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from 'react-icons/io5'

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <nav className="py-5 border-b border-gray-200  z-10 relative bg-white">
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

          {session?.user ? (
            <>
              {/* Account */}
              <Link href={`/account/${session.user.id}`}>
                <button className="btn ">
                  Account
                  <Image
                    width={20}
                    height={20}
                    src={session?.user?.image ?? ''}
                    alt="avatar"
                    className="rounded-full ml-2"
                  />
                </button>
              </Link>

              {/* Logout */}
              <button
                className="btn btn-primary"
                onClick={() =>
                  signOut({
                    callbackUrl: `/`,
                  })
                }
              >
                Log out
                <IoLogOutOutline className="text-lg ml-1" />
              </button>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <button className="btn btn-primary">
                Log in
                <IoPersonCircleOutline className="text-lg ml-1" />
              </button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
