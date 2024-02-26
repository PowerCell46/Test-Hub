function hideShowNavigation(e) {
    const navigation = document.querySelector("#navigation-section");
    
    if (navigation.style.display === 'none') {
        e.target.style.transform = 'rotate(90deg)';
        navigation.style.display = 'block';

    } else {
        e.target.style.transform = 'rotate(0deg)';
        navigation.style.display = 'none';
    }
}
