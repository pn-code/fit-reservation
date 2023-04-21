import React from "react";

interface LineDividerProps {
	hidden?: boolean;
}

function LineDivider({ hidden }: LineDividerProps) {
	return (
		<div
			className={`w-full border-b-2 border-b-orange-600 pb-4 ${
				hidden ? "md:hidden" : ""
			}`}
		/>
	);
}

export default LineDivider;
