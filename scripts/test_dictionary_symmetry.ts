import { dictionary } from '../lib/dictionary';

function testDictionarySymmetry() {
  console.log('=== VERIFYING DICTIONARY SYMMETRY (ID <-> EN) ===\n');

  function checkKeys(objId: Record<string, any>, objEn: Record<string, any>, path = '') {
    let mismatches = 0;
    for (const key of Object.keys(objId)) {
      const currentPath = path ? `${path}.${key}` : key;
      if (!(key in objEn)) {
        console.error(`✗ Missing key in EN: ${currentPath}`);
        mismatches++;
      } else if (typeof objId[key] === 'object' && !Array.isArray(objId[key])) {
        mismatches += checkKeys(objId[key], objEn[key], currentPath);
      }
    }
    for (const key of Object.keys(objEn)) {
      const currentPath = path ? `${path}.${key}` : key;
      if (!(key in objId)) {
        console.error(`✗ Missing key in ID: ${currentPath}`);
        mismatches++;
      }
    }
    return mismatches;
  }

  const errors = checkKeys(dictionary.id as any, dictionary.en as any);
  if (errors === 0) {
    console.log('✓ [PASS] All dictionary keys between ID and EN are 100% symmetrical and present.');
  } else {
    console.error(`✗ [FAIL] Found ${errors} key mismatches between ID and EN.`);
    process.exit(1);
  }
}

testDictionarySymmetry();
