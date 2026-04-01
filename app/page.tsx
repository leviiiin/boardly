import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-gray-100 to-green-300">
      <Navbar />

      <main className="container m-auto pt-10">
        <section className="flex gap-50 mt-25 mx-50">
          <div className="max-w-150">
            <h1 className="text-5xl font-semibold text-gray-800 leading-14">Capture, organize, and tackle your to-dos from anywhere.</h1>
            <p className="text-gray-600 mt-3 text-2xl leading-8">
              Escape the clutter and chaos—unleash your productivity with <span className="font-semibold text-green-700 pb-[2px] border-b-3 border-green-700">Boardly</span>.
            </p>
            <div className="mt-5">
              <SignedIn>
                <Link href="/dashboard" className="block mt-5">
                  <Button variant="default" className="bg-green-600 text-white hover:bg-green-400 hover:text-green-800 text-xl pt-6 pb-7 px-12!">
                    <LayoutDashboard className="mr-1 w-4 h-4 size-6! max-sm:mr-0" strokeWidth={2} />
                    Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-up">
                  <Button variant="default" className="bg-green-600 text-white hover:bg-green-400 hover:text-green-800 text-xl pt-6 pb-7 px-12">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>
          <div className="relative w-50 h-100">
            <Image src="/iphone_14-pro-max.jpg" alt="Mobile Website" width={200} height={400} className="rounded-[32px] absolute z-2" />
            <div className="absolute w-25 h-25 bg-green-400 rounded-full -top-[15%] -right-[20%] z-1" />
            <div className="absolute w-25 h-25 bg-green-500 -bottom-[13%] -left-[20%] z-1" />
            <div className="w-0 h-0 border-l-80 border-l-transparent border-r-80 border-r-transparent border-b-80 border-b-green-600 absolute z-2 -bottom-[10%] -right-[32%] rotate-135" />
          </div>
        </section>
      </main>
    </div>
  );
}
