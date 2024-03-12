import { CircleDashedIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from './shadCn/ui/avatar'

type Props = {
    teams: TeamType[] | undefined
}

export default function TeamsList({ teams }: Props) {
    return (
        <ul>
            {teams &&
                teams.map((team) => {
                    return (
                        <li key={team.id}>
                            <Link
                                className="flex flex-row items-center gap-x-4 rounded-md p-2 hover:bg-accent"
                                href={`/teams/${team.name}`}>
                                <Avatar className="h-5 w-5 bg-background">
                                    <AvatarImage
                                        src={team.imageLink}
                                        className="bg-transparent"
                                    />
                                    <AvatarFallback>
                                        <CircleDashedIcon className="bg-transparen h-5 w-5 text-blue-600" />
                                    </AvatarFallback>
                                </Avatar>
                                {team.name}
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}
