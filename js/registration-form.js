// Fix for Issue #4: Age Dropdown Persistence
const ageSelect = document.getElementById('ageSelect');
ageSelect.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Age:", selectedValue);
    // Ensure the value stays visible
    ageSelect.value = selectedValue; 
});

// Fix for Issue #2 & #8: Navigation and Validation Feedback
const nextBtn = document.getElementById('nextStepBtn');

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (validateStep1()) {
        navigateToStep(2);
    } else {
        // Issue #8: Provide visual feedback
        showToast("Please fill in all required fields.", "error");
        highlightErrors();
    }
});

function validateStep1() {
    const bizType = document.querySelector('.card.active'); // Check for selected card
    const email = document.getElementById('emailInput').value;
    return (bizType && email.includes('@')); // Basic validation logic
}
