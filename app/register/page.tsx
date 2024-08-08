import RegistrationForm from "../../components/auth/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <RegistrationForm />
    </div>
  );
}
