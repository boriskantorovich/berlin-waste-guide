// Make functions globally accessible
let currentStep = 1;  // Start from 1 instead of 0
let totalSteps = 0;

// Initialize flowchart steps
function initializeFlowchart() {
    const flowchart = document.getElementById('flowchart');
    flowchart.innerHTML = ''; // Clear existing content
    
    // Create step elements
    for (let i = 1; i <= totalSteps; i++) {
        const stepDiv = document.createElement('div');
        stepDiv.id = `step${i}`;
        stepDiv.className = 'step';
        
        const question = document.createElement('p');
        question.textContent = `Step ${i} Question`; // Replace with actual questions
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Да';
        yesButton.onclick = () => handleResponse('yes', i);
        
        const noButton = document.createElement('button');
        noButton.textContent = 'Нет';
        noButton.onclick = () => handleResponse('no', i);
        
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        
        stepDiv.appendChild(question);
        stepDiv.appendChild(buttonContainer);
        flowchart.appendChild(stepDiv);
    }
    
    // Show first step
    document.getElementById('step1').classList.add('active');
}

// Function to handle user response
function handleResponse(response, step) {
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    if (response === 'yes') {
        // Show result for "Yes" response
        showResult(step, 'yes');
    } else if (currentStep === totalSteps - 1) {
        // Show message to start over or look for complicated cases
        const resultContainer = document.getElementById('result');
        const resultText = document.getElementById('result-text');
        resultText.textContent = "Это конец. Начните заново или посмотрите сложные случаи ниже.";
        resultContainer.style.display = 'block';
    } else {
        // Move to next step for "No" response
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add('active');
    }
}

// Function to show result
function showResult(step, response) {
    const resultContainer = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    const resultDetails = document.getElementById('result-details');
    
    // Set result text based on response
    if (response === 'yes') {
        resultText.textContent = step.yesResult;
        // Add details if available
        resultDetails.innerHTML = '';
        if (step.whereTo) {
            const whereToElement = document.createElement('p');
            whereToElement.innerHTML = `<strong>Куда сдавать:</strong> ${step.whereTo}`;
            resultDetails.appendChild(whereToElement);
        }
        if (step.preparation) {
            const preparationElement = document.createElement('p');
            preparationElement.innerHTML = `<strong>Подготовка:</strong> ${step.preparation}`;
            resultDetails.appendChild(preparationElement);
        }
        
        // Add "Start Over" button
        const startOverButton = document.createElement('button');
        startOverButton.className = 'reset-btn';
        startOverButton.textContent = 'Начать заново';
        startOverButton.addEventListener('click', resetFlowchart);
        resultDetails.appendChild(startOverButton);
    }
    
    // Show result container
    resultContainer.style.display = 'block';
}

// Function to reset flowchart
function resetFlowchart() {
    // Reset current step
    currentStep = 1;
    
    // Hide all steps and remove active class
    const steps = document.querySelectorAll('.flowchart-step');
    steps.forEach(step => step.classList.remove('active'));
    
    // Show first step
    const firstStep = document.getElementById('step1');
    if (firstStep) {
        firstStep.classList.add('active');
    }
    
    // Hide result container
    const resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    totalSteps = 5; // Set your total number of steps
    initializeFlowchart();
    
    // Add event listener to reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFlowchart);
    }
}); 
