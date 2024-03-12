import Image from "next/image";
import { type } from "os";

type Props = {
    src: string
}

export default function ImageSection({ src }: Props) {
    return (
        <div className="w-full h-auto my-8 border border-solid rounded-md border-gray-600 bg-gray-100">
            <Image
                src={src}
                quality={100}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto'}}
                placeholder = 'empty'
               />
        </div >

    )
}
