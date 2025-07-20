import { ArrowRight, SearchIcon } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '../lib/routes'

function MainPage() {
    return (
        <div className="h-full w-full bg-gradient-to-r from-indigo-200 to-yellow-100 ">
            <div className="flex w-full flex-col items-center bg-transparent transition delay-1000 duration-1000 ease-in-out">
                <section className="my-28 flex w-full max-w-screen-xl flex-row ">
                    <div className="flex w-full flex-col items-start gap-y-7  p-4">
                        <h1 className=" text-5xl font-bold text-black">
                            Next generation API documentation tool
                        </h1>
                        <p className="w-2/3 text-lg font-medium text-black">
                            Centralize your team’s knowledge and create
                            beautiful documentation your customers and teams
                            will love
                        </p>
                        <div>
                            <Link
                                href={ROUTES.AUTH}
                                className="group flex w-fit flex-row items-center justify-center gap-x-2 rounded py-2 text-black  hover:scale-105 ">
                                <div className="rounded-full bg-black  p-2">
                                    <ArrowRight className="size-5 text-white" />
                                </div>
                                <span className="text-lg font-normal text-black group-hover:text-slate-600">
                                    Start for free
                                </span>
                            </Link>
                            <Link
                                href={ROUTES.SEARCH}
                                className="group flex w-fit flex-row items-center justify-center gap-x-2 rounded py-2 text-black  hover:scale-105 ">
                                <div className="rounded-full bg-black  p-2">
                                    <SearchIcon className="size-5 text-white" />
                                </div>
                                <span className="text-lg font-normal text-black group-hover:text-slate-600">
                                    Search for documents
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MainPage
