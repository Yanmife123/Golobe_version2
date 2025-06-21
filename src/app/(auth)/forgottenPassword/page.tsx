import AuthSection from "@/components/page/Auth/Authsection";
import AuthHeader from "@/components/page/Auth/AuthHeader";
import ForgottenPasswordForm from "./form";
import OtherLoginOptions from "@/components/page/Auth/OtherLoginOptions";
import OtherLink from "@/components/page/Auth/Otherlink";

export default function ForgottenPassword() {
  return (
    <AuthSection>
      <AuthHeader
        h2="Forgot your password?"
        paragraph="Don’t worry, happens to all of us. Enter your email below to recover your password"
      />
      <ForgottenPasswordForm />
      <div className="mt-3">
        <OtherLoginOptions paragraph="Or login with" />
        <OtherLink />
      </div>
    </AuthSection>
  );
}
