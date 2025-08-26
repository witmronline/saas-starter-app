// src/types.ts
// src/types/summary.ts
export interface Summary {
    id: string;                // UUID from DB
    user_id: string;           // UUID referencing auth.users
    title: string;             // TEXT, defaults to "Untitled"
    content: string | null;    // TEXT, can be null
    is_archived: boolean;      // default false
    is_public: boolean;        // default false
    created_at: string;        // TIMESTAMPTZ
    updated_at: string;        // TIMESTAMPTZ
    deleted_at: string | null; // TIMESTAMPTZ, nullable
}

export interface UserProfile {
    full_name?: string;
    email?: string;
    avatar_url?: string;
}

