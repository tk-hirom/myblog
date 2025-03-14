'use client';

import { useSession, signOut } from "next-auth/react";

const Dashboard = () => {
    const { data: session, status } = useSession(); // セッション情報を取得

    if (status === "loading") {
        return <p>読み込み中...</p>; // 認証状態が未確定の場合
    }

    if (!session) {
        return <p>ログインしてください。</p>; // 未ログインの場合
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold text-gray-800">ダッシュボード</h2>
                {/*<p className="mt-4">ようこそ、{session.user?.name} さん！</p>*/}
                <img src={session.user?.image ?? ""} alt="Profile" className="w-16 h-16 rounded-full mx-auto mt-4" />
                {/*<p className="mt-2 text-gray-600">Email: {session.user}</p>*/}
                {/*<p className="mt-2 text-gray-600">ID: {(session as any).user?.id}</p>*/}
                <button
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition mt-4"
                    onClick={() => signOut()}
                >
                    ログアウト
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
