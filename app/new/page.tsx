import { EarlyAccessPage } from "@/components/new-page/early-access-page";

type NewPageProps = {
  searchParams?: {
    email?: string | string[];
  };
};

export default function NewPage({ searchParams }: NewPageProps) {
  const initialEmail = Array.isArray(searchParams?.email)
    ? (searchParams?.email[0] ?? "")
    : (searchParams?.email ?? "");

  return <EarlyAccessPage initialEmail={initialEmail} />;
}
