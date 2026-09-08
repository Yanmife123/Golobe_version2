import ResetPasswordForm from "./form";
import AuthSection from "@/components/page/Auth/Authsection";
import AuthHeader from "@/components/page/Auth/AuthHeader";

export default function ResetPassword() {
  return (
    <AuthSection>
      <AuthHeader
        h2="Set a new password"
        paragraph="Choose a new password for your Golobe account."
      />
      <ResetPasswordForm />
    </AuthSection>
  );
}
