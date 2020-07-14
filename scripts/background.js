var windowCount = 0;
chrome.windows.getAll({}, function (windows) {
    windowCount = windows.length;
    chrome.windows.onCreated.addListener(function () {
        ++windowCount;
        checkWindowCount();
    });
    chrome.windows.onRemoved.addListener(function (windowsId) {
        if (--windowCount === 0) {
            clearAllBrowsingHistory();
        }
    });
    checkWindowCount();
});

function checkWindowCount() {
    if (windowCount === 1) {
        clearAllBrowsingHistory()
    }
}
function deleteSuccess() {
    console.log("deleteSuccess() - history clean success");
}

function clearAllBrowsingHistory() {
    const { history } = chrome;

    history.deleteAll(deleteSuccess)
    return;
}
