chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "removeStrage",
    title: "strageなしをコピー",
    contexts: ["image"] // 画像を右クリックしたときに表示
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "removeStrage" && info.srcUrl) {
    const modifiedUrl = info.srcUrl.replace("/strage", "");

    // コンテンツスクリプトでクリップボードにコピー
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        navigator.clipboard.writeText(url)
          .then(() => console.log("クリップボードにコピーしました:", url))
          .catch((err) => console.error("クリップボードエラー:", err));
      },
      args: [modifiedUrl]
    });
  }
});
