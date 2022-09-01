export interface Base {
	id: string
	createdAt: Date
	updatedAt: Date
}

export interface ResponseBase {
	message: string
}

export interface ErrorResponseBase {
	statusCode: number
	message: string | string[]
	error: string
}

export interface Meta {
	page: number
	pages: number
	itemsPerPage: number
	totalItems: number
}
