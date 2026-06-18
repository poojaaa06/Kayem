// migrate-items.js (in root folder)

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

// Import from your sanity env file
// Since it's TypeScript, we'll hardcode or use the values
const projectId = 'dbhsmtn3'  // ← Get from src/sanity/env.ts
const dataset = 'production'              // ← Get from src/sanity/env.ts
const apiVersion = '2024-06-18'

console.log('📁 Project ID:', projectId)
console.log('📁 Dataset:', dataset)
console.log('---')
console.log("Token:", process.env.SANITY_API_TOKEN);
const dotenv = require('dotenv')
const result = dotenv.config({ path: '.env.local' })

console.log(result.parsed)

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

async function migrate() {
    console.log('🚀 Starting migration...')

    if (!process.env.SANITY_API_TOKEN) {
        console.error('❌ ERROR: SANITY_API_TOKEN not set!')
        console.log('\n💡 To fix:')
        console.log('   Create .env file with:')
        console.log('   SANITY_API_TOKEN=your_token_here')
        console.log('\n   OR run with:')
        console.log('   PowerShell: $env:SANITY_API_TOKEN="your_token"; node migrate-items.js')
        console.log('   CMD: set SANITY_API_TOKEN=your_token && node migrate-items.js')
        process.exit(1)
    }

    console.log('✅ Token found!')

    try {
        // Test connection
        console.log('🔌 Testing connection...')
        const test = await client.fetch(`count(*[_type == "yarnCategory"])`)
        console.log(`✅ Connected! Found ${test} categories`)
        console.log('---')

        // Get categories with items
        const categories = await client.fetch(`
            *[_type == "yarnCategory" && defined(items)] {
                _id,
                _type,
                title,
                items
            }
        `)

        console.log(`📦 Found ${categories.length} categories with items`)

        let migrated = 0
        let skipped = 0
        let errors = 0

        for (const cat of categories) {
            if (!cat.items || cat.items.length === 0) {
                console.log(`⏭️  Skipping ${cat.title || cat._id} (empty)`)
                skipped++
                continue
            }

            const isString = typeof cat.items[0] === 'string'

            if (isString) {
                console.log(`🔄 Migrating: ${cat.title || cat._id} (${cat.items.length} items)`)

                const newItems = cat.items.map((item) => ({
                    label: item,
                    isNew: false
                }))

                try {
                    await client
                        .patch(cat._id)
                        .set({ items: newItems })
                        .commit()
                    console.log(`   ✅ Updated ${cat.title || cat._id}`)
                    migrated++
                } catch (err) {
                    console.error(`   ❌ Failed:`, err.message)
                    errors++
                }
            } else {
                console.log(`   ✅ ${cat.title || cat._id} already migrated`)
                skipped++
            }
        }

        console.log('\n📊 Summary:')
        console.log(`   ✅ Migrated: ${migrated}`)
        console.log(`   ⏭️  Skipped: ${skipped}`)
        console.log(`   ❌ Errors: ${errors}`)
        console.log(`   📦 Total: ${categories.length}`)

        if (errors === 0) {
            console.log('🎉 Migration complete!')
        } else {
            console.log('⚠️  Migration completed with errors.')
        }

    } catch (error) {
        console.error('❌ Migration failed:', error.message)
        process.exit(1)
    }
}

migrate()