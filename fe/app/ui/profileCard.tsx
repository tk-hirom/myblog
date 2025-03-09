import Link from "next/link";
import Image from "next/image";

const ProfileCard = () => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <img
                src="/icon.jpeg" // 実際のプロフィール画像URLに変更
                alt="Profile Picture"
                className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900">tk-hirom</h2>
            <p className="text-gray-500 text-sm">Web App Engineer</p>
            <p className="text-gray-600 mt-2">I work for a Japanese big company as a member of engineers.</p>
            <div className="mt-4 flex justify-center gap-3">
                <a href="https://twitter.com" className="text-blue-500 hover:underline">Twitter</a>
                <Link href="https://github.com/tk-hirom" className="text-gray-900 hover:underline">
                    <Image
                        src="/github-mark.png"
                        alt={"GitHub"}
                        width={24}
                        height={24}
                    ></Image>
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;
