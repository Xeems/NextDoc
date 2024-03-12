'use client'

import { useEffect } from "react";
import hljs from "highlight.js"
import 'highlight.js/styles/vs2015.css'

type Props= {
    language: string,
    code: string
}

function CodeSection({language, code}: Props) {
    useEffect(() => {
        hljs.highlightAll();
      }, []);

    return (
        <div className='w-full h-fit my-8 border border-solid rounded-md border-gray-600 bg-gray-800'>
            <pre>
                <code className={`hljs ${language}`}>
                {code}
                </code>
            </pre>
        </div>
    )
}

export default CodeSection