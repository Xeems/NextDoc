import DocumentListSkeleton from '@/src/components/skeletons/DocumentListSkeleton'

export default function loading() {
    return (
        <div className="flex w-full flex-col gap-y-5  bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem] lg:flex-row">
            <div className="flex h-fit w-full flex-col justify-stretch p-2  lg:w-1/4">
                <div className="flex flex-row items-center  gap-x-4">
                    <div className="size-20 animate-pulse rounded-full border bg-gray-300" />
                    <div className="flex flex-col gap-y-2">
                        <div className="my-1 h-5 w-40 animate-pulse rounded bg-gray-300" />
                        <div className="my-1 h-3 w-40 animate-pulse rounded bg-gray-300" />
                    </div>
                </div>
                <div className="my-4 space-y-4">
                    <span className="mt-4 text-xl font-semibold ">Teams</span>
                    <div className=" h-5 w-2/3 animate-pulse rounded bg-gray-300"></div>
                    <div className=" h-5 w-2/3 animate-pulse rounded bg-gray-300"></div>
                    <div className=" h-5 w-2/3 animate-pulse rounded bg-gray-300"></div>
                </div>
            </div>

            <div className="flex h-fit w-full flex-col pb-8 lg:w-3/4">
                <div className="mb-4 flex items-center justify-between">
                    <span className="m-2 text-xl font-semibold">Documents</span>
                </div>
                <DocumentListSkeleton number={5} />
            </div>
        </div>
    )
}
