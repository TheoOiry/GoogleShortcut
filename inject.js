(function() {
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background: #d3d3d342;
            border-radius: 10px;
            box-shadow: 0 1px 3px rgb(0 0 0 / 50%);
            padding-left: 10px;
            padding-right: 10px;
        }
    `;
    document.head.append(style);
})()

//Filter on searches for escape google widgets, Vidéo page is not concerns so we accept all searches if it's Vidéo page
let research = Array.prototype.filter.call(
    document.getElementsByClassName("g"),
    (el) => el.parentElement.classList.contains("hlcw0c") || window.location.href.includes("&tbm=vid"));

let highlightedIndex = -1

document.onkeydown = function (ke) {
    if (ke.key === "Enter" && highlightedIndex !== -1) {
        openHighlighted(ke.ctrlKey)
    } else if(ke.altKey) {
        if(ke.key === "ArrowUp")
            changeHighlight(false)
        else if (ke.key === "ArrowDown")
            changeHighlight(true)
        //The navigation bar is different for the "image" page tab order is not the same

        // else if (ke.key === "ArrowRight")
        //     changeSearchMode(true)
        // else if (ke.key === "ArrowLeft")
        //     changeSearchMode(false)
    }
}

function changeSearchMode(isToNext){
    let navigationTabs = [...document.querySelectorAll("div.hdtb-mitem")]

    let newTabIndex = navigationTabs.findIndex(tab => tab.classList.contains("hdtb-msel")) + (isToNext ? 1 : -1)

    if(newTabIndex >= 0 && newTabIndex < navigationTabs.length)
        window.location.href = navigationTabs[newTabIndex].querySelector("a").getAttribute("href")
}

function openHighlighted(isNewTab){
    let href = research[highlightedIndex].querySelector("a").getAttribute("href")
    if (isNewTab)
        window.open(href, "_blank")
    else
        window.location.href = href
}

function changeHighlight(isDown) {
    if (research.length === 0)
        return

    let lastIndex = highlightedIndex
    if(isDown)
        highlightedIndex = Math.min(highlightedIndex + 1, research.length - 1)
    else
        highlightedIndex = Math.max(highlightedIndex - 1, 0)

    if(lastIndex !== -1)
        research[lastIndex].classList.remove("highlight")

    research[highlightedIndex].classList.add("highlight")
    research[highlightedIndex].scrollIntoViewIfNeeded()
}