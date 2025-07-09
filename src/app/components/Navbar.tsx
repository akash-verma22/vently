import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo-transparent.png" alt="logo" width={75} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="w-full text-center py-2 hover:bg-gray-100 rounded">
                <span>Create</span>
              </Link>

              <form
                className="w-full"
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="w-full py-2 hover:bg-gray-100 rounded flex items-center justify-center gap-2">
                  <span>Logout</span>
                  <LogOut className="size-4 text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className="w-full text-center py-2 hover:bg-gray-100 rounded">
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              className="w-full"
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit" className="w-full py-2 hover:bg-gray-100 rounded">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;