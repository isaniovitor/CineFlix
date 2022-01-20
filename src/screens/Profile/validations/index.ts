import Yup from '~/utils/yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  lastname: Yup.string().required().label('Lastname'),
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().min(5).label('Senha'),
  birthdate: Yup.date().required().label('Birthdate'),
  address: Yup.string().required().label('Address'),
});
