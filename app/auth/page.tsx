import SignGithubBtn from '@/components/UI/SignGithubBtn'
import SignGoogleBtn from '@/components/UI/SignGoogleBtn'

function LoginPage() {
    return (
        <div className="flex h-fit flex-col items-center self-center p-5 gap-5">
            <SignGithubBtn />
            <SignGoogleBtn />
        </div>
    )
}
export default LoginPage
