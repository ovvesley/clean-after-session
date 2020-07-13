(async function () {
    "use strict";

    const { history } = chrome;

    const allBrowsingHistory = await getAllBrowsingHistory();
    const countLengthHistory = allBrowsingHistory.length;

    setCountHistoryInView(countLengthHistory);

    handlerListener();


})();


function handlerListener() {
    const btnDeleteAllHistory = document.getElementById("deleteAllHistory");
    btnDeleteAllHistory.addEventListener("click", handleClickBtnDeleteAllHistory);
}


function handleClickBtnDeleteAllHistory() {
    clearAllBrowsingHistory();
}

function setCountHistoryInView(length) {
    const elSpanDocument = document.getElementById("lengthHistory");

    elSpanDocument.textContent = length;
}

function deleteSuccess() {
    console.log("deleteSuccess() - history clean success");
    setCountHistoryInView(0);
}

function clearAllBrowsingHistory(callback) {
    const { history } = chrome;

    history.deleteAll(deleteSuccess)
    return;
}

function getAllBrowsingHistory() {
    const { history } = chrome;

    return new Promise((resolve, reject) => {
        history.search({ text: '' }, function (data) {
            if (data) {
                resolve(data);
            } else {
                reject(null)
            }
        });
    })
}