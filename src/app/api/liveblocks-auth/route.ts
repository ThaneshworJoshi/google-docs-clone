import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
        return {
            status: 401,
            body: {
                error: "Unauthorized",
            },
        };
    }
    const user = await currentUser();

    if (!user) {
        return {
            status: 401,
            body: {
                error: "Unauthorized",
            },
        };
    }

    const { room } = await req.json();
    const document = await convex.query(api.documents.getById, { id: room });

    if (!document) {
        return {
            status: 401,
            body: {
                error: "Unauthroized",
            },
        };
    }

    const isOwner = document.ownerId === user.id;
    const isOrganizationMember = 
        !!(document.organizationId && document.organizationId === sessionClaims.org_id);

    if (!isOwner && !isOrganizationMember) {
        return {
            status: 401,
            body: {
                error: "Unauthorized",
            },
        };
    }

    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
            avatar: user.imageUrl,
        },
    });
 
    session.allow(room, session.FULL_ACCESS);

    const { body, status } = await session.authorize();
    return new Response(body, { status });
}