import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { Picker } from '~/components/DropDown';
import { GlobalModal } from '~/components/GlobalModal';
import Input from '~/components/Input';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { GenderProps } from '~/@types/entities/Gender';
import type { DataProps } from '~/@types/entities/User';
import { GENDERS } from '~/constants/gender';
import { HOME_SCREEN, LOGIN_SCREEN } from '~/constants/routes';
import { getListCategoryFilmsSuccessAction } from '~/store/ducks/listCategoryFilms/actions';
import { changeProfileAction, logoutAction } from '~/store/ducks/user/actions';

import { pickImage, selectImage } from './utils';
import { validationSchema } from './validations';

import * as S from './styles';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const {
    username,
    lastname,
    userimage,
    email,
    password,
    birthdate,
    address,
    gender,
  } = useSelector((state: AplicationState) => state.user);

  function changeData(data: DataProps) {
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

  const { handleSubmit, dirty, handleChange, values, errors, setFieldValue } =
    useFormik({
      initialValues: {
        username,
        lastname,
        password,
        email,
        userimage,
        birthdate,
        address,
        gender,
      },
      validationSchema,
      onSubmit: changeData,
      validateOnChange: false,
    });

  function showModal() {
    setVisible(true);
  }

  function handlePickImage() {
    pickImage(setFieldValue, setVisible);
  }

  function handleSelectImage() {
    selectImage(setFieldValue, setVisible);
  }

  function logout() {
    dispatch(getListCategoryFilmsSuccessAction([]));
    dispatch(logoutAction());
  }

  useEffect(() => {
    navigation.setOptions({
      enableNavigation: true,
      save: handleSubmit,
    });
  }, [handleSubmit, navigation]);

  // image config
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work!',
          );
        }
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
      style={{ flex: 1 }}
    >
      <S.Container>
        <S.ImageContainer>
          <S.IconConteiner onPress={() => showModal()}>
            <GlobalModal
              visible={visible}
              setVisible={setVisible}
              labelButtonLeft="Tirar foto"
              labelButtonRight="Galeria"
              actionButtonLeft={handlePickImage}
              actionButtonRight={handleSelectImage}
            />
            {values.userimage ? (
              <S.Image source={{ uri: values.userimage }} />
            ) : (
              <>
                <S.IconInput />
                <S.ImageText>Mundar imagem</S.ImageText>
              </>
            )}
          </S.IconConteiner>
        </S.ImageContainer>

        <S.InputsContainer>
          <S.Inputs showsVerticalScrollIndicator={false}>
            <Input
              title="Nome"
              iconType="ionicons"
              placeholder="Digite seu nome"
              value={values.username}
              error={errors.username}
              onChangeText={handleChange('username')}
              width={100}
            />
            <Input
              title="Sobrenome"
              iconType="ionicons"
              placeholder="Digite seu sobrenome"
              value={values.lastname}
              error={errors.lastname}
              onChangeText={handleChange('lastname')}
              width={100}
            />
            <Input
              title="Email"
              placeholder="Digite sua email"
              value={values.email}
              error={errors.email}
              onChangeText={handleChange('email')}
              width={100}
            />
            <Input
              title="Senha"
              placeholder="Digite sua senha"
              value={values.password}
              error={errors.password}
              onChangeText={handleChange('password')}
              width={100}
            />
            <Input
              title="Data Nascimento"
              placeholder="Digite sua data nascimento"
              value={values.birthdate}
              error={errors.birthdate}
              onChangeText={handleChange('birthdate')}
              width={100}
            />
            <Input
              title="Endereço"
              placeholder="Digite sua endereço"
              value={values.address}
              error={errors.address}
              onChangeText={handleChange('address')}
              width={100}
            />
            <Picker
              title="Gênero"
              itemSelect={values.gender}
              setItem={item => {
                setFieldValue('gender', item);
              }}
              genders={GENDERS}
              disabled={false}
            />
            <S.ButtonContainer>
              <Button label="Sair" actionBtn={() => logout()} />
            </S.ButtonContainer>
          </S.Inputs>
        </S.InputsContainer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default Profile;
