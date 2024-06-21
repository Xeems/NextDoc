'use client'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/src/components/shadCn/ui/avatar'
import { Button } from '@/src/components/shadCn/ui/button'
import { Checkbox } from '@/src/components/shadCn/ui/checkbox'
import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'

import TableRowActions from './TableRowActions'

type propsDataType = Omit<UserWorkspaceType, 'team'>

type ColumnsProps = {
    data: propsDataType[]
}

const columnHelper = createColumnHelper<propsDataType>()

export const UserTableColumns = [
    columnHelper.display({
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }),

    // Grouping Column
    columnHelper.accessor((row) => `${row.user.username} ${row.user.image}`, {
        id: 'username',
        header: () => 'Username',
        cell: (props) => (
            <div className="flex flex-row items-center gap-x-4 capitalize">
                <Avatar className="size-6">
                    <AvatarImage
                        src={props.row.original.user.image as string}
                    />
                    <AvatarFallback />
                </Avatar>
                {props.row.original.user.username}
            </div>
        ),
    }),

    columnHelper.accessor('user.email', {
        id: 'email',
        header: () => 'Email',
        cell: (props) => (
            <div className="">{props.row.original.user.email}</div>
        ),
    }),

    columnHelper.accessor('role', {
        header: ({ column }) => {
            return (
                <Button
                    className="pl-0"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Role
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: (row) => <div className="lowercase">{row.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: ({ column }) => {
            return (
                <Button
                    className="pl-0"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Status
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: (row) => (
            <div className="lowercase">{row.getValue() || 'undefined'}</div>
        ),
    }),
    columnHelper.display({
        id: 'actions',
        cell: (props) => (
            <div className="flex items-center justify-end self-end">
                <TableRowActions row={props.row} />
            </div>
        ),
    }),
    // {
    //     id: 'actions',
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const member = row.original

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontalIcon className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() =>
    //                             navigator.clipboard.writeText(member.data.)
    //                         }>
    //                         Copy payment ID
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>
    //                         View payment details
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]
