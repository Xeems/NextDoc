import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

type Props = {
    children: React.ReactNode
    className?: string
    filename?: string
    rest: any
}
function ReactSyntax({ className, children, rest, filename }: Props) {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
        <>
            {filename}
            <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
            />
        </>
    ) : (
        <code {...rest} className={className}>
            {children}
        </code>
    )
}

export default ReactSyntax
