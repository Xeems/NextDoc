import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { getUserBySessionAction } from '@/src/server/actions/user/getUserBySession'
import { getWorkspaceMemberAction } from '@/src/server/actions/workspace/getWorkspaceMember'
import { updateWorkspaceAvatar } from '@/src/server/db/workspace.data'

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody
    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname, workspaceId) => {
                // Generate a client token for the browser to upload the file
                // ⚠️ Authenticate and authorize users before generating the token.
                // Otherwise, you're allowing anonymous uploads.
                const user = await getUserBySessionAction()
                if (!user) throw Error('User not found')

                if (!workspaceId) throw Error('Workspace not found')

                const member = await getWorkspaceMemberAction(
                    workspaceId.toString(),
                )

                if (
                    member?.data?.role !== 'OWNER' &&
                    member?.data?.role !== 'ADMIN'
                )
                    throw Error('No permission to upload avatar')
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png'],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                        // you could pass a user id from auth, or a value from clientPayload
                        userId: user.id,
                        workspaceId: workspaceId,
                    }),
                }
            },

            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Get notified of client upload completion
                // ⚠️ This will not work on `localhost` websites,
                // Use ngrok or similar to get the full upload flow
                console.log('blob upload completed', blob, tokenPayload)

                try {
                    // Run any logic after the file upload completed
                    // const { userId } = JSON.parse(tokenPayload);
                    // await db.update({ avatar: blob.url, userId });

                    const { workspaceId } = JSON.parse(tokenPayload!)
                    const workspace = await updateWorkspaceAvatar(
                        workspaceId,
                        blob.url,
                    )
                    if (workspace)
                        revalidatePath(`/workspaces/${workspace.name}`)
                } catch (error) {
                    throw new Error('Could not update user')
                }
            },
        })

        return NextResponse.json(jsonResponse)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The webhook will retry 5 times waiting for a 200
        )
    }
}
