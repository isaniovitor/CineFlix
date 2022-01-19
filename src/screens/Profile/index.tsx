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
import { GENDERS } from '~/constants/gender';
import { HOME_SCREEN, LOGIN_SCREEN } from '~/constants/routes';
import { changeProfileAction } from '~/store/ducks/user/actions';

import { validationSchema } from './validations';

import * as S from './styles';

interface DataProps {
  username: string;
  password: string;
  email: string;
  birthdate: string;
  gender: GenderProps;
  userimage: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const { username, userimage, email, password, birthdate, gender } =
    useSelector((state: AplicationState) => state.user);

  function changeData(data: DataProps) {
    dispatch(
      changeProfileAction(
        data.username,
        data.password,
        data.userimage,
        data.email,
        data.birthdate,
        data.gender,
      ),
    );
    navigation.navigate(HOME_SCREEN);
  }

  const { handleSubmit, dirty, handleChange, values, errors, setFieldValue } =
    useFormik({
      initialValues: {
        username,
        password,
        email,
        userimage,
        birthdate,
        gender,
      },
      validationSchema,
      onSubmit: changeData,
      validateOnChange: false,
    });

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

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFieldValue('userimage', result.uri);
    }
    setVisible(false);
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFieldValue('userimage', result.uri);
    }

    setVisible(false);
  };

  // Modal
  function showModal() {
    setVisible(true);
  }

  function logout() {
    navigation.navigate(LOGIN_SCREEN);
  }

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
              actionButtonLeft={pickImage}
              actionButtonRight={selectImage}
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
              placeholder="Digite seu username"
              value={values.username}
              error={errors.username}
              onChangeText={handleChange('username')}
              width={100}
            />
            <Input
              title="Sobrenome"
              iconType="ionicons"
              placeholder="Digite seu username"
              value={values.username}
              error={errors.username}
              // onChangeText={handleChange('username')}
              width={100}
            />
            <Input
              title="Email"
              placeholder="Digite sua email"
              value={values.email}
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
              placeholder="Digite sua senha"
              value={values.birthdate}
              onChangeText={handleChange('birthdate')}
              width={100}
            />
            <Input
              title="Endereço"
              placeholder="Digite sua senha"
              // value={values.birthdate}
              // onChangeText={handleChange('birthdate')}
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
