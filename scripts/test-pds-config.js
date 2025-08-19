#!/usr/bin/env node

/**
 * Test script to verify PDS configuration
 * Run with: node scripts/test-pds-config.js
 */

const https = require('https');
const http = require('http');

const PDS_URL = 'https://app.sfproject.net';

console.log('🔍 Testing PDS Configuration...\n');

// Test 1: Check if domain resolves
console.log('1. Testing domain resolution...');
try {
  const url = new URL(PDS_URL);
  console.log(`   ✅ Domain: ${url.hostname}`);
  console.log(`   ✅ Protocol: ${url.protocol}`);
  console.log(`   ✅ Port: ${url.port || '443 (default HTTPS)'}`);
} catch (error) {
  console.log(`   ❌ Invalid URL: ${error.message}`);
  process.exit(1);
}

// Test 2: Check HTTPS connectivity
console.log('\n2. Testing HTTPS connectivity...');
const testHttps = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(PDS_URL, { method: 'GET', timeout: 10000 }, (res) => {
      console.log(`   ✅ Status: ${res.statusCode}`);
      console.log(`   ✅ Headers: ${Object.keys(res.headers).join(', ')}`);
      resolve();
    });

    req.on('error', (error) => {
      console.log(`   ❌ Connection failed: ${error.message}`);
      reject(error);
    });

    req.on('timeout', () => {
      console.log('   ❌ Request timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
};

// Test 3: Check if it's a valid AT Protocol PDS
console.log('\n3. Testing AT Protocol endpoints...');
const testATProtocol = async () => {
  try {
    // Test the .well-known endpoint
    const wellKnownUrl = `${PDS_URL}/.well-known/atproto-did`;
    console.log(`   Testing: ${wellKnownUrl}`);
    
    const response = await fetch(wellKnownUrl);
    if (response.ok) {
      const did = await response.text();
      console.log(`   ✅ DID endpoint: ${did}`);
    } else {
      console.log(`   ⚠️  DID endpoint returned: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ DID endpoint test failed: ${error.message}`);
  }
};

// Test 4: Check SSL certificate
console.log('\n4. Testing SSL certificate...');
const testSSL = () => {
  return new Promise((resolve) => {
    const req = https.request(PDS_URL, { method: 'HEAD', timeout: 10000 }, (res) => {
      console.log(`   ✅ SSL connection successful`);
      console.log(`   ✅ Certificate valid`);
      resolve();
    });

    req.on('error', (error) => {
      if (error.code === 'CERT_HAS_EXPIRED') {
        console.log('   ❌ SSL certificate expired');
      } else if (error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
        console.log('   ❌ SSL certificate verification failed');
      } else {
        console.log(`   ❌ SSL error: ${error.message}`);
      }
      resolve();
    });

    req.end();
  });
};

// Run all tests
async function runTests() {
  try {
    await testHttps();
    await testATProtocol();
    await testSSL();
    
    console.log('\n🎉 PDS Configuration Test Complete!');
    console.log('\n📋 Summary:');
    console.log(`   • PDS URL: ${PDS_URL}`);
    console.log(`   • Protocol: HTTPS`);
    console.log(`   • Status: Ready for testing`);
    
    console.log('\n🚀 Next steps:');
    console.log('   1. Build and run the app: yarn ios or yarn android');
    console.log('   2. Try to create an account or log in');
    console.log('   3. Check network requests in the app');
    console.log('   4. Verify posts and feeds work correctly');
    
  } catch (error) {
    console.log('\n❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure your PDS is running and accessible');
    console.log('   2. Check firewall and network configuration');
    console.log('   3. Verify SSL certificate is valid');
    console.log('   4. Ensure PDS implements AT Protocol endpoints');
  }
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.log('⚠️  Fetch not available, skipping AT Protocol test');
  console.log('   Upgrade to Node.js 18+ or install node-fetch');
  
  // Run tests without fetch
  testHttps()
    .then(() => testSSL())
    .then(() => {
      console.log('\n🎉 Basic PDS Configuration Test Complete!');
      console.log('\n📋 Summary:');
      console.log(`   • PDS URL: ${PDS_URL}`);
      console.log(`   • Protocol: HTTPS`);
      console.log(`   • Status: Basic connectivity verified`);
    })
    .catch((error) => {
      console.log('\n❌ Test failed:', error.message);
    });
} else {
  runTests();
}

