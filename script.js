// Make functions globally accessible
let currentStep = 0;
let totalSteps = 0;

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
    }
    
    // Show result container
    resultContainer.style.display = 'block';
}

// Function to reset flowchart
function resetFlowchart() {
    // Hide all steps
    for (let i = 0; i < totalSteps; i++) {
        document.getElementById(`step${i}`).classList.remove('active');
    }
    
    // Hide result
    document.getElementById('result').style.display = 'none';
    
    // Reset current step
    currentStep = 0;
    document.getElementById(`step${currentStep}`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    currentStep = 0;
    totalSteps = flowchartData.steps.length;
    
    // Set title and instructions
    document.getElementById('flowchart-title').textContent = flowchartData.title;
    document.getElementById('flowchart-instructions').textContent = flowchartData.instructions;
    
    // Populate difficult items table
    const difficultItemsTable = document.getElementById('difficult-items-table').getElementsByTagName('tbody')[0];
    flowchartData.difficultItems.forEach(item => {
        const row = difficultItemsTable.insertRow();
        row.insertCell(0).textContent = item.item;
        row.insertCell(1).textContent = item.verdict;
    });
    
    // Populate Pfand table
    const pfandTable = document.getElementById('pfand-table').getElementsByTagName('tbody')[0];
    flowchartData.pfandInfo.forEach(item => {
        const row = pfandTable.insertRow();
        row.insertCell(0).textContent = item.container;
        row.insertCell(1).textContent = item.deposit;
        row.insertCell(2).textContent = item.where;
    });
    
    // Populate useful tools list
    const toolsList = document.getElementById('tools-list');
    flowchartData.usefulTools.forEach(tool => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${tool.name}</strong> — ${tool.description}`;
        toolsList.appendChild(li);
    });
    
    // Create flowchart steps
    const flowchartContainer = document.getElementById('flowchart');
    flowchartData.steps.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'flowchart-step';
        stepElement.id = `step${step.id}`;
        
        // Create question
        const questionElement = document.createElement('p');
        questionElement.className = 'question';
        questionElement.textContent = step.question;
        stepElement.appendChild(questionElement);
        
        // Add details if available
        if (step.details) {
            const detailsElement = document.createElement('ul');
            detailsElement.className = 'details';
            step.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                detailsElement.appendChild(li);
            });
            stepElement.appendChild(detailsElement);
        }
        
        // Create buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const yesButton = document.createElement('button');
        yesButton.className = 'yes-btn';
        yesButton.textContent = 'Да';
        yesButton.addEventListener('click', () => handleResponse('yes', step));
        
        const noButton = document.createElement('button');
        noButton.className = 'no-btn';
        noButton.textContent = 'Нет';
        noButton.addEventListener('click', () => handleResponse('no', step));
        
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        stepElement.appendChild(buttonContainer);
        
        flowchartContainer.appendChild(stepElement);
    });
    
    // Add event listener to reset button
    document.getElementById('reset-btn').addEventListener('click', resetFlowchart);
    
    // Show first step
    document.getElementById(`step${currentStep}`).classList.add('active');
});

function resetFlowchart() {
    currentStep = 1;
    
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.getElementById(`step${i}`);
        stepElement.classList.remove('active');
    }
    
    // Show first step
    document.getElementById('step1').classList.add('active');
    
    // Hide result
    document.getElementById('result').style.display = 'none';
} 
