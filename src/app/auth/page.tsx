import SignGithubBtn from '@/src/components/UI/SignGithubBtn'

function LoginPage() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-indigo-200 to-yellow-100">
            <div className="flex h-fit flex-col items-center gap-y-10 self-center rounded-md px-10 py-5">
                <span className="text-3xl font-semibold text-black">
                    Sign in
                </span>
                <SignGithubBtn />
            </div>
        </div>
    )
}
export default LoginPage
