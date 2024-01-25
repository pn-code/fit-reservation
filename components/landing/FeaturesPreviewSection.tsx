import { CheckCircle, Shield, XCircle } from "lucide-react";
import Image from "next/image";

export default function FeaturesPreviewSection() {
    return (
        <>
            <div className="mt-12 w-full flex flex-col xl:flex-row items-center gap-6 xl:justify-center">
                <p className="text-gray-200/90 sm:mr-2 text-[18px] text-amber-300 font-semibold">
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
            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg hidden lg:flex max-w-[920px]">
                <table className="w-full text-left text-gray-400">
                    <caption className="p-5 text-2xl font-semibold text-left text-white bg-gray-900">
                        Features Preview
                        <p className="mt-1 text-lg font-normal  text-gray-400">
                            How we compare
                        </p>
                    </caption>
                    <thead className="text-sm text-gray-700 uppercase bg-gray-900 dark:text-gray-400">
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
                        <tr className="border-b bg-gray-900 border-gray-700">
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

                            <td className="px-6 py-4 tex-center">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <XCircle className="text-red-500" size={32} />
                            </td>
                            <td className="px-6 py-4">
                                <XCircle className="text-red-500" size={32} />
                            </td>
                        </tr>

                        {/* WW */}
                        <tr className="border-b bg-gray-900 border-gray-700">
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
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <XCircle className="text-red-500" size={32} />
                            </td>
                        </tr>

                        {/* Noom */}
                        <tr className="border-b bg-gray-900 border-gray-700">
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
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <XCircle className="text-red-500" size={32} />
                            </td>
                        </tr>

                        {/* Noom */}
                        <tr className="border-b bg-gray-900 border-gray-700">
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
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <XCircle className="text-red-500" size={32} />
                            </td>
                        </tr>

                        {/* MyFitnessPal */}
                        <tr className="border-b bg-gray-900 border-gray-700">
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
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <XCircle className="text-red-500" size={32} />
                            </td>
                        </tr>

                        {/* FitHeroes */}
                        <tr className="border-b bg-gray-900 border-gray-700">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Shield size={32} color="lightgray" />
                                    <span>FitHeroes</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <CheckCircle
                                    className="text-green-500"
                                    size={32}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
