import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "@/auth.config";

console.log("unko")
/**
 * NextAuth APIのハンドラー設定
 */
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID ?? "", // Google OAuth クライアントID
            clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "", // Google OAuth クライアントシークレット
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.access_token) {
                token.accessToken = account.access_token; // アクセストークンをJWTに追加
                token.id = account.id_token; // GoogleユーザーIDを格納
            }
            return token;
        },
        async session({ session, token }) {
            // session.user.id = token.id as string; // JWTから取得したユーザーIDをセッションに追加
            // session.accessToken = token.accessToken as string; // JWTからアクセストークンを追加
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // NextAuthの暗号化キー
    pages: authConfig.pages,
});

export { handler as GET, handler as POST };