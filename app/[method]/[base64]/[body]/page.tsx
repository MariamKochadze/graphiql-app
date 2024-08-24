import RestFullClient from '@components/RestFull-client/restFullPage';

export default async function Page({
  params,
  searchParams,
}: {
  params: { method: string; base64: string; body?: string };
  searchParams: Record<string, string>;
}) {
  return <RestFullClient params={params} searchParams={searchParams} />;
}
