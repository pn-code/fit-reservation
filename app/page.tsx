import {
  Calculator,
  CheckCircle,
  Dumbbell,
  FileBarChart,
  Shield,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-fit mt-14 px-4 gap-6 flex text-white items-center flex-col sm:mt-40 mb-10 bg-slate-900 md:gap-24 lg:px-[20%] text-center">
      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-around bg-slate-900 flex-1 gap-10 lg:py-20">
        <header className="h-full w-full flex flex-col gap-10">
          <h1 className="text-3xl sm:text-6xl lg:text-8xl font-semibold">
            Achieve new heights
          </h1>
          <p className="text-gray-200/90 text-[16px] tracking-tight sm:text-xl sm:tracking-tight">
            Experience accelerated progress, optimize your workouts, and
            successfully attain your fitness objectives.
          </p>
        </header>

        <section className="h-full w-full flex gap-5 text-lg font-semibold">
          <Link
            passHref={true}
            href="/register"
            className="min-w-[120px] w-[50%] h-12 sm:min-h-[70px] text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white sm:px-8 bg-indigo-600 hover:bg-indigo-700 rounded-sm"
          >
            Get Started
          </Link>
          <a
            className="min-w-[120px] w-[50%] h-12 sm:min-h-[70px] text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white sm:px-8 bg-transparent hover:bg-gray-800 rounded-sm border-2 border-gray-700"
            href={"#info"}
          >
            How it works
          </a>
        </section>
      </section>

      {/* RIGHT SIDE: HERO IMAGE */}
      {/* <section className="hidden lg:flex flex-1 justify-center items-center w-full bg-gray-900 rounded-md mt-8 sm:mt-0">
                <Image
                    className="rounded-sm"
                    src={"/assets/HERO.png"}
                    height={1000}
                    width={720}
                    alt=""
                />
            </section> */}

      {/* Tools */}
      <section id="info" className="flex flex-col gap-8 sm:gap-16 pt-20 justify-center items-center">
        <h2 className="w-full text-2xl lg:text-3xl flex gap-2 flex-col font-bold lg:flex-row lg:items-end lg:justify-center">
          What's in FitHeroes?
          <span className="text-[16px] sm:text-xl text-gray-300 font-normal">
            All the tools you need to elevate your fitness.
          </span>
        </h2>
        {/* CALCULATE */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[800px]">
          <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
            <Calculator size={120} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold sm:text-2xl">CALCULATE</h2>
            <span className="text-sm sm:text-xl text-amber-300">
              Find your starting point.
            </span>
            <p className="text-sm sm:text-[16px] text-gray-400 mt-2 sm:text-left">
              Using the industry standard equation for calculating basal
              metabolic rate, Mifflin-St Jeor, use our calculator to find your
              recommended daily caloric intake depending on your goals.
            </p>
          </div>
        </div>

        {/* PLAN */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[800px] ">
          <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
            <Dumbbell size={120} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold sm:text-2xl">PLAN</h2>
            <span className="text-sm sm:text-xl text-amber-300">
              Take control of your workouts.
            </span>
            <p className="text-sm sm:text-[16px] text-gray-400 sm:text-left">
              Search through our comprehensive list of training plans and pick
              one that is suited for your standards. Review others&apos;
              training plans and create your own!
            </p>
          </div>
        </div>

        {/* TRACK */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[800px]">
          <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
            <FileBarChart size={120} />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold sm:text-2xl">TRACK</h2>
            <span className="text-sm sm:text-xl text-amber-300">
              Add success to your to do list.
            </span>
            <p className="text-sm sm:text-[16px] text-gray-400 sm:text-left">
              Keep track of your nutritional intake and exercise with our
              journal that is simple and easy to use. Training plans can be
              easily added to the journal for tracking.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 w-full flex flex-col xl:flex-row items-center gap-6 xl:justify-center">
        <p className="text-gray-200/90 sm:mr-2 text-[14px] sm:text-[18px] text-amber-300">
          Going above and beyond the defined standards
        </p>
        <div className="flex gap-6 flex-wrap">
          <Image
            className="rounded-sm"
            src={"/assets/company1.png"}
            height={32}
            width={32}
            alt="cronometer"
          />
          <Image
            className="rounded-sm"
            src={"/assets/company2.png"}
            height={32}
            width={32}
            alt="my fitness pal"
          />
          <Image
            className="rounded-sm"
            src={"/assets/company3.png"}
            height={32}
            width={32}
            alt="weight watchers"
          />
          <Image
            className="rounded-sm"
            src={"/assets/company4.png"}
            height={32}
            width={32}
            alt="noom"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden lg:flex">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-900">
            Features Preview
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              How we compare
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Calculator
              </th>
              <th scope="col" className="px-6 py-3">
                Nutrition Journal
              </th>
              <th scope="col" className="px-6 py-3">
                Exercise Journal
              </th>
              <th scope="col" className="px-6 py-3">
                Training Plans
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Cronometer */}
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/company1.png"
                    alt="cronometer"
                    height={32}
                    width={32}
                  />{" "}
                  <span>Cronometer</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <XCircle className="text-red-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <XCircle className="text-red-500" size={32} />
              </td>
            </tr>

            {/* WW */}
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/company3.png"
                    alt="weight watchers"
                    height={32}
                    width={32}
                  />
                  <span>Weight Watchers</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <XCircle className="text-red-500" size={32} />
              </td>
            </tr>

            {/* Noom */}
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/company4.png"
                    alt="noom"
                    height={32}
                    width={32}
                  />
                  <span>Noom</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <XCircle className="text-red-500" size={32} />
              </td>
            </tr>

            {/* Noom */}
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/company5.png"
                    alt="lose it"
                    height={32}
                    width={32}
                  />
                  <span>Lose It</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <XCircle className="text-red-500" size={32} />
              </td>
            </tr>

            {/* MyFitnessPal */}
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/company2.png"
                    alt="my fitness pal"
                    height={32}
                    width={32}
                  />
                  <span>MyFitnessPal</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <XCircle className="text-red-500" size={32} />
              </td>
            </tr>

            {/* FitHeroes */}
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Shield size={32} color="white" />
                  <span>FitHeroes</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
              <td className="px-6 py-4">
                <CheckCircle className="text-green-500" size={32} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <section className="flex flex-col gap-10 py-20 mb-10">
        <h2 className="w-full text-2xl lg:text-3xl flex gap-2 flex-col font-bold lg:flex-row lg:items-end">
          Do not wait any longer. Your fitness has arrived.
        </h2>
        <Link
          className="p-4 rounded-sm bg-blue-800 text-lg hover:bg-blue-900 ease-linear duration-200"
          href={"/register"}
          passHref
        >
          Get Started For Free
        </Link>
      </section>
    </main>
  );
}
