import { Button } from '@/components/shadCn/ui/button'

export default async function NotFound() {
    return (
        <div className="h-[calc(100vh - 70px)] flex w-full flex-col items-center justify-center gap-y-10">
            <b className="text-2xl">Document not found</b>
            <b className="text-9xl font-black md:text-[300px] lg:text-[400px]">
                404
            </b>
            <Button>Back to home</Button>
        </div>
    )
}
