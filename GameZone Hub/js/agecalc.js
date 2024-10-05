function calculateAge() {
    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
    
    // Validate date input
    if (isNaN(dob)) {
        document.getElementById('result').innerText = 'Please select a valid date.';
        return;
    }
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    document.getElementById('result').innerText = `Your age is ${age} years.`;
}

// Reset the calculator
function resetCalculator() {
    document.getElementById('dob').value = '';
    document.getElementById('result').innerText = '';
}
