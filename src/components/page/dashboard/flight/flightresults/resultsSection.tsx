import { FilterSidebar } from "./filterSidebar";
import { FlightList } from "./flightList";
import ResultHeader from "./resultHeader";
export function SearchResultSection() {
  return (
    <div className="w-full flex__center">
      <div className="w-full max-w-6xl flex gap-6">
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>
        <main className="flex-1 min-w-0 border-l-1 border-primaryT/20 px-5 space-y-6">
          <ResultHeader />
          <FlightList />
        </main>
      </div>
    </div>
  );
}
