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
            className="card" >
            <div className="flex ml-4 mt-4 mb-0 text-black dark:text-white">
                <Logo
                    width={30}
                    height={30}>
                </Logo>
                Voltman
            </div>
            <div className="px-8 py-10 md:px-10">
                <h2 className="tittle">
                    Welcome Back!
                </h2>
                <p className="subtittle">
                    We missed you, sign in to continue.
                </p>
                <div className="mt-10">
                    <div className="relative">
                        <label
                            className="subtittle"
                            form="name">
                            Name:
                        </label>
                        <input
                            value={Username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="example"
                            className="styleInput"
                            name="name"
                            id="name"
                            type="text"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <label
                            className="subtittle"
                            form="password">
                            Password:
                        </label>
                        <input
                            value={Password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="styleInput"
                            name="password"
                            id="password"
                            type="password"
                            required
                        />
                    </div>
                    <div className="mt-10">
                        <button
                            className="buttonBlue"
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