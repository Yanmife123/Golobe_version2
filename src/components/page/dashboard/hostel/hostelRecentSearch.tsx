import { RecentSearchSection } from "@/components/UI/dashboard/recentSearchSection";

export function HostelRecentSearch() {
  return (
    <div>
      <RecentSearchSection
        data={[
          {
            id: 1,
            title: "Istanbul, Turkey",
            img: "/trip-image-1.jpg",
            description: "325 places",
          },
          {
            id: 2,
            title: "Sydney, Australia",
            img: "/trip-image-2.jpg",
            description: "325 places",
          },
          {
            id: 3,
            title: "Baku, Azerbaijan",
            img: "/trip-image-3.jpg",
            description: "325 places",
          },
          {
            id: 4,
            title: "Malé, Maldives",
            img: "/trip-image-4.jpg",
            description: "325 places",
          },
        ]}
      />
    </div>
  );
}
