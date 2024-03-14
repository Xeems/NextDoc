'use client'

import { CreateTeamModal } from '@/app/teams/CreateTeamModal'
import { useUserTeamsQuery } from '@/hooks/useUserTeamsQuery'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import TeamsList from './TeamsList'
import { Avatar, AvatarFallback, AvatarImage } from './shadCn/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './shadCn/ui/popover'
import { Separator } from './shadCn/ui/separator'

export default function PageHeader({ spaceName }: { spaceName: string }) {
    const { data: session } = useSession()
    const { data: teams } = useUserTeamsQuery(session?.user.username)
    return (
        <div className="flex min-h-20 w-full items-center border-0  border-solid bg-background-accent px-4 dark:bg-background">
            <div className="mx-auto flex w-full lg:min-w-[64rem] lg:max-w-[70rem]">
                <Popover>
                    <PopoverTrigger className="flex items-center gap-x-2 rounded-md p-1 ring-offset-background transition-colors hover:bg-background-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <h1 className="truncate text-3xl font-medium">
                            {spaceName}
                        </h1>
                        <ChevronsUpDownIcon className="h-4 w-4" />
                    </PopoverTrigger>
                    <PopoverContent className="mt-2 flex w-fit min-w-[250px] flex-col gap-y-1 bg-popover p-4">
                        <div className="text-sm text-muted-foreground">
                            Personal account
                        </div>
                        <Link
                            className="flex flex-row items-center gap-x-4 rounded-md p-2 hover:bg-accent"
                            href={`/teams/${session?.user.username}`}>
                            <Avatar className="h-5 w-5">
                                <AvatarImage
                                    sizes="1"
                                    src={session?.user.image}
                                />
                                <AvatarFallback />
                            </Avatar>
                            {session?.user.username}
                        </Link>
                        <Separator />
                        <div className="text-sm text-muted-foreground">
                            Teams
                        </div>
                        <TeamsList variant="popup" teams={teams} />
                        <CreateTeamModal />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
