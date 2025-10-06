# ⚠️ GitHub Pages Limitation - WebContainer Not Supported

## 🔍 Why You're Seeing a Blank Page

GitHub Pages **does not support** the CORS headers required by WebContainer API.

---

## 🚫 The Problem

### **WebContainer Requirements:**
WebContainer (from StackBlitz) requires these HTTP headers:
```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

### **GitHub Pages Limitation:**
- ❌ Cannot set custom HTTP headers
- ❌ No server-side configuration
- ❌ Static files only

###  **Result:**
- ❌ WebContainer fails to initialize
- ❌ App might show blank page
- ❌ Cannot run code in browser

---

## ✅ SOLUTIONS

### **Option 1: Deploy to Vercel (RECOMMENDED)** ⭐

Vercel supports custom headers and works perfectly!

**Steps:**
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts

4. Your app will be live with full WebContainer support!

**Benefits:**
- ✅ All features work
- ✅ WebContainer supported
- ✅ Custom headers set automatically
- ✅ Fast deployment
- ✅ Free tier available

### **Option 2: Deploy to Netlify**

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Create `netlify.toml`:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       Cross-Origin-Embedder-Policy = "require-corp"
       Cross-Origin-Opener-Policy = "same-origin"
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

### **Option 3: Run Locally** (Full Features)

```bash
npm run dev
```

Then open: `http://localhost:5173/bolt`

**Benefits:**
- ✅ All features work
- ✅ WebContainer fully functional
- ✅ Fast development
- ✅ No deployment needed

---

## 📊 Feature Comparison

| Feature | GitHub Pages | Vercel | Netlify | Localhost |
|---------|--------------|--------|---------|-----------|
| **Custom Headers** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **WebContainer** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Code Execution** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Terminal** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Live Preview** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **AI Generation** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **File Viewing** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Free Hosting** | ✅ Yes | ✅ Yes | ✅ Yes | N/A |

---

## 🎯 Quick Fix - Deploy to Vercel Now!

### **1-Minute Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login (first time only)
vercel login

# Deploy
vercel

# Answer prompts:
# - Project name: onsite-bolt
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist

# Done! Your app is live with full features!
```

**Your app will be at:** `https://your-project.vercel.app`

---

## 🔧 What Works Where

### **On GitHub Pages (Current):**
- ✅ UI loads
- ✅ Chat interface works
- ✅ AI generates code
- ✅ Can view generated files
- ❌ **Cannot execute code** (WebContainer blocked)
- ❌ **Cannot run terminal**
- ❌ **Cannot see live preview**

### **On Vercel/Netlify/Localhost:**
- ✅ **Everything works!**
- ✅ Full WebContainer support
- ✅ Execute code in browser
- ✅ Terminal commands work
- ✅ Live preview functional
- ✅ Production-ready deployment

---

## 💡 Why This Happens

### **Technical Explanation:**

WebContainer uses **SharedArrayBuffer** which requires:
- Secure context (HTTPS) ✅ GitHub Pages has this
- CORS headers ❌ GitHub Pages doesn't support this

### **The Headers:**

```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

These headers enable cross-origin isolation, required for SharedArrayBuffer.

### **Why GitHub Pages Can't Do This:**

GitHub Pages is a **static file server** only:
- No server-side configuration
- No custom headers
- No `.htaccess` or `nginx.conf`
- Files served as-is

---

## 🚀 Recommended Action

### **Deploy to Vercel for Full Features:**

I've already created `vercel.json` with the correct configuration:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        }
      ]
    }
  ]
}
```

**Just run:**
```bash
vercel
```

And your god-tier AI builder will work perfectly!

---

## 📝 Summary

### **Current Status:**
- 🟡 **GitHub Pages**: Partial functionality (AI works, WebContainer doesn't)
- 🟢 **Vercel/Netlify**: Full functionality
- 🟢 **Localhost**: Full functionality

### **Recommendation:**
**Deploy to Vercel** for the best experience with all features working!

---

## 🎓 Alternative: Make GitHub Pages Version Work

If you must use GitHub Pages, the app can still work by:

1. Generating code with AI ✅
2. Showing files in file tree ✅
3. Editing code ✅
4. Downloading generated files ✅
5. Running locally or deploying elsewhere ✅

**Just can't:**
- Execute code in browser ❌
- Use terminal ❌
- See live preview ❌

---

## 🔥 Next Steps

**Choose one:**

### **A. Full Features (Recommended)**
```bash
vercel
```

### **B. Run Locally**
```bash
npm run dev
```

### **C. Keep GitHub Pages (Limited)**
- AI generation works
- View and download files
- Deploy elsewhere to run

---

## 📞 Need Help?

**Vercel Deployment Issues:**
- Check: https://vercel.com/docs
- Ensure you're logged in: `vercel login`
- Check build logs if deployment fails

**Localhost Issues:**
- Make sure port 5173 is available
- Check `npm run dev` output
- Open DevTools console for errors

---

**Recommendation: Deploy to Vercel for full god-tier experience! 🚀**
