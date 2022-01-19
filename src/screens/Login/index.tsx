import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import Input from '~/components/Input';

import type { AplicationState } from '~/@types/entities/AplicationState';
import { GET_FILMS_WITH_FILTERS } from '~/constants/api';
import { HOME_SCREEN } from '~/constants/routes';
import { getListCategoryFilmsSagas } from '~/store/ducks/listCategoryFilms/sagas';

import { FilmCategorys } from '../Home/utils/mock';

import * as S from './styles';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { listCategoryFilms } = useSelector(
    (state: AplicationState) => state.listCategoryFilms,
  );

  function handleLogin() {
    // dispatch(
    //   changeProfileAction('userName', 'userPassword', 'o', 'email', 'nasc', {
    //     id: '0',
    //     name: '',
    //   }),
    // );
    navigation.navigate(HOME_SCREEN);
  }

  useEffect(() => {
    FilmCategorys.map(itemCategory => {
      const action = {
        list: listCategoryFilms,
        payload: {
          path: GET_FILMS_WITH_FILTERS,
          query: '',
          filter: `with_genres=${itemCategory.id}`,
          index: 1,
          category: itemCategory,
        },
      };

      getListCategoryFilmsSagas(action);
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
      style={{ flex: 1 }}
    >
      <S.Container>
        <S.ImageContainer>
          <S.BookIcon />
        </S.ImageContainer>
        <S.InputsContainer>
          <Input
            iconLeft="person"
            iconType="ionicons"
            placeholder="Digite seu nome"
            // value={values.username}
            // error={errors.username}
            // onChangeText={handleChange('username')}
            width={100}
          />
          <Input
            iconLeft="lock"
            placeholder="Digite sua senha"
            // value={values.password}
            // error={errors.password}
            // onChangeText={handleChange('password')}
            secureTextEntry={!showPassword}
            actionIcon={() => setShowPassword(!showPassword)}
            iconRight={showPassword ? 'eye-off' : 'eye'}
            width={100}
          />
          <S.text>Esqueceu a senha?</S.text>
        </S.InputsContainer>
        <S.LoginContainer>
          <Button
            label="Login"
            // disabled={!dirty}
            actionBtn={() => handleLogin()}
          />
          <S.CreateAccountContainer>
            <S.CreateAccount>Don´t have an account?</S.CreateAccount>
            <S.OrengeText> Register</S.OrengeText>
          </S.CreateAccountContainer>
        </S.LoginContainer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default Login;
