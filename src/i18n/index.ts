export type Locale = 'ja' | 'en';

const messages = {
  ja: {
    getStarted: 'はじめる',
    createPasskey: 'パスキーを作成',
    useExistingPasskey: '既存のパスキーを使う',
    useRecoveryPhrase: 'リカバリーフレーズを使う',
    restoreFromBackup: 'バックアップから復元',
    usePasskey: 'パスキーを使う',
    send: '送る',
    receive: '受け取る',
    scanQr: 'QRコードを読み取る',
    syncing: '同期中',
    balance: '残高',
    sendBitcoin: 'Bitcoinを送る',
    paste: '貼り付け',
    scan: 'スキャン',
    contacts: '連絡先',
    continue: '続ける',
    processing: '処理中…',
    paymentInputPlaceholder: '請求書、Bitcoin／Sparkアドレス、Lightning Address',
  },
  en: {
    getStarted: 'Get Started',
    createPasskey: 'Create Passkey',
    useExistingPasskey: 'Use Existing Passkey',
    useRecoveryPhrase: 'Use Recovery Phrase Instead',
    restoreFromBackup: 'Restore from Backup',
    usePasskey: 'Use Passkey Instead',
    send: 'Send',
    receive: 'Receive',
    scanQr: 'Scan QR Code',
    syncing: 'Syncing',
    balance: 'Balance',
    sendBitcoin: 'Send Bitcoin',
    paste: 'Paste',
    scan: 'Scan',
    contacts: 'Contacts',
    continue: 'Continue',
    processing: 'Processing...',
    paymentInputPlaceholder: 'Invoice, Bitcoin/Spark address, or Lightning Address',
  },
} as const;

export type MessageKey = keyof typeof messages.en;

function selectedLocale(): Locale {
  if (typeof localStorage === 'undefined') return 'ja';
  return localStorage.getItem('hayabusa_locale') === 'en' ? 'en' : 'ja';
}

/** Japanese is the product default. Missing Japanese copy falls back to English. */
export function t(key: MessageKey): string {
  const locale = selectedLocale();
  return messages[locale][key] ?? messages.en[key];
}
