import { Check } from "lucide-react";
import Link from "next/link";
import { SigmaSquare } from "lucide-react";

import SignOutButton from "@/components/profile/SignOutButton";
import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import StripeCheckOutButton from "@/components/profile/StripeCheckOutButton";
import UpdateUserComponent from "@/components/profile/UpdateUserComponent";
import { prisma } from "@/lib/client";

interface Props {
  params: {
    userId: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const user = await clerkClient.users.getUser(params.userId);

  return {
    title: `${user?.firstName} ${user?.lastName} | FitHeroes`,
  };
}

async function ProfilePage({ params }: Props) {
  const user = await currentUser();
  const { userId } = params;

  const userOnProfile = await clerkClient.users.getUser(userId);
  const userIsSubscribed = await prisma.subscription.findFirst({
    where: { userId: userOnProfile.id },
  });

  return (
    <main className="w-full min-h-[calc(100vh-90px)] bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90 mb-12">
      <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
        <h1 className="text-xl sm:text-3xl">Profile</h1>
        <SignOutButton />
      </header>

      {/* User Information */}
      <section className="flex gap-4 items-center sm:mb-5">
        <h2 className="text-xl sm:text-3xl font-semibold text-amber-300 flex gap-4">
          {`${userOnProfile?.firstName} ${userOnProfile?.lastName}`}
        </h2>
        {userIsSubscribed && (
          <span className="bg-indigo-600 rounded-full p-0.5 border-2 border-indigo-700 flex justify-center items-center">
            <Check />
          </span>
        )}
      </section>

      {/* Upgrade Profile */}
      {!userIsSubscribed && userId === user?.id && (
        <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-amber-300">
              Upgrade account to premium
            </h2>
            <p>Get a cool verified check</p>
          </section>
          <StripeCheckOutButton />
        </section>
      )}

      <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-300">
            Update Goals
          </h2>
          <p className="text-sm">Manage your goals</p>
        </section>
        <Link
          className="flex text-sm items-center justify-center gap-2 rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white/90 hover:text-white sm:w-42"
          href="/calculator"
          passHref
        >
          <SigmaSquare size={18} />
          Calculator
        </Link>
      </section>

      {user?.id === userId && <UpdateUserComponent />}
    </main>
  );
}

export default ProfilePage;
