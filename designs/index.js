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
    const currentElement = e.currentTarget.parentElement;
    const hiddenTopics = currentElement.querySelector(".hidden");

    hiddenTopics.style.transition = 'opacity 0.5s ease';

    if (hiddenTopics.style.display === 'none' || hiddenTopics.style.display === '') {
        currentElement.querySelector(".fa-arrow-down").style.transform = 'rotate(180deg)';
        hiddenTopics.style.display = 'block';

        setTimeout(() => hiddenTopics.style.opacity = 1, 10);

    } else {
        currentElement.querySelector(".fa-arrow-down").style.transform = 'rotate(0deg)';
        hiddenTopics.style.opacity = 0;

        setTimeout(() => hiddenTopics.style.display = 'none', 500);
    }
}


function hideShowTasks(e) {
    const currentElement = e.currentTarget.parentElement;
    const hiddenTopics = currentElement.querySelector(".hidden-tasks");

    hiddenTopics.style.transition = 'opacity 0.5s ease';

    if (hiddenTopics.style.display === 'none' || hiddenTopics.style.display === '') {
        currentElement.querySelector(".fa-arrow-down").style.transform = 'rotate(180deg)';
        hiddenTopics.style.display = 'block';

        setTimeout(() => hiddenTopics.style.opacity = 1, 10);

    } else {
        currentElement.querySelector(".fa-arrow-down").style.transform = 'rotate(0deg)';
        hiddenTopics.style.opacity = 0;

        setTimeout(() => hiddenTopics.style.display = 'none', 500);
    }   
}