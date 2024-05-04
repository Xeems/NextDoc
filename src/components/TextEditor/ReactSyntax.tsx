import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

type Props = {
    children: React.ReactNode
    className?: string
    rest: any
}

//to-do dark them color schema
function ReactSyntax({ className, children, rest }: Props) {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
        <SyntaxHighlighter {...rest} PreTag="div" language={match[1]}>
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code {...rest} className={className}>
            {children}
        </code>
    )
}

export default ReactSyntax
