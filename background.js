chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "removeStrage",
    title: "strageなしをコピー",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "removeStrage" && info.srcUrl) {
    // 画像URLから `/strage` を削除
    const modifiedUrl = info.srcUrl.replace("/strage", "");

    // クリップボードにコピー
    navigator.clipboard.writeText(modifiedUrl).then(() => {
      console.log("strageなしのURLをコピーしました:", modifiedUrl);
    }).catch(err => {
      console.error("コピーに失敗しました:", err);
    });
  }
});
