import React from "react";
import TrackerHeader from "../../../components/TrackerHeader";

const Tracker = () => {
	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title={"Tracker Overview"} />
		</main>
	);
};

export default Tracker;
