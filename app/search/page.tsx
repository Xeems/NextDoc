import React from 'react'

import SearchFrom from './SearchFrom'

function SearchPage() {
    return (
        <div className="w-full flex flex-col items-center ">
            <div className="w-full  lg:max-w-[70rem] justify-stretch flex my-10 px-5">
                <SearchFrom />
            </div>
        </div>
    )
}

export default SearchPage
