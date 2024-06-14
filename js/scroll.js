const animationItemList = document.querySelectorAll("[data-scroll]");
if (animationItemList.length > 0) {
    scrollAnimation(animationItemList);
    window.addEventListener("scroll", (e) => {
        scrollAnimation(animationItemList);
    });
}
function scrollAnimation(animationItemList) {
    Array.from(animationItemList).forEach((animationItem) => {
        const animationItemHeight = animationItem.offsetHeight;
        const animationItemOffset = animationItem.getBoundingClientRect().top + scrollY;
        const animationStart = 4;

        let animationPoint = window.innerHeight - animationItemHeight / animationStart;
        if (animationItemHeight > window.innerHeight) {
            animationPoint = window.innerHeight - window.innerHeight / animationStart;
        }

        if (scrollY > (animationItemOffset - animationPoint) &&
            scrollY < (animationItemOffset + animationItemHeight)) {
            animationItem.classList.add("scroll");
        } else {
            if (animationItem.dataset.scroll === "true") {
                console.log(2);
                animationItem.classList.remove("scroll");
            }
        }
    })
}