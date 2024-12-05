chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "removeStrage",
    title: "strageなしをコピー",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "removeStrage" && info.srcUrl && tab.id) {
    const modifiedUrl = info.srcUrl.replace("/strage", "");

    // コンテンツスクリプトを実行してクリップボードにコピー
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: copyToClipboard,
      args: [modifiedUrl] // 引数としてURLを渡す
    });
  }
});

// クリップボードにコピーする関数（content script用）
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("URLをクリップボードにコピーしました:", text);
  }).catch(err => {
    console.error("クリップボードコピーエラー:", err);
  });
}
