import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="font-semibold text-2xl">NextJs Middleware Bypass</h1>
      <h2 className="font-semibold text-xl">In dashboard</h2>
      <Link href={"/protected-route"}>
        <button className="h-[42px] px-6 cursor-pointer rounded-3xl inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white text-lg p-2 transition-all">
          ورود به صفحه محافظت شده
        </button>
      </Link>
    </div>
  );
}
