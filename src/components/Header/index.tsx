import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Input from '~/components/Input';

import type { AplicationState } from '~/@types/entities/AplicationState';
import {
  decrementFontSize,
  incrementFontSize,
  recoveryFontSize,
} from '~/store/ducks/font/actions';
import { toogleTheme } from '~/store/ducks/theme/actions';

import * as Sty from './styles';

interface HeaderProps {
  title?: string;
  headerMenu: boolean;
  navigation: any;
  options: any;
}

export function Header({
  title,
  headerMenu,
  navigation,
  options,
}: HeaderProps) {
  const dispatch = useDispatch();
  const { userimage } = useSelector((state: AplicationState) => state.user);

  return (
    <Sty.Container headerMenu={headerMenu}>
      <Sty.StatusBar />
      <Sty.AceContainer>
        <Sty.AceContainerLeft>
          <Sty.ButtonHeaderUp onPress={() => dispatch(toogleTheme())}>
            <Sty.IconChangeTheme />
          </Sty.ButtonHeaderUp>
        </Sty.AceContainerLeft>
        <Sty.AceContainerRight>
          <Sty.ButtonHeaderUp onPress={() => dispatch(decrementFontSize())}>
            <Sty.SizeText>A-</Sty.SizeText>
          </Sty.ButtonHeaderUp>
          <Sty.ButtonHeaderUp onPress={() => dispatch(recoveryFontSize())}>
            <Sty.SizeText>A</Sty.SizeText>
          </Sty.ButtonHeaderUp>
          <Sty.ButtonHeaderUp onPress={() => dispatch(incrementFontSize())}>
            <Sty.SizeText>A+</Sty.SizeText>
          </Sty.ButtonHeaderUp>
        </Sty.AceContainerRight>
      </Sty.AceContainer>
      {headerMenu && (
        <Sty.HeaderContainer>
          {/* componentes da tela com voltar */}
          {options?.enableNavigation && (
            <>
              <Sty.ButtonLeft onPress={() => navigation.goBack()}>
                <Sty.IconBack />
              </Sty.ButtonLeft>
              <Sty.Title>{title || options?.title}</Sty.Title>
            </>
          )}

          {/* componentes da tela home */}
          {options?.iconProfile && (
            <>
              <Sty.ButtonLeft onPress={() => options.iconProfileAction()}>
                {userimage ? (
                  <Sty.ImageProfile source={{ uri: userimage }} />
                ) : (
                  <Sty.IconProfile />
                )}
              </Sty.ButtonLeft>
              <Sty.InputContainer>
                <Input
                  color="white"
                  iconLeft="search"
                  iconType="ionicons"
                  placeholder="Digite uma categoria"
                  value={options.search}
                  onChangeText={options.setSearch}
                  onSubmitEditing={options.handleSearchBooks}
                  width={100}
                />
              </Sty.InputContainer>
            </>
          )}

          {/* componentes da tela perfil */}
          {options?.save && (
            <Sty.ButtonLeft onPress={() => options.save()}>
              <Sty.IconSaveData />
            </Sty.ButtonLeft>
          )}
        </Sty.HeaderContainer>
      )}
    </Sty.Container>
  );
}

export const headerOption = {
  header: (props: any) => <Header {...props} />,
};
