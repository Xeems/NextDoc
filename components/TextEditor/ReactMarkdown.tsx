import React from 'react'
import Markdown from 'react-markdown'

import styles from './MarkdownPreview.module.scss'

type Props = {
    markdown: string
}
function ReactMarkdown({ markdown }: Props) {
    return (
        <Markdown
            className={styles.markdownbody}
            components={{
                h1: 'h2',
            }}
            remarkPlugins={[]}>
            {markdown}
        </Markdown>
    )
}

export default ReactMarkdown
