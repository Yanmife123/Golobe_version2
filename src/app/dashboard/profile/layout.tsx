import ProfileWrapper from "@/components/page/dashboard/profile/ProfileWrapper";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 md:px-12">
      <ProfileWrapper>
        <div>{children}</div>
      </ProfileWrapper>
    </div>
  );
}
