import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <Link href={"/profile"}> <button className="bg-red-500 p-2 rounded-md">Profile</button> </Link>
    </main>
  );
}
