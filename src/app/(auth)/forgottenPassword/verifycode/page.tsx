import VerifyPasswordCodeForm from "./form";
import AuthSection from "@/components/page/Auth/Authsection";
import AuthHeader from "@/components/page/Auth/AuthHeader";
import OtherLink from "@/components/page/Auth/Otherlink";
import OtherLoginOptions from "@/components/page/Auth/OtherLoginOptions";

export default function VerifyPasswordCode() {
  return (
    <AuthSection>
      <AuthHeader
        h2="Forgot your password?"
        paragraph="Don’t worry, happens to all of us. Enter your email below to recover your password"
      />
      <VerifyPasswordCodeForm />
      <div className="mt-6">
        <OtherLoginOptions paragraph="Or login with" />
        <OtherLink />
      </div>
    </AuthSection>
  );
}
