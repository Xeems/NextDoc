'use server'

import { promises as fs } from 'fs'
import { z } from 'zod'

const MAX_FILE_SIZE = 50000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

const someSchema = z.object({
    image: z
        .any()
        .refine(
            (file: File) => file?.size <= MAX_FILE_SIZE,
            `Максимальный размер изображения - 5 МБ.`,
        )
        .refine(
            (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            'Поддерживаются только форматы .jpg, .jpeg, .png и .webp.',
        ),
})

export const uploadImageAction = async (data: FormData) => {
    const image = data.get('file') as File
    const path = 'public/uploads'
    const fileName = `${image.name}`

    const validationResult = await someSchema.safeParseAsync(image)

    try {
        // const buffer = await fs.readFile(image.path)
        const buffer = await image.arrayBuffer()
        const file = await fs.writeFile(
            `${path}/${fileName}`,
            Buffer.from(buffer),
        )

        return { src: `/uploads/${fileName}` }
    } catch (e: any) {
        console.error(e)
        return { error: 'Не удалось загрузить изображение' }
    }
}
