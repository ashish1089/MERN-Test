import Link from "next/link";
import React, { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Navbar from "./components/navbar";

interface UserInput {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [showPass, setShowPass] = useState("password");
  const [input, setInput] = useState<UserInput>({
    email: "",
    password: "",
  });
  const handleToggle = () => {
    if (showPass === "password") {
      setShowPass("text");
    } else {
      setShowPass("password");
    }
  };
  const { data: userPassword } = api.auth.login.useQuery(input);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userPassword);

    userPassword
      ? await router.push("/interest")
      : console.log("Invalid password or Email");
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-8 h-[691px] w-[576px] rounded-[20px] border-2 px-[60px] pt-8">
        <form action="post" onSubmit={handleSubmit}>
          <h1 className="pb-6 text-center text-[32px] font-semibold">Login</h1>
          <div className="mb-7 text-center">
            <h3 className="text-2xl font-medium">Welcome back to ECOMMERCE</h3>
            <p className="pt-2 text-base">The next gen business marketplace</p>
          </div>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Enter"
              required
              className="mb-7 mt-2 w-full rounded-[6px] border px-4 py-3"
            />
          </label>
          <label htmlFor="password">
            Password
            <div className="relative mb-7 mt-2 rounded-[6px] border">
              <input
                type={showPass}
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Enter"
                required
                className="w-full px-4 py-3"
              />
              <span
                className="absolute right-[12px] top-[12px] cursor-pointer underline"
                onClick={handleToggle}
              >
                {showPass === "text" ? "Hide" : "Show"}
              </span>
            </div>
          </label>

          <button className="mb-7 mt-4 h-[56px] w-[456px] rounded-[6px] bg-black text-white">
            LOGIN
          </button>
        </form>

        <hr className="border-[#c1c1c1]" />
        <p className="text- my-10 text-center text-[#333]">
          Don’t have an Account?
          <span className="ml-3 font-medium">
            <Link href="/">SIGN UP</Link>
          </span>
        </p>
      </div>
    </>
  );
}
