import React, { useState } from "react";
import OtpInput from "~/pages/components/otpInput";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Navbar from "./components/navbar";

function Verify() {
  const router = useRouter();
  const data = router.query;

  const email = data.email?.toString();
  console.log(email);
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value: string) => setOtp(value);

  const { mutate: verifyUser } = api.auth.verify.useMutation();

  const handleClick = () => {
    email && verifyUser({ email: email });

    router.replace("/login").catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
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
        <button
          className="mt-16 h-[56px] w-[456px] rounded-[6px] bg-black text-white"
          onClick={handleClick}
        >
          VERIFY
        </button>
      </div>
    </>
  );
}

export default Verify;
