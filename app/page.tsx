import { Suspense } from 'react';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <Suspense key={`${searchParams.page}_${searchParams.query}`} fallback={<div>Loading ...</div>}>
      <h1>Home Page</h1>
    </Suspense>
  );
}
