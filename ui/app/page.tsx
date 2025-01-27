// "use client";
import Icons from "@/src/components/Icon";
import Logo from "@/src/components/logo";
import LoginForm from "@/src/components/forms/LoginForm";

export default function LoginPage() {

  return (
    <main className=" flex flex-col-reverse lg:flex-row bg-[url('http://localhost:3000/images/claro3.jpg')] dark:bg-transparent bg-cover bg-no-repeat bg-center">
      <div className=" w-full lg:w-1/2 flex items-center justify-center p-4 lg:h-screen flex-col sm:h-max dark:bg-black shadow-2xl overflow-hidden dark:border-zinc-800 bg-transparent" >
        <div className="group flex flex-col justify-start items-start gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-gray-200 dark:bg-gray-900 hover:-translate-y-2 hover:shadow-xl shadow-gray-800">
          <div className="flex">
            <Logo
              width={30}
              height={30}>
            </Logo>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-gray-100">Voltman</h2>
          </div>
          <p className="text-black dark:text-gray-200 line-clamp-4">
            Voltman is a comprehensive solution designed to help you monitor, analyze, and optimize energy consumption in your company efficiently and in a personalized way.
          </p>
        </div>
        {Icons()}
      </div>
      <div className=" w-full lg:w-1/2 p-4  h-screen flex items-center justify-center bg-transparent dark:bg-[url('http://localhost:3000/images/login.png')] bg-cover bg-no-repeat bg-center ">
        <LoginForm />
      </div>
    </main>
  );
}