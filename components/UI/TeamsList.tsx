import { CircleDashedIcon } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '../shadCn/ui/avatar'
import { Card, CardContent, CardHeader } from '../shadCn/ui/card'

type Props = {
    teams: TeamType[]
    variant?: 'default' | 'popup'
}

export default function TeamsList({ teams, variant = 'default' }: Props) {
    if (!teams || !Array.isArray(teams) || teams == null) {
        return (
            <span className="mb-4 text-sm font-light text-muted-foreground">
                No teams yet
            </span>
        )
    }
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
        <Link className="" href={`/teams/${team.name}`}>
            <Card className="my-2 max-w-[300px]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <span className="text-xl font-semibold">{team.name}</span>
                    <Avatar className="size-10 bg-background">
                        <AvatarImage
                            src={team.imageLink}
                            className="bg-transparent"
                        />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </CardHeader>
                {team.description && (
                    <CardContent>
                        <p className="text-muted-foreground">
                            {team.description}123
                        </p>
                    </CardContent>
                )}
            </Card>
        </Link>
    )
}
