import { Loader } from "@/components/ui/loader";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-stone-50 via-stone-50 to-teal-50">
      <Suspense fallback={<Loader/>}>
        <SignIn
          signUpUrl="/sign-up"
        />
      </Suspense>
    </div>
  )
}