import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="font-semibold text-2xl">In Login Page</h1>
      <Link href={"/"}>
        <button className="h-[42px] px-6 cursor-pointer rounded-3xl inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white text-lg p-2 transition-all">
          بازگشت به داشبورد
        </button>
      </Link>
    </div>
  );
};

export default LoginPage;
