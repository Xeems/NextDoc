import { CircleDashedIcon } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from './shadCn/ui/avatar'
import { Card, CardHeader } from './shadCn/ui/card'

type Props = {
    teams: TeamType[] | undefined
    variant?: 'default' | 'popup'
}

export default function TeamsList({ teams, variant = 'default' }: Props) {
    return (
        <ul>
            {teams &&
                teams.map((team) => {
                    return (
                        <li key={team.id}>
                            {
                                {
                                    default: <TeamsListItemCard team={team} />,
                                    popup: <TeamsListItemPopUp team={team} />,
                                }[variant]
                            }
                        </li>
                    )
                })}
        </ul>
    )
}

export function TeamsListItemPopUp({ team }: { team: TeamType }) {
    return (
        <Link
            className="flex flex-row items-center gap-x-4 rounded-md p-2 hover:bg-accent"
            href={`/teams/${team.name}`}>
            <Avatar className="h-5 w-5 bg-background">
                <AvatarImage src={team.imageLink} className="bg-transparent" />
                <AvatarFallback>
                    <CircleDashedIcon className="bg-transparen h-5 w-5 text-blue-600" />
                </AvatarFallback>
            </Avatar>
            {team.name}
        </Link>
    )
}

export function TeamsListItemCard({ team }: { team: TeamType }) {
    return (
        <Link className="my-2" href={`/teams/${team.name}`}>
            <Card>
                <CardHeader>
                    <span>{team.name}</span>
                    <Avatar className="h-5 w-5 bg-background">
                        <AvatarImage
                            src={team.imageLink}
                            className="bg-transparent"
                        />
                        <AvatarFallback>
                            <CircleDashedIcon className="bg-transparen h-5 w-5 text-blue-600" />
                        </AvatarFallback>
                    </Avatar>
                </CardHeader>
            </Card>
        </Link>
    )
}
