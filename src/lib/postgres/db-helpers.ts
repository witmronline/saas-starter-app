// src/lib/postgres/db-helpers.ts
export async function ensureSummariesTable(client: any) {
  // 1. Create table if it doesn't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.summaries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      title TEXT DEFAULT 'Untitled',
      content TEXT,
      is_archived BOOLEAN DEFAULT false,
      is_public BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      deleted_at TIMESTAMPTZ
    );
  `);

  // 2. Ensure required columns exist (safe migrations)
  await client.query(`ALTER TABLE public.summaries ADD COLUMN IF NOT EXISTS title TEXT DEFAULT 'Untitled';`);
  await client.query(`ALTER TABLE public.summaries ADD COLUMN IF NOT EXISTS content TEXT;`);
  await client.query(`ALTER TABLE public.summaries ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;`);
  await client.query(`ALTER TABLE public.summaries ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;`);
  await client.query(`ALTER TABLE public.summaries ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();`);
  await client.query(`ALTER TABLE public.summaries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();`);
  await client.query(`ALTER TABLE public.summaries ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;`);

  // 3. Trigger to auto-update updated_at
  await client.query(`
    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS set_updated_at_trigger ON public.summaries;

    CREATE TRIGGER set_updated_at_trigger
    BEFORE UPDATE ON public.summaries
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  `);

  // 4. Indexes
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_summaries_user_id ON public.summaries(user_id);
  `);
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_summaries_created_at ON public.summaries(created_at);
  `);
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_summaries_updated_at ON public.summaries(updated_at);
  `);
}