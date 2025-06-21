import LoginForm from "./form";
import AuthSection from "@/components/page/Auth/Authsection";
import AuthHeader from "@/components/page/Auth/AuthHeader";
import OtherLoginOptions from "@/components/page/Auth/OtherLoginOptions";
import OtherLink from "@/components/page/Auth/Otherlink";

export default function Login() {
  return (
    <AuthSection>
      <AuthHeader h2="Login" paragraph="Login to access your Golobe account" />
      <LoginForm />
      <div className="mt-6">
        <OtherLoginOptions paragraph="Or login with" />
        <OtherLink />
      </div>
    </AuthSection>
  );
}
