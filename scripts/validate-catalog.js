#!/usr/bin/env node

/**
 * Validate Glowheal catalog files
 * Ensures: positive prices, unique codes, mapped specialties, valid city slugs
 */

const fs = require('fs');
const path = require('path');

const CATALOG_DIR = path.join(__dirname, '../apps/web/src/data/catalog');
const VALID_CITIES = ['pune', 'mumbai', 'bengaluru'];
const VALID_UNITS = ['session', 'visit', 'plan', 'package'];

// Known specialty slugs used in Services and Doctors pages
const KNOWN_SPECIALTIES = [
  'dermatology',
  'hair-care',
  'weight-management',
  'mental-health',
  'nutrition-dietetics',
  'womens-health',
  'mens-health',
  'sleep-stress',
  'gut-health',
  'metabolic-health',
  'preventive-labs',
  'iv-therapy',
  'orthopedics',
  'cardiology',
  'gynecology',
  'pediatrics'
];

let errors = [];
let warnings = [];
let allCodes = new Set(); // Track codes across all cities for global uniqueness

function validateCatalog(filePath, citySlug) {
  console.log(`\n✓ Validating ${citySlug} catalog...`);
  
  const catalog = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Check city slug
  if (catalog.citySlug !== citySlug) {
    errors.push(`City slug mismatch: expected ${citySlug}, got ${catalog.citySlug}`);
  }
  
  // Check teleconsult
  if (catalog.teleconsult.first_consult !== 0) {
    errors.push('First consultation must be free (0)');
  }
  
  // Track codes for uniqueness within city
  const codes = new Set();
  
  // Check for placeholder/incomplete catalog
  let hasPlaceholders = false;
  
  // Validate specialties
  for (const specialty of catalog.specialties) {
    if (!specialty.slug || !specialty.title) {
      errors.push(`[${citySlug}] Specialty missing slug or title: ${JSON.stringify(specialty)}`);
      continue;
    }
    
    // Check if specialty slug is known (used in Services/Doctors)
    if (!KNOWN_SPECIALTIES.includes(specialty.slug)) {
      warnings.push(`[${citySlug}] Specialty "${specialty.slug}" not in KNOWN_SPECIALTIES list. May need mapping in Services/Doctors pages.`);
    }
    
    console.log(`  ✓ ${specialty.title} (${specialty.items.length} items)`);
    
    // Validate items
    for (const item of specialty.items) {
      // Check required fields
      if (!item.code || !item.name || item.price === undefined) {
        errors.push(`[${citySlug}] Item missing required fields: ${JSON.stringify(item)}`);
        continue;
      }
      
      // Check for TODO markers (placeholder catalog)
      if (item.code.startsWith('TODO_') || 
          item.name.includes('[TODO') || 
          item.name.includes('TODO:')) {
        hasPlaceholders = true;
        warnings.push(`[${citySlug}] Placeholder detected: ${item.code}`);
      }
      
      // Check code uniqueness within city
      if (codes.has(item.code)) {
        errors.push(`[${citySlug}] Duplicate code within city: ${item.code}`);
      }
      codes.add(item.code);
      
      // Check global code uniqueness across all cities
      if (allCodes.has(item.code)) {
        errors.push(`[${citySlug}] Code collision across cities: ${item.code} (already used in another city)`);
      }
      allCodes.add(item.code);
      
      // Check price validity
      if (!Number.isInteger(item.price)) {
        errors.push(`[${citySlug}] ${item.code} has non-integer price: ${item.price}`);
      }
      if (item.price < 0) {
        errors.push(`[${citySlug}] ${item.code} has negative price: ${item.price}`);
      }
      if (item.price === 0 && !hasPlaceholders) {
        warnings.push(`[${citySlug}] ${item.code} has zero price (may be intentional for free items)`);
      }
      
      // Check valid unit
      if (!VALID_UNITS.includes(item.unit)) {
        errors.push(`[${citySlug}] ${item.code} has invalid unit: ${item.unit} (must be one of: ${VALID_UNITS.join(', ')})`);
      }
      
      // Check includes/excludes arrays
      if (!Array.isArray(item.includes)) {
        errors.push(`[${citySlug}] ${item.code} missing includes array`);
      } else if (item.includes.length === 0) {
        warnings.push(`[${citySlug}] ${item.code} has empty includes array`);
      } else {
        // Check for TODO markers in includes
        for (const include of item.includes) {
          if (include.includes('[TODO') || include.includes('TODO:')) {
            hasPlaceholders = true;
          }
        }
      }
      
      if (!Array.isArray(item.excludes)) {
        errors.push(`[${citySlug}] ${item.code} missing excludes array`);
      } else if (item.excludes.length === 0) {
        // Empty excludes is acceptable (some items may exclude nothing)
        console.log(`    ℹ️  ${item.code} has no exclusions (intentional)`);
      } else {
        // Check for TODO markers in excludes
        for (const exclude of item.excludes) {
          if (exclude.includes('[TODO') || exclude.includes('TODO:')) {
            hasPlaceholders = true;
          }
        }
      }
    }
  }
  
  // Check disclaimers for TODO markers
  if (Array.isArray(catalog.disclaimers)) {
    for (const disclaimer of catalog.disclaimers) {
      if (disclaimer.includes('[TODO') || disclaimer.includes('TODO:')) {
        hasPlaceholders = true;
        warnings.push(`[${citySlug}] Disclaimer contains TODO marker`);
      }
    }
  }
  
  // Warn if catalog appears to be a placeholder
  if (hasPlaceholders) {
    warnings.push(`[${citySlug}] ⚠️  Catalog contains placeholders - NOT READY FOR PRODUCTION`);
  }
  
  // Check disclaimers
  if (!Array.isArray(catalog.disclaimers) || catalog.disclaimers.length === 0) {
    warnings.push('No disclaimers found');
  }
  
  console.log(`  ✓ ${codes.size} unique items validated`);
}

