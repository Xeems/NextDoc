import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './MarkdownPreview.module.scss'
import ReactSyntax from './ReactSyntax'

type Props = {
    markdown: string
}
function ReactMarkdown({ markdown }: Props) {
    return (
        <Markdown
            className={styles.markdownbody}
            components={{
                h1: 'h2',
                code(props) {
                    const { children, className, ...rest } = props
                    return (
                        <ReactSyntax className={className} rest={rest}>
                            {children}
                        </ReactSyntax>
                    )
                },
            }}
            remarkPlugins={[remarkGfm]}>
            {markdown}
        </Markdown>
    )
}

export default ReactMarkdown
