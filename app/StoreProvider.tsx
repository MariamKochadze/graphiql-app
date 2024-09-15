'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@store/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<AppStore | undefined>(undefined);
  if (!store) {
    setStore(makeStore());
  }

  return <Provider store={store}>{children}</Provider>;
}
