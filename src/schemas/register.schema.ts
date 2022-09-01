import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').max(20, 'Too long').required('Required')
})