// Mock Supabase client to allow preview to load while dependency issues are resolved
export const supabase = {
  from: () => ({
    insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
    select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  }
} as any;
