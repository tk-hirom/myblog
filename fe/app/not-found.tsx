"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-center p-6">
            {/* 404タイトル（酔って斜めにする演出） */}
            <motion.h1
                className="text-6xl font-bold text-gray-800"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                404 - Too Many Drinks? 🍻
            </motion.h1>

            {/* 説明文 */}
            <p className="text-xl text-gray-600 mt-4">
                Oops... Looks like you've had one too many! <br />
                This page might have stumbled away, just like you after a long night at the bar. 🍺
            </p>
            <p className="text-gray-500 mt-2">Try finding your way back before the hangover hits. 😵‍💫</p>

            {/* 酔っ払ったキャラクター画像（フワフワ動く演出） */}
            <motion.img
                src="/404man.png" // お酒を飲んで酔っ払った絵文字など
                alt="Drunk Emoji"
                className="w-40 h-40 mt-6"
                animate={{ rotate: [0, 15, -15, 0] }} // 360度少しフラフラ回転
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                }}
            />

            {/* ボタンエリア */}
            <div className="mt-6 flex gap-4">
                <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                    Return to the Bar 🍺
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
