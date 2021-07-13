import { LucidModel } from '@ioc:Adonis/Lucid/Model'
import slugify from '@slynova/slug'

export default class Slug {
	public static async make<T extends LucidModel>(
		modelInstance: T,
		fieldValue: string
	): Promise<string> {
		const slug: string = slugify(fieldValue)

		const alreadyExists = await modelInstance
			.query()
			.select('*')
			.whereRaw(`?? REGEXP ?`, ['slug', `^${slug}(-[0-9]*)?$`]) // MySQL
			.orderBy('created_at', 'desc')
			.first()

		if (!alreadyExists) {
			return slug
		}

		const lastNum = Number(alreadyExists['slug'].replace(`${slug}-`, ''))
		return !lastNum || Number.isNaN(lastNum) ? `${slug}-1` : `${slug}-${lastNum + 1}`
	}
}