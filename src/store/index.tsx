import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import { getStoredState, persistReducer, persistStore } from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import { reactotron } from '~/config/ReactotronConfig';

import reducers from './ducks';
// import sagas from './sagas';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debounce: 0.1,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMonitor = __DEV__ ? reactotron.createSagaMonitor() : null;
// const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleware = [thunkMiddleware];

let composed = applyMiddleware(...middleware);

if (process.env.NODE_ENV !== 'production' || __DEV__) {
  composed = compose(
    applyMiddleware(...middleware),

    reactotron.createEnhancer(),
  );
}

const store = createStore(persistedReducer, composed);
// sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

export function startStore() {
  getStoredState(persistConfig);
}

export default store;
