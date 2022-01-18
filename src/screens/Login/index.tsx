import { useNavigation } from '@react-navigation/core';
import { values } from 'lodash';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import Input from '~/components/Input';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';
import { GET_FILMS_WITH_FILTERS, SEARCH_FILMS } from '~/constants/api';
import { HOME_SCREEN } from '~/constants/routes';
import {
  getFilmsAction,
  getFilmsSuccessAction,
} from '~/store/ducks/film/actions';
import { getListCategoryFilmsAction } from '~/store/ducks/listCategoryFilms/actions';
import {
  getListCategoryFilms,
  getListCategoryFilmsSagas,
} from '~/store/ducks/listCategoryFilms/sagas';
import type { GetListCategoryFilmsProps } from '~/store/ducks/listCategoryFilms/types';
import { listCategoryFilmsTypes } from '~/store/ducks/listCategoryFilms/types';
import { changeProfileAction } from '~/store/ducks/user/actions';

import { FilmCategorys } from '../Home/utils/mock';

import * as S from './styles';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { listFilms, loading } = useSelector(
    (state: AplicationState) => state.film,
  );
  const { listCategoryFilms, loadingFilm } = useSelector(
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
    // dispatch(
    //   getListCategoryFilmsAction(
    //     GET_FILMS_WITH_FILTERS,
    //     '',
    //     `with_genres=${FilmCategorys[0].id}`,
    //     1,
    //     FilmCategorys[0],
    //   ),
    // );
    // dispatch(
    //   getListCategoryFilmsAction(
    //     GET_FILMS_WITH_FILTERS,
    //     '',
    //     `with_genres=${FilmCategorys[1].id}`,
    //     1,
    //     FilmCategorys[1],
    //   ),
    // );
    // dispatch(
    //   getListCategoryFilmsAction(
    //     GET_FILMS_WITH_FILTERS,
    //     '',
    //     `with_genres=${FilmCategorys[3].id}`,
    //     1,
    //     FilmCategorys[3],
    //   ),
    // );
    // dispatch(
    //   getListCategoryFilmsAction(
    //     GET_FILMS_WITH_FILTERS,
    //     '',
    //     `with_genres=${FilmCategorys[4].id}`,
    //     1,
    //     FilmCategorys[4],
    //   ),
    // // );
    // path: GET_FILMS_WITH_FILTERS,
    //     query: '',
    //     filter: `with_genres=${itemCategory.id}`,
    //     index: 1,
    //     category: itemCategory,

    FilmCategorys.map(itemCategory => {
      console.tron.log('itemCategory', itemCategory);
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
