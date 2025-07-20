import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import ReactSyntax from './ReactSyntax'

import styles from './MarkdownPreview.module.scss'

type Props = {
    markdown?: string | null
}
function ReactMarkdown({ markdown = null }: Props) {
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
