import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

let reactotron;

const host = '192.168.1.35';

if (__DEV__) {
  reactotron = Reactotron.configure({ host })
    .useReactNative()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  reactotron.clear();

  console.tron = reactotron;
}

export { reactotron };
