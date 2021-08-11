chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(
    {
      id: "send selected text to analyze",
      title: "Analyze %s",
      contexts: ["selection"],
    }
  );
});


chrome.contextMenus.onClicked.addListener(function (info, tab) {
  analyzeSelectedText(info.selectionText);
});

function analyzeSelectedText(selectedText) {
  var serviceCall = 'https://writing-extension.herokuapp.com/';
  chrome.tabs.create({ url: serviceCall }, function (tab) {
  //   // tab.id == tabs[0].id
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, { message: true },
  //       function (response) {
  //         if (response && response.response) { 
  //           chrome.tabs.sendMessage(tabs[0].id, { selectedText: selectedText });
  //         } else 
  //         {
            chrome.tabs.executeScript(tabs[0].id, { file: "content.js" },
              function () {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                  throw Error("Error" + tabs[0].id);
                }
                chrome.tabs.sendMessage(tabs[0].id, { selectedText: selectedText },
                );
              });
          }
//         }
//       );
//     }
    );
  })
}







