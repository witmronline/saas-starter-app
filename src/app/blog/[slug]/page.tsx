import { getPost, getAllPosts } from "@/lib/posts"

export default async function Page({
    params,
}: {
    params: { slug: string }
}) {
    const { slug } = await params
    const { component: Post, metadata = {} } = await getPost(slug)

    return (
        <article className="prose dark:prose-invert mx-auto">
            <header className="mb-8">
                <h1>{metadata.title}</h1>
                {metadata.date && (
                    <time dateTime={metadata.date}>{metadata.date}</time>
                )}
                {metadata.tags?.length > 0 && (
                    <p>{metadata.tags.join(", ")}</p>
                )}
            </header>
            <Post />
        </article>
    )
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}) {
    const { slug } = await params
    const { metadata = {} } = await getPost(slug)

    return {
        title: metadata.title,
        description: metadata.description || "Default blog description",
        openGraph: {
            title: metadata.title,
            description: metadata.description || "Default blog description",
        },
    }
}

export function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export const dynamicParams = false
