import Adplaceholder from "@/components/layout/adplaceholder";
import MyForm from "@/components/RecaptchaForm";
import React from "react";

const Page = () => {
  return (
    <main
      className="flex flex-col justify-around min-h-screen w-full p-6 md:px-24 md:py-12"
      data-theme="dark"
    >
      <header className="flex-grow-0">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:justify-between md:items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold md:text-5xl">Earnverce</h1>
            <p className="text-base md:text-xl text-gray-300">
              Verify you are human. This takes a few seconds.
            </p>
          </div>
          <Adplaceholder className="w-full h-20 sm:h-24 md:w-96 md:h-28" />
        </div>
        <div className="my-4 sm:my-6">
          <MyForm />
        </div>
      </header>

      <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 my-4 sm:my-6">
        <Adplaceholder className="w-full h-20 sm:h-24 md:h-28" />
        <Adplaceholder className="hidden sm:flex w-full h-20 sm:h-24 md:h-28" />
      </section>

      <p className="text-base md:text-xl text-gray-300">
        Earnverce needs to review the security of your connection before
        proceeding.
      </p>

      <section className="mt-4 sm:mt-6">
        <Adplaceholder className="w-full h-20 sm:h-24 md:h-28" />
      </section>

      <footer className="mt-4 sm:mt-6 pt-4">
        <hr className="border-gray-700 mb-3" />
        <div className="text-center text-xs sm:text-sm text-gray-400 space-y-1">
          <p>Powered by AS Tech.</p>
          <p>© Copyright 2025, All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Page;
