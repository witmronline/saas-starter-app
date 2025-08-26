import { getPost, getAllPosts } from "@/lib/posts"
import { title } from "process"

export default async function Page({
    params,
}: {
    params: { slug: string }
}) {
    const { slug } = await params;
    const { component: Post, metadata: { title = "", description = "", date = "", tags = [] } } = await getPost(slug)

    return (
        <article className="prose dark:prose-invert mx-auto">
            <header className="mb-8">
                <h1>{title}</h1>
                <div className="">{description}</div>
                {date && (
                    <time dateTime={date}>{date}</time>
                )}
                {tags?.length > 0 && (
                    <p>{tags.join(", ")}</p>
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
    const { slug } = await params;
    const { metadata: { title = "", description = "Default blog description", ...rest } } = await getPost(slug)

    return {
        title,
        description,
        openGraph: {
            title,
            description
        },
        ...rest
    }
}

export function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export const dynamicParams = false
