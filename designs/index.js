function hideShowNavigation(e) {
    const navigation = document.querySelector("#navigation-section");

    if (navigation.style.display === 'none') {
        e.target.style.transform = 'rotate(90deg)';
        navigation.style.display = 'flex';
        navigation.parentElement.style.margin = '3vh 0'

    } else {
        e.target.style.transform = 'rotate(0deg)';
        navigation.style.display = 'none';
        navigation.parentElement.style.margin = '0';
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