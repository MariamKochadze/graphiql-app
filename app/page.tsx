'use client';
import { useAppSelector } from 'hooks/useStoreHooks';
import { Suspense } from 'react';
import { selectUser } from 'store/selectors';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const user = useAppSelector(selectUser);

  return (
    <Suspense key={`${searchParams.page}_${searchParams.query}`} fallback={<div>Loading ...</div>}>
      <h1>Home Page</h1>
      <p>{user?.displayName}</p>
    </Suspense>
  );
}
