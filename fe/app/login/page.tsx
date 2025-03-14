'use client';
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import React, {useEffect} from "react";
import {redirect} from "next/navigation";
import NextAuthProvider from "@/app/providers";

const Page = () => {
    const { data: session} = useSession()
    useEffect(() => {
        if (session) { // TODO ログイン判定これで良いのか？
            // ログイン済みの場合はリダイレクト
            redirect("/home")
        }
    }, [session])

    const handleLogin = () => async (event: React.MouseEvent) => {
        event.preventDefault()
        const result = await signIn('google')

        if (result) {
            redirect("/home")
        }
    }

    return (
        <NextAuthProvider>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ログイン</h2>
                    <button
                        className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition mt-4"
                        onClick={() => handleLogin}
                    >
                        Googleでログイン
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        <Link href="/" className="text-blue-500 hover:underline">← ホームへ戻る</Link>
                    </p>
                </div>
            </div>
        </NextAuthProvider>

    );
};

export default Page;
