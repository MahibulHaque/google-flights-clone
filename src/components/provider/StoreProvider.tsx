import {persistor, store} from '@/core/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

export default function StoreProvider({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  );
}
