console.log('This is background page!');

chrome.browserAction.onClicked.addListener((tab) => {
  console.log(tab);
  console.log('123');
  chrome.tabs.create({ url: 'https://yuque.com' });
});

export default null;
