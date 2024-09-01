'use client';
import { useAppSelector } from '@hooks/useStoreHooks';
import { selectUser } from '@store/selectors';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AllHistory from './allHistory';
import EmptyHistory from './emptyHistory';

export default function History() {
  const user = useAppSelector(selectUser);
  const history = useAppSelector(state => state.history);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.back();
    }
  }, [user, router]);
  return user ? (
    <div>{history[user.email as string] ? <AllHistory /> : <EmptyHistory />}</div>
  ) : (
    <div>Redirecting...</div>
  );
}
