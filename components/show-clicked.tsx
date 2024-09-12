const showClicked = (ele: HTMLElement) => {
    try {
        ele.style.opacity = '0.3';
        setTimeout(() => ele.style.opacity = '1', 200);
    } catch (err) {
        console.log('error handling click', err);
    }
}

export default showClicked;