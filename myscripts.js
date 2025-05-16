document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementById('mySelect');

    // set language
    const lanChange = () => {
        const selectedValue = element.value;
        if (selectedValue === 'en') {
            enDiv.style.display = "block";
            esDiv.style.display = "none";
        } else if (selectedValue === 'es') {
            enDiv.style.display = "none";
            esDiv.style.display = "block";
        }
        console.log('Selected:', selectedValue);
    }

    const enDiv = document.getElementById('enDiv');
    const esDiv = document.getElementById('esDiv');

    lanChange(); // Call it initially to set the correct language on page load

    // Get selected values
    element.addEventListener('change', function () {
        console.log('Selected:', element.value);
        lanChange();
    });
});