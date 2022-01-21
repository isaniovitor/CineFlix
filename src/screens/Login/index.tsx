import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import Input from '~/components/Input';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { DataProps } from '~/@types/entities/User';
import { GET_FILMCATEGORY, GET_FILMS_WITH_FILTERS } from '~/constants/api';
import { HOME_SCREEN } from '~/constants/routes';
import { getFilmCategoryAction } from '~/store/ducks/filmCategory/actions';
import { getListCategoryFilmsSagas } from '~/store/ducks/listCategoryFilms/utils';
import { changeProfileAction } from '~/store/ducks/user/actions';

import { validationSchema } from './validations';

import * as S from './styles';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { listCategoryFilms } = useSelector(
    (state: AplicationState) => state.listCategoryFilms,
  );
  const { filmCategory } = useSelector(
    (state: AplicationState) => state.filmCategory,
  );

  function handleLogin(data: DataProps) {
    dispatch(
      changeProfileAction(
        data.username,
        data.lastname,
        data.password,
        data.userimage,
        data.email,
        data.birthdate,
        data.address,
        data.gender,
      ),
    );
    navigation.navigate(HOME_SCREEN);
  }

  const { handleSubmit, dirty, handleChange, values, errors } = useFormik({
    initialValues: {
      username: '',
      lastname: '',
      password: '',
      email: '',
      userimage: '',
      birthdate: '',
      address: '',
      gender: { id: '', name: '' },
    },
    validationSchema,
    onSubmit: handleLogin,
    validateOnChange: false,
  });

  useEffect(() => {
    dispatch(getFilmCategoryAction(GET_FILMCATEGORY, '', '', ''));
  }, []);

  useEffect(() => {
    filmCategory.map(itemCategory => {
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

      return getListCategoryFilmsSagas(action);
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
            placeholder="Digite seu email"
            value={values.username}
            error={errors.username}
            onChangeText={handleChange('username')}
            width={100}
          />
          <Input
            iconLeft="lock"
            placeholder="Digite sua senha"
            value={values.password}
            error={errors.password}
            onChangeText={handleChange('password')}
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
            actionBtn={() => handleSubmit()}
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
