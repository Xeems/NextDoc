import React, { useState } from 'react'
import {
    SimpleTreeItemWrapper,
    SortableTree,
    TreeItemComponentProps,
    TreeItems,
} from 'dnd-kit-sortable-tree'
const Tree = ({ articles }: { articles: ArticleType[] }) => {
    const [items, setItems] = useState(articles)
    return (
        <SortableTree
            items={articles}
            onItemsChanged={setItems}
            TreeItemComponent={TreeItem}
        />
    )
}

// eslint-disable-next-line react/display-name
const TreeItem = React.forwardRef<
    HTMLDivElement,
    TreeItemComponentProps<ArticleType>
>((props, ref) => {
    const [sample, setSample] = useState('')
    return (
        <SimpleTreeItemWrapper {...props} ref={ref}>
            <div>{props.item.title}</div>
            <input
                value={sample}
                onChange={(e) => {
                    setSample(e.target.value)
                }}></input>
        </SimpleTreeItemWrapper>
    )
})

export default Tree
