import LoginForm from "./form";
import AuthSection from "@/components/page/Auth/Authsection";
import AuthHeader from "@/components/page/Auth/AuthHeader";
import OtherLoginOptions from "@/components/page/Auth/OtherLoginOptions";
import OtherLink from "@/components/page/Auth/Otherlink";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthSection>
      <AuthHeader h2="Login" paragraph="Login to access your Golobe account" />
      {params.error && (
        <p className="text-salmon text-sm -mt-2">{params.error}</p>
      )}
      <LoginForm next={params.next} />
      <div className="mt-6">
        <OtherLoginOptions paragraph="Or login with" />
        <OtherLink next={params.next} />
      </div>
    </AuthSection>
  );
}
