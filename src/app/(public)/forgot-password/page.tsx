import ForgotPassword from "@/src/sharedComponents/auth/forgot-password";
import { Suspense } from "react";

const ForgotPasswordFallback = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-bottom px-6 py-12"
      style={{
        backgroundImage: "url('/images/johnrayn_login_bg_image.png')",
      }}
    >
      <div className="w-full max-w-136 rounded-[28px] bg-white/90 px-6 py-8 shadow-[0_24px_80px_rgba(43,50,35,0.18)] backdrop-blur-md md:px-8">
        <div className="space-y-4">
          <div className="h-3 w-28 rounded-full bg-[#D9DED3]" />
          <div className="flex gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-[#424A3B]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#D9DED3]" />
          </div>
          <div className="h-8 w-56 rounded-full bg-[#E8ECE1]" />
          <div className="h-4 w-72 rounded-full bg-[#EEF2E8]" />
          <div className="mt-6 space-y-4">
            <div className="h-24 rounded-2xl bg-[#F6F8F2]" />
            <div className="h-12 rounded-xl bg-[#D5DACE]" />
            <div className="h-12 rounded-xl bg-[#EEF2E8]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordFallback />}>
      <ForgotPassword />
    </Suspense>
  );
}
