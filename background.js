chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
        console.table(info);
        return {
            redirectUrl: chrome.extension.getURL('js/Core_Compressed.js')
        }
    }, {
        urls: [
            "http://cm.mresdms.com/cm/properties/*",
        ]
    }, ["blocking"]
);
