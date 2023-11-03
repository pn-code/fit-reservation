"use client";

import axios from "axios";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function UpdateUsernameComponent() {
  const [isUpdating, setIsUpdating] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updateUserNames = async () => {
    try {
      setLoading(true);
      const res = await axios.put("/api/users/full_name", {
        firstName,
        lastName,
      });

      if (res.status === 200) {
        toast.success("Successfully updated your name.");
      }

      setIsUpdating(false);
      setFirstName("");
      setLastName("");
      router.refresh();
    } catch (error) {
      console.error(error, "Ran into an error. Try again later.");
      toast.error("Ran into an error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-300">
            Update Name
          </h2>
          <p className="text-sm">In case your name does not look right.</p>
        </section>
        <button
          onClick={() => setIsUpdating((prev) => !prev)}
          className="text-gray-100 group flex cursor-pointer items-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md justify-center sm:w-42"
        >
          <div className="flex gap-2 justify-center items-center sm:w-42 text-sm">
            <Edit size={18} />
            {!isUpdating ? <h3>Update Name</h3> : <h3>Cancel</h3>}
          </div>
        </button>
      </section>

      {isUpdating && (
        <section className="flex flex-col gap-4 w-full">
          <section className="flex gap-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              min={1}
              max={30}
              type="text"
              id="firstName"
              value={firstName}
            />
          </section>
          <section className="flex gap-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              min={1}
              max={30}
              type="text"
              id="lastName"
              value={lastName}
            />
          </section>
          <button
            disabled={loading}
            onClick={updateUserNames}
            className="sm:w-72 text-gray-100 group flex cursor-pointer py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md justify-center disabled:bg-gray-50"
          >
            {loading ? <Spinner /> : "Submit New Name"}
          </button>
        </section>
      )}
    </section>
  );
}
