import React, { useState } from "react";
import OtpInput from "~/components/otpInput";
import { useRouter } from "next/router";

function Verify() {
  const router = useRouter();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value: string) => setOtp(value);

  return (
    <>
      <div className="mx-auto mt-8 h-[453px] w-[576px] rounded-[20px] border-2 px-[60px] pt-8">
        <div className="mb-12 text-center">
          <h1 className="pb-6 pt-3 text-[32px] font-semibold leading-[38.73px]">
            Verify your email
          </h1>
          <p className="text-base leading-[19.36px]">
            Enter the 8 digit code you have received on <br />
            <span className="font-medium">{email}</span>
          </p>
        </div>
        Code
        <OtpInput length={8} onChange={handleOtpChange} />
        <button className="mt-16 h-[56px] w-[456px] rounded-[6px] bg-black text-white">
          VERIFY
        </button>
      </div>
    </>
  );
}

export default Verify;
