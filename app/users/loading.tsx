import DocumentListSkeleton from '@/components/skeletons/DocumentListSkeleton'

export default function loading() {
    return (
        <div className="flex w-full flex-col lg:flex-row  gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <div className="flex h-fit w-full lg:w-1/4 flex-col justify-stretch  p-2">
                <div className="flex flex-row items-center  gap-x-4">
                    <div className="size-20 border bg-gray-300 animate-pulse rounded-full" />
                    <div className="flex flex-col gap-y-2">
                        <div className="animate-pulse bg-gray-300 w-40 h-5 rounded my-1" />
                        <div className="animate-pulse bg-gray-300 w-40 h-3 rounded my-1" />
                    </div>
                </div>
                <div className="space-y-4 my-4">
                    <span className="mt-4 text-xl font-semibold ">Teams</span>
                    <div className=" w-2/3 h-5 animate-pulse bg-gray-300 rounded"></div>
                    <div className=" w-2/3 h-5 animate-pulse bg-gray-300 rounded"></div>
                    <div className=" w-2/3 h-5 animate-pulse bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="flex h-fit w-full lg:w-3/4 flex-col pb-8">
                <div className="mb-4 flex items-center justify-between">
                    <span className="m-2 text-xl font-semibold">Documents</span>
                </div>
                <DocumentListSkeleton number={5} />
            </div>
        </div>
    )
}
