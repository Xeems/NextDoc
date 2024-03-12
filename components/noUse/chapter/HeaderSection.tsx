

type Props = {
    headerText: string
    id: string
}

function HeaderSection({ headerText, id}: Props) {
    return (
        <>
            <hr className="h-px mt-9 bg-gray-200 border-0" id ={id}></hr>
            <h2 className="my-4 text-3xl font-medium capitalize flex-nowrap overflow-hidden">
                {(headerText) ? headerText : 'Heading'}
            </h2>
        </>
    );
}

export default HeaderSection