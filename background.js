chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "modifyImageUrl",
    title: "storageなしコピー",
    contexts: ["image"] // 画像を右クリックしたときに表示
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "modifyImageUrl" && info.srcUrl) {
    // 画像URLを修正
    let modifiedUrl = info.srcUrl
      .replace("/storage", "") // `/storage` を削除
      .replace("/thumb_m", "/img"); // `/thumb_m` を `/img` に置換

    // 修正後のURLをコンソールで確認
    console.log("修正後のURL:", modifiedUrl);

    // コンテンツスクリプトでクリップボードにコピー
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        navigator.clipboard.writeText(url)
          .then(() => console.log("クリップボードにコピーしました:", url))
          .catch((err) => console.error("クリップボードエラー:", err));
      },
      args: [modifiedUrl] // 修正後のURLを渡す
    });
  }
});
