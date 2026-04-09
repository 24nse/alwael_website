# 🚀 Supabase Integration Implementation Guide

## ✅ What Has Been Completed

I've successfully set up the foundation for converting your website from static data to dynamic Supabase data:

### 📦 Files Created

1. **Supabase Client Configuration**
   - `src/lib/supabase.ts` - Supabase client with environment variable validation

2. **Custom Hooks** (in `src/hooks/website/`)
   - `usePublicTeam.ts` - Fetch team members
   - `usePublicProjects.ts` - Fetch projects with images
   - `usePublicContent.ts` - Fetch dynamic content sections
   - `usePublicForms.ts` - Submit orders and consultations

3. **Dynamic Components** (in `src/components/website/`)
   - `TeamSection.tsx` - Display team members from database
   - `DynamicProjectsSection.tsx` - Display projects from database

4. **Configuration Files**
   - `.env.example` - Environment variables template

---

## 🔧 Setup Steps

### Step 1: Install Dependencies ✅

Already completed! The Supabase client has been installed.

### Step 2: Configure Environment Variables

1. **Create `.env` file** in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

2. **Add your Supabase credentials** to `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
- Go to your Supabase Dashboard
- Select your project
- Go to Settings → API
- Copy the "Project URL" and "anon public" key

### Step 3: Set Up Database

You need to run the SQL script to create the database structure. Based on your analysis, you should have:

1. **Open Supabase SQL Editor**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Click "SQL Editor"

2. **Run the Database Setup Script**
   - Copy the content from `complete_database_setup.sql` (from your analysis)
   - Paste in SQL Editor
   - Click "Run" or press Ctrl+Enter

3. **Verify Tables Created**

```sql
-- Check all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;

-- Should show 7 tables:
-- 1. team_members
-- 2. projects
-- 3. project_images
-- 4. orders
-- 5. consultations
-- 6. content_sections
-- 7. users
```

### Step 4: Update Your Pages

Now you can update your pages to use the dynamic components:

#### Option A: Add Team Section to Index Page

Edit `src/pages/Index.tsx`:

```typescript
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import TeamSection from "@/components/website/TeamSection"; // ← Add this

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <StatsSection />
      <TeamSection /> {/* ← Add this */}
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
```

#### Option B: Replace Static Projects with Dynamic Projects

Edit `src/pages/Index.tsx`:

```typescript
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
// import ProjectsSection from "@/components/home/ProjectsSection"; // ← Comment out old
import DynamicProjectsSection from "@/components/website/DynamicProjectsSection"; // ← Add new
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DynamicProjectsSection /> {/* ← Use dynamic version */}
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
```

---

## 🧪 Testing

### Test 1: Verify Supabase Connection

Create a test file or add to your dev console:

```typescript
import { supabase } from '@/lib/supabase';

// Test connection
const testConnection = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('count');
  
  console.log('Connection test:', { data, error });
};

testConnection();
```

### Test 2: Test Team Members Hook

```typescript
import { usePublicTeam } from '@/hooks/website/usePublicTeam';

function TestComponent() {
  const { teamMembers, loading, error } = usePublicTeam();
  
  console.log('Team members:', teamMembers);
  console.log('Loading:', loading);
  console.log('Error:', error);
  
  return <div>Check console</div>;
}
```

### Test 3: Test Projects Hook

```typescript
import { usePublicProjects } from '@/hooks/website/usePublicProjects';

function TestComponent() {
  const { projects, loading, error } = usePublicProjects({ limit: 3 });
  
  console.log('Projects:', projects);
  
  return <div>Check console</div>;
}
```

---

## 📊 Database Structure Reference

### Tables Overview

| Table | Purpose | Public Read | Public Write |
|-------|---------|-------------|--------------|
| `team_members` | Team members display | ✅ Active only | ❌ |
| `projects` | Project portfolio | ✅ All | ❌ |
| `project_images` | Project images | ✅ All | ❌ |
| `orders` | Customer orders | ❌ | ✅ Insert only |
| `consultations` | Consultation requests | ❌ | ✅ Insert only |
| `content_sections` | Dynamic content | ✅ Active only | ❌ |
| `users` | Admin users | ❌ | ❌ |

---

## 🎨 Usage Examples

### Example 1: Display Team Members

```typescript
import TeamSection from '@/components/website/TeamSection';

function MyPage() {
  return (
    <div>
      <TeamSection />
    </div>
  );
}
```

### Example 2: Display Projects

```typescript
import DynamicProjectsSection from '@/components/website/DynamicProjectsSection';

function MyPage() {
  return (
    <div>
      <DynamicProjectsSection />
    </div>
  );
}
```

### Example 3: Submit Order Form

```typescript
import { usePublicForms } from '@/hooks/website/usePublicForms';

function OrderForm() {
  const { submitOrder, submitting } = usePublicForms();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitOrder({
      customer_name: 'John Doe',
      phone: '1234567890',
      property_type: 'Villa',
      location: 'Mukalla',
      message: 'I want to buy a villa'
    });
    
    if (result.success) {
      // Show success message
      console.log('Order submitted successfully!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={submitting}>
        {submitting ? 'جاري الإرسال...' : 'إرسال'}
      </button>
    </form>
  );
}
```

### Example 4: Use Dynamic Content

```typescript
import { usePublicContent } from '@/hooks/website/usePublicContent';

function HeroSection() {
  const { getSection, loading } = usePublicContent();
  
  const heroSection = getSection('hero');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <section>
      <h1>{heroSection?.title || 'Default Title'}</h1>
      <p>{heroSection?.content || 'Default content'}</p>
    </section>
  );
}
```

---

## 🔍 Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:** Make sure you created `.env` file with correct credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Issue: "Cannot find module '@/lib/supabase'"

**Solution:** Restart your dev server:

```bash
npm run dev
```

### Issue: "Permission denied for table X"

**Solution:** Check that RLS policies are created. Run the database setup script again.

### Issue: No data showing

**Solution:** 
1. Check database has data: `SELECT * FROM team_members WHERE is_active = true;`
2. Check RLS policies allow public read
3. Check browser console for errors

### Issue: "Failed to fetch team members"

**Solution:**
1. Verify Supabase URL and keys in `.env`
2. Check RLS policies allow public read
3. Check network tab in browser dev tools

---

## 📚 Next Steps

### Immediate (Today)
- [ ] Create `.env` file with Supabase credentials
- [ ] Run database setup SQL script
- [ ] Verify tables and data in Supabase
- [ ] Test connection from website

### Short-term (This Week)
- [ ] Add TeamSection to your pages
- [ ] Replace static ProjectsSection with dynamic version
- [ ] Test all components thoroughly
- [ ] Add sample data to database

### Long-term (Next Week)
- [ ] Implement order forms with usePublicForms
- [ ] Add consultation request forms
- [ ] Implement dynamic content sections
- [ ] Add admin authentication

---

## 🎯 Summary

You now have:
- ✅ Supabase client configured
- ✅ Custom hooks for data fetching
- ✅ Dynamic components ready to use
- ✅ Form submission hooks
- ✅ Complete documentation

**Next:** Create `.env` file and add your Supabase credentials!

---

## 📞 Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security
- **React Query (if needed):** https://tanstack.com/query/latest

---

**Created:** 2026-01-31  
**Status:** Ready for implementation 🚀
