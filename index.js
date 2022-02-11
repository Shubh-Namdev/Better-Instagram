const imgBlock = document.querySelectorAll('.image-container');
imgBlock.forEach(block => {
    block.addEventListener('dragstart', () => {
        block.classList.add('currently-dragging');
    })

    block.addEventListener('dragend', (e) => {
        const finalElem = droppingToWhichElement(e.clientX, e.clientY)
        const startElem = document.querySelector('.currently-dragging');
        if (typeof finalElem !== 'undefined' && finalElem !== null) {
            swapElement(startElem, finalElem)
        }
        block.classList.remove('currently-dragging');
        console.log(e.clientX + '----' + e.clientY);

    })
})

function swapElement(node1, node2) {
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    if (node1 === afterNode2) {
        parent.insertBefore(node1,node2)
    } else {
        node1.replaceWith(node2)
        parent.insertBefore(node1, afterNode2)
    }
}

function droppingToWhichElement(inX, inY) {
    const allOtherElem = document.querySelectorAll('.image-container:not(.currently-dragging)');
    console.log(inX + '---' + inY);
    console.log(allOtherElem.length);
    var found = null;
    allOtherElem.forEach(droppingTo => {
        const boundary = droppingTo.getBoundingClientRect();
        const x = boundary.x;
        const y = boundary.y;
        const width = boundary.width;

        if (inX > x && inX < x + width) {
            found = droppingTo;
        }
    })
    return found;
}