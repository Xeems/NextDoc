type Props = {
    text?: string
    isEditable: boolean
}

function TextSection({ ...props }: Props) {
    return (
        <div
            contentEditable={props.isEditable}
            className="my-4 flex w-full text-base font-medium leading-relaxed tracking-wider text-foreground">
            {props.text}
        </div>
    )
}

export default TextSection
