import { USER_EMAIL, USER_PASSWORD } from '~/constants/authentication';
import Yup from '~/utils/yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .label('Username')
    .test('Username incorreto', '', function (value) {
      if (value !== USER_EMAIL) {
        return this.createError({
          message: `Username incorreto`,
        });
      }
      return true;
    }),
  password: Yup.string()
    .required()
    .min(5)
    .label('Senha')
    .test('Usuário não encontrado', '', function (value) {
      if (value !== USER_PASSWORD) {
        return this.createError({
          message: `Senha incorreta`,
        });
      }
      return true;
    }),
});
