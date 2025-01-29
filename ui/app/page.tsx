"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { login } from "@/src/api/authService";
import { goHome } from "@/src/hooks/handleRouts";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";

import Icons from "@/src/components/Icon";
import Logo from "@/src/components/logo";
import LoginForm from "@/src/components/forms/LoginForm";

export default function LoginPage() {

  const { showAlert, alertData } = useAlert();
  const [Username, setUsername] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!Username || !Password)
        showAlert(true, "Please complete all fields.", 5000);

      else {
        const response = await login(Username, Password);
        if (response) {
          goHome(router);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.toString();
        showAlert(true, errorMessage, 5000);
      }
    }
  }

  return (
    <main className=" flex flex-col-reverse lg:flex-row bg-[url('http://localhost:3000/images/claro3.jpg')] dark:bg-transparent bg-cover bg-no-repeat bg-center">
      <div className=" w-full lg:w-1/2 flex items-center justify-center p-4 lg:h-screen flex-col sm:h-max dark:bg-black shadow-2xl overflow-hidden dark:border-zinc-800 bg-transparent" >
        <div className="group flex flex-col justify-start items-start gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-gray-200 dark:bg-gray-900 hover:-translate-y-2 hover:shadow-xl shadow-gray-800">
          <div className="flex">
            <Logo
              width={30}
              height={30}>
            </Logo>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-gray-100">Voltman</h2>
          </div>
          <p className="text-black dark:text-gray-200 line-clamp-4">
            Voltman is a comprehensive solution designed to help you monitor, analyze, and optimize energy consumption in your company efficiently and in a personalized way.
          </p>
        </div>
        {Icons()}
      </div>
      <div className=" w-full lg:w-1/2 p-4  h-screen flex items-center justify-center bg-transparent dark:bg-[url('http://localhost:3000/images/login.png')] bg-cover bg-no-repeat bg-center ">
        < form
          id="logForm"
          className="h-auto bg-slate-200 dark:bg-black shadow-2xl rounded-2xl overflow-hidden border-4 border-transparent dark:border-zinc-700" >
          <div className="flex ml-4 mt-4 mb-0 text-black dark:text-white">
            <Logo
              width={30}
              height={30}>
            </Logo>
            Voltman
          </div>
          <div className="px-8 py-10 md:px-10">
            <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
              Welcome Back!
            </h2>
            <p className="text-center text-zinc-950 dark:text-zinc-400 mt-3">
              We missed you, sign in to continue.
            </p>
            <div className="mt-10">
              <div className="relative">
                <label
                  className="block mb-3 text-sm font-medium text-black dark:text-zinc-200"
                  form="name">
                  Name:
                </label>
                <input
                  value={Username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="example"
                  className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400 border-zinc-500"
                  name="name"
                  id="name"
                  type="text"
                  required
                />
              </div>
              <div className="mt-6">
                <label
                  className="block mb-3 text-sm font-medium text-black dark:text-zinc-200"
                  form="password">
                  Password:
                </label>
                <input
                  value={Password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400 border-zinc-500"
                  name="password"
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="mt-10">
                <button
                  className="w-full px-4 py-3 tracking-wide text-white transition-all duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800 hover:scale-105"
                  type="submit"
                  onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </div>
          </div>
          {
            alertData.isVisible && (
              <Alert
                type={alertData.type}
                message={alertData.message}
                onClose={() => showAlert(false, "", 0)}
              />
            )
          }
        </form >
      </div>
    </main>
  );
}