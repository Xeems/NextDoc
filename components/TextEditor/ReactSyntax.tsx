import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

type Props = {
    children: React.ReactNode
    className?: string
    rest: any
}
function ReactSyntax({ className, children, rest }: Props) {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
        <div className="border border-accent rounded-md h-fit">
            <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
            />
        </div>
    ) : (
        <code {...rest} className={className}>
            {children}
        </code>
    )
}

export default ReactSyntax