function validateAddons(filePath, citySlug) {
  console.log(`\n✓ Validating ${citySlug} add-ons...`);
  
  const addons = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!Array.isArray(addons)) {
    errors.push('Add-ons must be an array');
    return;
  }
  
  const codes = new Set();
  
  for (const addon of addons) {
    if (!addon.code || !addon.name || addon.price === undefined) {
      errors.push(`Add-on missing required fields: ${JSON.stringify(addon)}`);
      continue;
    }
    
    if (codes.has(addon.code)) {
      errors.push(`Duplicate add-on code: ${addon.code}`);
    }
    codes.add(addon.code);
    
    if (addon.price < 0) {
      errors.push(`Negative price for add-on ${addon.code}: ${addon.price}`);
    }
  }
  
  console.log(`  ✓ ${codes.size} unique add-ons validated`);
}

// Main validation
console.log('🔍 Glowheal Catalog Validation');
console.log('================================');

for (const city of VALID_CITIES) {
  const catalogPath = path.join(CATALOG_DIR, `${city}.json`);
  const addonsPath = path.join(CATALOG_DIR, `addons.${city}.json`);
  
  if (!fs.existsSync(catalogPath)) {
    errors.push(`Missing catalog file for ${city}: ${catalogPath}`);
    continue;
  }
  
  try {
    validateCatalog(catalogPath, city);
  } catch (err) {
    errors.push(`Error validating ${city} catalog: ${err.message}`);
  }
  
  if (fs.existsSync(addonsPath)) {
    try {
      validateAddons(addonsPath, city);
    } catch (err) {
      errors.push(`Error validating ${city} add-ons: ${err.message}`);
    }
  } else {
    warnings.push(`No add-ons file for ${city}`);
  }
}

// Report results
console.log('\n================================');
console.log('📊 Validation Results');
console.log('================================');

if (warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.log('\n❌ Errors:');
  errors.forEach(e => console.log(`  - ${e}`));
  console.log(`\n❌ Validation failed with ${errors.length} error(s)`);
  process.exit(1);
} else {
  console.log('\n✅ All catalogs valid!');
  console.log(`   ${VALID_CITIES.length} cities validated`);
  process.exit(0);
}
