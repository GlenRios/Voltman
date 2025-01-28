"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { login } from "@/src/api/authService";
import { goHome } from "@/src/hooks/handleRouts";
import Logo from "@/src/components/logo";
import { useAlert } from "@/src/hooks/alertContxt";
import Alert from "@/src/components/alerts/Alert";


const LoginForm = () => {

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
    );
};

export default LoginForm;