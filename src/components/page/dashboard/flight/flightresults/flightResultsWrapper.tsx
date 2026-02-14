import { SearchResultSection } from "./resultsSection";
import { SearchForm } from "./searchForm";
export function FlightResultsWrapper() {
  return (
    <div className="p-5 flex flex-col gap-6 items-center ">
      <SearchForm />
      <SearchResultSection />
    </div>
  );
}
