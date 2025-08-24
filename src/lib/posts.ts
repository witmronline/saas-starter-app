// src/lib/posts.ts
import fs from "fs"
import path from "path"

export interface PostMeta {
    slug: string
    title: string
    date?: string
    description?: string
    tags?: string[]
}

const contentDir = path.join(process.cwd(), "src/content")

// ✅ Get all posts metadata
export function getAllPosts(): PostMeta[] {
    const files = fs.readdirSync(contentDir)

    const posts: PostMeta[] = files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "")
            const { metadata = {} } = require(`@/content/${file}`)
            return {
                slug,
                title: metadata.title || slug,
                date: metadata.date,
                description: metadata.description,
                tags: metadata.tags || [],
            }
        })

    // sort by date (newest first)
    return posts.sort((a, b) => {
        if (a.date && b.date) return a.date < b.date ? 1 : -1
        return 0
    })
}

// ✅ Get a single post (component + metadata)
export async function getPost(slug: string) {
    const filePath = path.join(contentDir, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        throw new Error(`Post not found: ${slug}`)
    }

    // Import MDX dynamically
    const post = await import(`@/content/${slug}.mdx`)

    return {
        slug,
        metadata: post.metadata || {},
        component: post.default,
    }
}
