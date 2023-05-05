import React from "react";
import { clearWeightAndBfMeasurements } from "../../helpers/clearMeasurements";

export default async function page() {
    await clearWeightAndBfMeasurements();
    return <div>Cleared</div>;
}
