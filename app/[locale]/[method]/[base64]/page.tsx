import RestFullAndGraph from '@components/RestFull-client/RestFullAndGraph';

export default async function Page({
  params,
  searchParams,
}: {
  params: { method: string; base64: string; body?: string };
  searchParams: Record<string, string>;
}) {
  return <RestFullAndGraph params={params} searchParams={searchParams} />;
}
