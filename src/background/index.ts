chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'https://yuque.com' });
});

chrome.runtime.onMessage.addListener((message) => {
  switch (message.action) {
    case 'openOptionsPage':
      chrome.runtime.openOptionsPage();
      break;
    default:
      break;
  }
});
