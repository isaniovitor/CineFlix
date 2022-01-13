import { useNavigation } from '@react-navigation/core';
import { values } from 'lodash';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import Input from '~/components/Input';

import { HOME_SCREEN } from '~/constants/routes';
import { changeProfileAction } from '~/store/ducks/user/actions';

import * as S from './styles';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    // dispatch(
    //   changeProfileAction('userName', 'userPassword', 'o', 'email', 'nasc', {
    //     id: '0',
    //     name: '',
    //   }),
    // );
    navigation.navigate(HOME_SCREEN);
  }

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
