/* global chrome */

export const saveInputs = async (items) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ items }, () => {
      resolve();
    });
  });
};

export const loadInputs = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["items"], (result) => {
      resolve(result.items || []);
    });
  });
};
