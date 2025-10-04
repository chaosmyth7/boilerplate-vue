# 🧩 Vue 3 Project Structure Guide

This project follows a **feature-based architecture** with clearly separated modules for features, shared utilities, and global plugins.

---

## 🗂 Folder Structure Overview

```
src/
├── assets/                       # Static styles and assets (CSS, images)
├── main.ts                       # App bootstrap
├── App.vue                       # Root app component

├── features/                     # Feature-specific domains
│   ├── feature-a/
│   │   ├── components/           # UI components specific to feature-a
│   │   ├── languages/            # i18n messages specific to feature-a
│   │   ├── models/               # Types or interfaces
│   │   ├── routes/               # Route configs for feature-a
│   │   ├── services/             # API or business logic
│   │   ├── stores/               # Pinia stores
│   │   └── views/                # Vue page components
│   └── feature-b/                # (Repeat structure for other features)

├── shared/                       # Shared code reused across features
│   ├── components/               # Global reusable components
│   ├── languages/                # Shared i18n messages (e.g. errors, common labels)
│   ├── models/                   # Shared types/interfaces
│   ├── routes/                   # Global or fallback routes
│   └── views/                    # Shared views (e.g. 404 Page)
```
