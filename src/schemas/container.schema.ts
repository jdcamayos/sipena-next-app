import * as Yup from 'yup'

export const containerSchema = Yup.object().shape({
	type: Yup.string().required(),
	contain: Yup.string().required(),
	productQuantity: Yup.number().min(1, 'Must be different than 0').required(),
	productWeight: Yup.number().min(1, 'Must be different than 0').required(),
	forkliftOperator: Yup.boolean().required(),
	stretchWrap: Yup.boolean().required(),
	additionalInfo: Yup.string(),
})
