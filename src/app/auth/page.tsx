import SignGithubBtn from '@/src/components/UI/SignGithubBtn'
import SignGoogleBtn from '@/src/components/UI/SignGoogleBtn'

function LoginPage() {
    return (
        <div className="flex h-fit flex-col items-center self-center p-5 gap-5">
            <SignGithubBtn />
            <SignGoogleBtn />
        </div>
    )
}
export default LoginPage