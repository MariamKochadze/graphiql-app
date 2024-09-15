'use client';
import { useAppSelector, useAppDispatch } from '@hooks/useStoreHooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AllHistory from './allHistory';
import EmptyHistory from './emptyHistory';
import { setAllHistory } from '@store/features/history/historySlice';
import { ResponseState } from '@app/common/interface/interface';
import { selectUser } from '@store/selectors';

export default function History() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useAppSelector(state => state.history);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.back();
    }
  }, [user, router]);

  useEffect(() => {
    const history: { [key: string]: ResponseState[] } = localStorage.getItem('historyApiDog')
      ? JSON.parse(localStorage.getItem('historyApiDog') as string)
      : {};
    dispatch(setAllHistory(history));
  }, [setAllHistory]);

  return user ? (
    <div>{history[user.email as string] ? <AllHistory /> : <EmptyHistory />}</div>
  ) : (
    <div>Redirecting...</div>
  );
}
