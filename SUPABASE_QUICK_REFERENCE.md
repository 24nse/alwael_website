# 🚀 Supabase Integration - Quick Reference Card

## 📋 Quick Setup (5 Steps)

### 1️⃣ Create `.env` File
```bash
# In project root
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2️⃣ Run Database Script
```sql
-- In Supabase SQL Editor
-- Copy and run: complete_database_setup.sql
```

### 3️⃣ Verify Installation
```bash
npm run dev
```

### 4️⃣ Add Components
```typescript
// In src/pages/Index.tsx
import TeamSection from "@/components/website/TeamSection";
import DynamicProjectsSection from "@/components/website/DynamicProjectsSection";

<TeamSection />
<DynamicProjectsSection />
```

### 5️⃣ Test in Browser
```
Open: http://localhost:5173
Check: Team members and projects display
```

---

## 🎯 Available Hooks

### usePublicTeam
```typescript
import { usePublicTeam } from '@/hooks/website/usePublicTeam';

const { teamMembers, loading, error, refetch } = usePublicTeam();
```

### usePublicProjects
```typescript
import { usePublicProjects } from '@/hooks/website/usePublicProjects';

const { projects, loading, error } = usePublicProjects({ 
  featuredOnly: true, 
  limit: 6 
});
```

### usePublicContent
```typescript
import { usePublicContent } from '@/hooks/website/usePublicContent';

const { content, getSection, loading } = usePublicContent();
const hero = getSection('hero');
```

### usePublicForms
```typescript
import { usePublicForms } from '@/hooks/website/usePublicForms';

const { submitOrder, submitConsultation, submitting } = usePublicForms();

await submitOrder({
  customer_name: 'أحمد',
  phone: '1234567890',
  property_type: 'فيلا',
  location: 'المكلا'
});
```

---

## 📊 Database Tables

| Table | Public Read | Public Write | Purpose |
|-------|-------------|--------------|---------|
| `team_members` | ✅ Active only | ❌ | Team display |
| `projects` | ✅ All | ❌ | Portfolio |
| `project_images` | ✅ All | ❌ | Project photos |
| `orders` | ❌ | ✅ Insert | Customer orders |
| `consultations` | ❌ | ✅ Insert | Consultation requests |
| `content_sections` | ✅ Active only | ❌ | Dynamic content |
| `users` | ❌ | ❌ | Admin users |

---

## 🎨 Components

### TeamSection
```typescript
import TeamSection from '@/components/website/TeamSection';

<TeamSection />
```
**Features:**
- Fetches active team members
- Displays profile images
- Shows contact info
- Responsive grid
- Loading/error states

### DynamicProjectsSection
```typescript
import DynamicProjectsSection from '@/components/website/DynamicProjectsSection';

<DynamicProjectsSection />
```
**Features:**
- Fetches projects with images
- Category filtering
- Featured badges
- Hover effects
- Loading/error states

---

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

---

## 🐛 Troubleshooting

### No data showing?
1. Check `.env` file exists
2. Verify Supabase credentials
3. Check database has data
4. Check browser console for errors

### Permission errors?
1. Run database setup script
2. Check RLS policies created
3. Verify using anon key (not service role)

### Module not found?
1. Restart dev server
2. Check file paths
3. Run `npm install`

---

## 📁 File Structure

```
src/
├── lib/
│   └── supabase.ts              ← Supabase client
├── hooks/
│   └── website/
│       ├── usePublicTeam.ts     ← Team hook
│       ├── usePublicProjects.ts ← Projects hook
│       ├── usePublicContent.ts  ← Content hook
│       └── usePublicForms.ts    ← Forms hook
└── components/
    └── website/
        ├── TeamSection.tsx      ← Team component
        └── DynamicProjectsSection.tsx ← Projects component
```

---

## 🎯 Data Flow

```
User Opens Website
       ↓
React Component (TeamSection)
       ↓
Custom Hook (usePublicTeam)
       ↓
Supabase Client
       ↓
Row Level Security Check
       ↓
Database Query
       ↓
Return Data
       ↓
Display on Website
```

---

## ✅ Quick Checklist

- [ ] `.env` file created
- [ ] Supabase credentials added
- [ ] Database script run
- [ ] Tables verified (7 total)
- [ ] Sample data exists
- [ ] Dev server running
- [ ] Components added to pages
- [ ] Website displays data
- [ ] No console errors

---

## 📚 Documentation

- **Full Guide:** `SUPABASE_IMPLEMENTATION_GUIDE.md`
- **Checklist:** `SUPABASE_CHECKLIST.md`
- **Summary:** `SUPABASE_SUMMARY.md`
- **This Card:** `SUPABASE_QUICK_REFERENCE.md`

---

## 🔗 Useful Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Supabase Docs:** https://supabase.com/docs
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security

---

## 💡 Pro Tips

1. **Always check browser console** for errors
2. **Use loading states** for better UX
3. **Handle errors gracefully** with user-friendly messages
4. **Test on mobile** devices
5. **Optimize images** before uploading
6. **Use TypeScript** for type safety
7. **Monitor RLS policies** regularly

---

## 🎉 You're Ready!

Everything is set up and ready to use. Just:
1. Create `.env` file
2. Run database script
3. Start dev server
4. Add components to your pages

**Estimated time:** 30 minutes

---

**Created:** 2026-01-31  
**Version:** 1.0  
**Status:** Production Ready 🚀
