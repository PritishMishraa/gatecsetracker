import { EarlyAccessPage } from "@/components/new-page/early-access-page";

type NewPageProps = {
  searchParams?: Promise<{
    email?: string | string[];
  }>;
};

export default async function NewPage({ searchParams }: NewPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialEmail = Array.isArray(resolvedSearchParams?.email)
    ? (resolvedSearchParams?.email[0] ?? "")
    : (resolvedSearchParams?.email ?? "");

  return <EarlyAccessPage initialEmail={initialEmail} />;
}
