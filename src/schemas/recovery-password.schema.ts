import * as Yup from 'yup'

export const recoveryPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too short').max(20, 'Too long').required('Required')
})