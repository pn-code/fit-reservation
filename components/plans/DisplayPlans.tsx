"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import TrainingPlanCard from "@/components/plans/TrainingPlanCard";
import SearchBar from "@/components/plans/SearchBar";

interface Props {
  currentPlans: any[];
}

export default function DisplayPlans({ currentPlans }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState<UserWithFullName[]>([]);

  useEffect(() => {
    async function getAllUsers() {
      const res = await axios.get("/api/users/full_name");
      setAllUsers(res.data);
    }
    getAllUsers();
  }, []);

  const usersBySearchTerm = allUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlans = currentPlans.filter(
    (plan: any) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usersBySearchTerm.some((user) => user.id === plan.userId)
  );

  return (
    <div className="flex flex-col gap-4">
      <SearchBar setSearchTerm={setSearchTerm} />

      <section className="flex flex-col gap-2">
        {filteredPlans.map((plan: any) => (
          <TrainingPlanCard plan={plan} key={plan.id} />
        ))}
      </section>
    </div>
  );
}
