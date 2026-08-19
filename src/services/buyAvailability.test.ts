import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Capacitor } from '@capacitor/core';
import {
  filterProvidersByPlatform,
  isBuyBitcoinAvailable,
  buyCopy,
  ALL_BUY_PROVIDERS,
} from './settings';

const onPlatform = (p: string) => vi.spyOn(Capacitor, 'getPlatform').mockReturnValue(p);

describe('buy availability by platform', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('leaves web and android untouched, installed or not', () => {
    for (const platform of ['web', 'android']) {
      onPlatform(platform);
      expect(filterProvidersByPlatform(ALL_BUY_PROVIDERS, false)).toEqual(ALL_BUY_PROVIDERS);
      expect(isBuyBitcoinAvailable(false)).toBe(true);
      expect(buyCopy('Buy')).toBe('Buy');
    }
  });

  it('drops MoonPay on iOS and keeps Cash App', () => {
    onPlatform('ios');
    expect(filterProvidersByPlatform(ALL_BUY_PROVIDERS, true)).toEqual(['cashApp']);
    expect(isBuyBitcoinAvailable(true)).toBe(true);
    expect(buyCopy('Buy')).toBe('Add funds from Cash App');
  });

  it('offers nothing on iOS without Cash App installed', () => {
    onPlatform('ios');
    expect(filterProvidersByPlatform(ALL_BUY_PROVIDERS, false)).toEqual([]);
    expect(isBuyBitcoinAvailable(false)).toBe(false);
  });
});
