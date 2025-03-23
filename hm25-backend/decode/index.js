const base32 = require('hi-base32');

function decodeQubicIdentity(identityBase32) {
  // Normalize input
  let padded = identityBase32.trim().toUpperCase();

  // Add padding (=) if not multiple of 8
  const mod = padded.length % 8;
  if (mod !== 0) {
    padded += '='.repeat(8 - mod);
  }

  // Decode to raw bytes
  const decoded = base32.decode.asBytes(padded);

  if (decoded.length < 32) {
    throw new Error(`Decoded identity is too short: ${decoded.length} bytes`);
  } else if (decoded.length > 32) {
    // Sometimes extra padding or incorrect decoding adds nulls
    return Buffer.from(decoded.slice(0, 32)).toString('hex');
  }

  return Buffer.from(decoded).toString('hex');
}

// Example usage
const landlordId = 'UXUFAQMCXZPZBCZVXVDCVLBPSZWAMLZHMAVYMYZBWGZJJKIQPDYBFUFAEPHM';
const tenantId = 'XBTVPZIOAAWIIFKINJEENAKQQSFDADLKMAEYKZMLLGUVQJDAKPYMWSTBVQQE';

console.log('Landlord HEX:', decodeQubicIdentity(landlordId));
console.log('Tenant HEX:', decodeQubicIdentity(tenantId));
