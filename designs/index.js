function hideShowNavigation(e) {
    const navigation = document.querySelector("#navigation-section");
    if (navigation.style.display === 'none') {
        e.target.style.transform = 'rotate(90deg)';
        navigation.style.display = 'flex';
        setTimeout(() => navigation.style.opacity = 1, 250);

    } else {
        e.target.style.transform = 'rotate(0deg)';
        navigation.style.opacity = 0;
        setTimeout(() => navigation.style.display = 'none', 500);
    }
}


function hideShowTopics(e) {
    const hiddenTopics = e.target.parentElement.querySelector(".hidden");

    if (hiddenTopics.style.display == 'none') {
        console.log(hiddenTopics);
        e.target.parentElement.querySelector(".fa-arrow-down").style.transform = 'rotate(180deg)';
        hiddenTopics.style.display = 'block';

    } else {
        e.target.parentElement.querySelector(".fa-arrow-down").style.transform = 'rotate(0deg)';
        hiddenTopics.style.display = 'none';
    }
}