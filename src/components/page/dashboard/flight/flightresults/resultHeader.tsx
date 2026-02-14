import { DynamicResultHeader } from "@/components/UI/dashboard/searchFlightHostelResult/resultHeaderUI";

export default function ResultHeader() {
  return (
    <DynamicResultHeader
      data={[
        { title: "Cheapest", description: "$99 - 2h 18m", id: 1 },
        { title: "Best", description: "$99 - 2h 18m", id: 1 },
        { title: "Quickest", description: "$99 - 2h 18m", id: 1 },
      ]}
    />
  );
}
