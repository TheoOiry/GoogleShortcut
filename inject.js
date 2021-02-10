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

let searches = Array.prototype.filter.call(document.getElementsByClassName("g"), (el) => {
    return el.parentElement.classList.contains("hlcw0c")
});

let highlightedIndex = -1

document.onkeydown = function (ke) {
    if (ke.key === "Enter" && highlightedIndex !== -1) {
        let href = searches[highlightedIndex].querySelector("a").getAttribute("href")
        if (ke.ctrlKey)
            window.open(href, "_blank")
        else
            window.location.href = href
    } else {
        let lastIndex = highlightedIndex
        if(ke.altKey && ke.key === "ArrowUp")
            highlightedIndex = Math.max(highlightedIndex - 1, 0)
        else if (ke.altKey && ke.key === "ArrowDown")
            highlightedIndex = Math.min(highlightedIndex + 1, searches.length - 1)

        if(lastIndex !== highlightedIndex && highlightedIndex !== -1)
        {
            if(lastIndex !== -1)
                searches[lastIndex].classList.remove("highlight")

            searches[highlightedIndex].classList.add("highlight")
            searches[highlightedIndex].focus()
            searches[highlightedIndex].scrollIntoViewIfNeeded()
        }
    }

}