/**
 * Hayabusa Lite product boundary. Keep these compile-time constants explicit so
 * upstream merges cannot silently re-expose financial features excluded by
 * ADR-0004.
 */
export const productFeatures = {
  buyBitcoin: false,
  crossChain: false,
  stableBalance: false,
} as const;
