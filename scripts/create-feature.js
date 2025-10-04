import fs from 'fs'
import path from 'path'

const featureName = process.argv[2]

if (!featureName) {
  console.error('❌ Please provide a feature name. Example: npm run create-feature feature-a')
  process.exit(1)
}

// Convert ke PascalCase
const pascalCase = featureName
  .split('-')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join('')

const baseDir = path.resolve('src/features', featureName)
const routerFilePath = path.resolve('src/router/index.ts')

if (fs.existsSync(baseDir)) {
  console.error(`⚠️ Feature "${featureName}" already exists.`)
  process.exit(1)
}

// Template isi file
const templates = {
  component: `<script setup lang="ts"></script>
<template>
  <div>${pascalCase}</div>
</template>
`,

  language: `export default {
  feature_title: 'This is ${pascalCase}',
}
`,

  model: `export enum ${pascalCase}PageName {
  ${pascalCase.toUpperCase()} = '${pascalCase}',
}

export type ${pascalCase}RequestPayload = {
  name: string
}
`,

  route: `import type { RouteRecordRaw } from 'vue-router'
import { ${pascalCase}PageName } from '../models'

const ${featureName}Routes: RouteRecordRaw[] = [
  {
    path: '/${featureName}',
    name: ${pascalCase}PageName.${pascalCase.toUpperCase()},
    component: () => import('@/features/${featureName}/views/${pascalCase}View.vue'),
  },
]

export default ${featureName}Routes
`,

  service: `import axiosInstance from '@/plugins/axios'
import type { ApiResponse, CustomAxiosRequestConfig } from '@/shared/models/api'
import type { ${pascalCase}RequestPayload } from '../models'

export const ${pascalCase}Request = async (payload: ${pascalCase}RequestPayload): Promise<ApiResponse> => {
  const configRequest: CustomAxiosRequestConfig<${pascalCase}RequestPayload> = {
    url: '/${featureName}/request',
    method: 'POST',
    data: payload,
    meta: {
      requiresAuth: true,
    },
  }
  const { data } = await axiosInstance.request(configRequest)
  return data
}
`,

  view: `<script setup lang="ts">
import ${pascalCase}Component from '../components/${pascalCase}Component.vue'
</script>

<template>
  <div>
    <${pascalCase}Component></${pascalCase}Component>
  </div>
</template>
`,
}

// Struktur folder & file
const structure = {
  components: { [`${pascalCase}Component.vue`]: templates.component },
  languages: {
    [`${featureName}.en.ts`]: templates.language,
    [`${featureName}.id.ts`]: templates.language,
  },
  models: { 'index.ts': templates.model },
  routes: { 'index.ts': templates.route },
  services: { 'api.ts': templates.service },
  stores: {},
  views: { [`${pascalCase}View.vue`]: templates.view },
}

// Buat folder dan isi file
fs.mkdirSync(baseDir, { recursive: true })
Object.entries(structure).forEach(([folder, files]) => {
  const folderPath = path.join(baseDir, folder)
  fs.mkdirSync(folderPath)
  Object.entries(files).forEach(([filename, content]) => {
    fs.writeFileSync(path.join(folderPath, filename), content)
  })
})

console.log(`✅ Feature "${featureName}" created successfully at src/features/${featureName}`)

// --- 🔥 Update router/index.ts ---
if (fs.existsSync(routerFilePath)) {
  let routerContent = fs.readFileSync(routerFilePath, 'utf-8')

  const importStatement = `import ${featureName}Routes from '@/features/${featureName}/routes'`
  const spreadStatement = `...${featureName}Routes`

  // Tambahkan import kalau belum ada
  if (!routerContent.includes(importStatement)) {
    // Tambah di atas import lainnya (setelah import pertama)
    const importLines = routerContent.match(/^import.*$/gm) || []
    const lastImport = importLines[importLines.length - 1]
    routerContent = routerContent.replace(lastImport, `${lastImport}\n${importStatement}`)
  }

  // Tambahkan ke listRoutes
  const listRoutesMatch = routerContent.match(/const\s+listRoutes\s*=\s*\[(.*?)\]/s)
  if (listRoutesMatch) {
    const listContent = listRoutesMatch[1].trim()
    const alreadyExists = listContent.includes(spreadStatement)

    if (!alreadyExists) {
      // Sisipkan sebelum `]` dan pastikan koma ditambahkan
      const newListContent = listContent.endsWith(',')
        ? `${listContent}\n  ${spreadStatement},`
        : `${listContent}${listContent ? ',' : ''}\n  ${spreadStatement},`

      routerContent = routerContent.replace(
        listRoutesMatch[0],
        `const listRoutes = [${newListContent}\n]`,
      )
    }
  } else {
    console.warn("⚠️ Could not find 'listRoutes' array in router/index.ts")
  }

  fs.writeFileSync(routerFilePath, routerContent, 'utf-8')
  console.log(`✅ Added ${featureName}Routes to router/index.ts`)
} else {
  console.warn('⚠️ router/index.ts not found, skipping route registration.')
}
