import Button from "@/components/botton/Botton";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="font-semibold text-2xl">NextJs Middleware Bypass</h1>
      <h2 className="font-semibold text-xl">In dashboard</h2>
      <Button model="primary" text="ورود به صفحه محافظت شده" cursorType="pointer" href="/protected-route" />
    </div>
  );
}
