import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isInstagramBrowser,
  isAndroidDevice,
  isIOSDevice,
  getAndroidIntentUrl,
} from './iab.ts';

test('isInstagramBrowser detects Instagram and Meta User-Agents', () => {
  const instaIos = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 289.0.0.25.49';
  const instaAndroid = 'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Instagram 280.0.0.17.111';
  const fbApp = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) Mobile/14A456 FBAN/FBIOS;FBAV/330.0.0.32.115';
  const safari = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1';
  const chromeDesktop = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';

  assert.equal(isInstagramBrowser(instaIos), true);
  assert.equal(isInstagramBrowser(instaAndroid), true);
  assert.equal(isInstagramBrowser(fbApp), true);
  assert.equal(isInstagramBrowser(safari), false);
  assert.equal(isInstagramBrowser(chromeDesktop), false);
  assert.equal(isInstagramBrowser(''), false);
});

test('isAndroidDevice and isIOSDevice distinguish platforms correctly', () => {
  const androidUa = 'Mozilla/5.0 (Linux; Android 13; Pixel 7)';
  const iosUa = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)';
  const macUa = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';

  assert.equal(isAndroidDevice(androidUa), true);
  assert.equal(isAndroidDevice(iosUa), false);
  assert.equal(isIOSDevice(iosUa), true);
  assert.equal(isIOSDevice(androidUa), false);
  assert.equal(isIOSDevice(macUa), false);
});

test('getAndroidIntentUrl constructs valid Android Intent URI', () => {
  const url1 = 'https://anthemsofheart.com/essay/1';
  const intent1 = getAndroidIntentUrl(url1);
  assert.equal(
    intent1,
    'intent://anthemsofheart.com/essay/1#Intent;scheme=https;action=android.intent.action.VIEW;end;'
  );

  const url2 = 'http://localhost:3000';
  const intent2 = getAndroidIntentUrl(url2);
  assert.equal(
    intent2,
    'intent://localhost:3000#Intent;scheme=https;action=android.intent.action.VIEW;end;'
  );
});
