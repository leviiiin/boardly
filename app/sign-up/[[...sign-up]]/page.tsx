import { Loader } from "@/components/ui/loader";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-green-300">
      <Suspense fallback={<Loader />}>
        <SignUp
          signInUrl="/sign-in"
        />
      </Suspense>
    </div>
  )
}