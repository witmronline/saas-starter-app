import { getAllPosts } from "@/lib/posts"
import Link from "next/link"

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post.slug} className="border-b pb-4">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-2xl font-semibold text-blue-600 hover:underline"
                        >
                            {post.title}
                        </Link>
                        {post.date && (
                            <p className="text-gray-500 text-sm mt-1">{post.date}</p>
                        )}
                        {post.description && (
                            <p className="text-gray-700 mt-2">{post.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
