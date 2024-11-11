import { client } from "@/sanity/lib/client";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const token = process.env.SANITY_API_READ_TOKEN; // Ensure this token is correctly set in your environment variables

export async function GET(request: Request) {
    const { isValid, redirectTo = "/" } = await validatePreviewUrl(
        client.withConfig({ token }), // Correctly set token here
        request.url // Make sure request.url is properly passed
    );

    if (!isValid) {
        return new Response("Invalid Secret", { status: 401 });
    }

    (await draftMode()).enable();

    return redirect(redirectTo); // Return the redirect function correctly
}
