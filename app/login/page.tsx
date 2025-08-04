import Button from "@/components/botton/Botton";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="font-semibold text-2xl">In Login Page</h1>
      <Button model="primary" text="بازگشت به داشبورد" cursorType="pointer" href="/" />
    </div>
  );
};

export default LoginPage;
