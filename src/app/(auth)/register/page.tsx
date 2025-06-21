import RegisterForm from "./form";
import AuthSection from "@/components/page/Auth/Authsection";
import AuthHeader from "@/components/page/Auth/AuthHeader";
import OtherLoginOptions from "@/components/page/Auth/OtherLoginOptions";
import OtherLink from "@/components/page/Auth/Otherlink";

export default function Register() {
  return (
    <AuthSection>
      <AuthHeader
        h2="Sign up"
        paragraph="Let's get you all st up so you can access your personal account."
      />
      <RegisterForm />
      <div className="mt-6">
        <OtherLoginOptions paragraph="Or login with" />
        <OtherLink />
      </div>
    </AuthSection>
  );
}
