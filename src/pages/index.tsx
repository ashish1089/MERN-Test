import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Navbar from "./components/navbar";

interface UserInput {
  username: string;
  email: string;
  password: string;
}
export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState<UserInput>({
    username: "",
    email: "",
    password: "",
  });

  const { mutate: signup } = api.auth.signup.useMutation();
  const handleSubmit = async () => {
    signup({
      username: input.username,
      email: input.email,
      password: input.password,
    });
    await router.push("/login");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto h-max  max-w-[1440px]">
        <div className="mx-auto mt-8 h-[691px] w-[576px] rounded-[20px] border-2 px-[60px] pt-8">
          <form action="get" onSubmit={handleSubmit}>
            <h1 className="pb-6 text-center text-[32px] font-semibold">
              Create your account
            </h1>
            <label htmlFor="username">
              Name
              <input
                type="text"
                value={input.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter"
                className="mb-7 mt-2 w-full rounded-[6px] border px-4 py-3 "
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                value={input.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter"
                className="mb-7 mt-2 w-full rounded-[6px] border px-4 py-3 "
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                value={input.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter"
                className="mb-7 mt-2 w-full rounded-[6px] border px-4 py-3 "
              />
            </label>

            <button
              className="mt-4 h-[56px] w-[456px] rounded-[6px] bg-black text-white"
              type="submit"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="my-10 text-center text-[#333]">
            Have an Account?
            <span className="ml-3 font-medium">
              <Link href="/login">LOGIN</Link>
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
