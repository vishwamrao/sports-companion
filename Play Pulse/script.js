function showToday() {
    alert('Showing today\'s data!');
}

function showWeekly() {
    alert('Showing this week\'s data!');
}

function trackCalories(type) {
    // Scroll to the calorie calculator section when calories eaten is clicked
    if (type === 'eaten') {
        document.getElementById('calorie-calculator').scrollIntoView({ behavior: 'smooth' });
    }
    //alert(`Tracking ${type} calories!`);
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const result = document.getElementById('bmi-result');

    if (!weight || !height) {
        result.textContent = 'Please enter valid weight and height!';
        return;
    }

    const bmi = weight / (height * height);
    result.textContent = `Your BMI is ${bmi.toFixed(2)}`;
}

function calculateCalories() {
    const caloriesEaten = parseFloat(document.getElementById('calories-eaten').value);
    const caloriesCountElement = document.getElementById('calories-count');
    let currentCalories = parseFloat(caloriesCountElement.innerText);

    if (isNaN(caloriesEaten) || caloriesEaten <= 0) {
        alert('Please enter a valid number of calories!');
        return;
    }

    // Update the calories count
    currentCalories = caloriesEaten;
    caloriesCountElement.innerText = `${currentCalories} kcal`;

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}
