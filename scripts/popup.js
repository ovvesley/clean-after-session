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

    const inputDeleteHistoryCloseSession = document.getElementById("deleteHistoryCloseSession");
    inputDeleteHistoryCloseSession.addEventListener("change", handleInputConfigAutoClean)


}

function handleInputConfigAutoClean(event) {
    console.log(event.target.id, event.target.checked);
}


function handleClickBtnDeleteAllHistory() {
    clearAllBrowsingHistory();
}

function setCountHistoryInView(length) {
    const elSpanDocument = document.getElementById("lengthHistory");

    if (Number(length) === 99) {
        elSpanDocument.textContent = length + "+";

    } else {
        elSpanDocument.textContent = length;

    }
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