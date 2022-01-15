import {
  createDrawerNavigator,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';

// import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import { Header } from '~/components/Header';

import type { AplicationState } from '~/@types/entities/AplicationState';
import {
  FILM_DETAILS_SCREEN,
  HOME_SCREEN,
  LOGIN_SCREEN,
  PROFILE_SCREEN,
} from '~/constants/routes';
import FilmDetails from '~/screens/FilmDetails';
import Home from '~/screens/Home';
import Login from '~/screens/Login';
import Profile from '~/screens/Profile';
import { createTheme } from '~/utils/theme';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const StackLogin = createNativeStackNavigator();

function RootStack() {
  const { islogged } = useSelector((state: AplicationState) => state.user);
  const { theme } = useSelector((state: AplicationState) => state.theme);

  // const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    // creteTheme?
    <ThemeProvider theme={createTheme(theme)}>
      <NavigationContainer>
        {/* {islogged ? (
          <Drawer.Navigator
            initialRouteName={HOME_SCREEN}
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Drawer.Screen
              name={HOME_SCREEN}
              component={Home}
              options={{
                header: props => <Header {...props} headerMenu />,
              }}
            />
            <Drawer.Screen
              name={PROFILE_SCREEN}
              component={Profile}
              options={{
                header: props => <Header {...props} headerMenu />,
              }}
            />
          </Drawer.Navigator>
        ) : ( */}
        <Stack.Navigator
          initialRouteName={LOGIN_SCREEN}
          screenOptions={{ gestureEnabled: false, animation: 'fade' }}
        >
          <StackLogin.Screen
            name={LOGIN_SCREEN}
            component={Login}
            options={{
              header: props => <Header {...props} headerMenu={false} />,
            }}
          />

          <Stack.Screen
            name={HOME_SCREEN}
            component={Home}
            options={{
              header: props => <Header {...props} headerMenu />,
            }}
          />

          <Stack.Screen
            name={PROFILE_SCREEN}
            component={Profile}
            options={{
              header: props => <Header {...props} headerMenu />,
            }}
          />

          <Stack.Screen
            name={FILM_DETAILS_SCREEN}
            component={FilmDetails}
            options={{
              header: props => <Header {...props} headerMenu />,
            }}
          />
        </Stack.Navigator>
        {/* )} */}
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default RootStack;
