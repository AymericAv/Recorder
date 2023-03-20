import { setEndRecordingStorage, localStorageGet } from './utils';
import { genCode } from '../builders';

import { ScriptType } from '../types';

export async function endRecording() {
  const { recording, returnTabId } = await localStorageGet([
    'recording',
    'returnTabId',
  ]);

  // For Playwright
  const code = genCode(recording, true, ScriptType.Playwright);

  setEndRecordingStorage();
  console.log({ code });

  // We need to send the generated recording back to the webapp
  if (returnTabId != null) {
    chrome.runtime.sendMessage({
      type: 'forward-recording',
      tabId: returnTabId,
      code,
      actions: recording,
    });
  }
}
