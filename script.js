// Make functions globally accessible
let currentStep = 0;  // Start from 0 to match data.js
let totalSteps = 0;

// Initialize flowchart steps
function initializeFlowchart() {
    const flowchart = document.getElementById('flowchart');
    flowchart.innerHTML = ''; // Clear existing content
    
    // Set title and instructions
    document.getElementById('flowchart-title').textContent = flowchartData.title;
    document.getElementById('flowchart-instructions').textContent = flowchartData.instructions;
    
    // Create step elements
    flowchartData.steps.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.id = `step${step.id}`;
        stepDiv.className = 'step';
        stepDiv.style.display = 'none'; // Hide all steps initially
        
        // 1. Заголовок и список деталей
        if (step.details) {
            const detailsTitle = document.createElement('div');
            detailsTitle.innerHTML = 'Это что-то из:';
            stepDiv.appendChild(detailsTitle);

            const detailsList = document.createElement('ul');
            step.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                detailsList.appendChild(li);
            });
            stepDiv.appendChild(detailsList);
        }
        
        // 2. Вопрос
        const question = document.createElement('p');
        question.innerHTML = `<strong>${step.question}</strong>`;
        stepDiv.appendChild(question);
        
        // 3. Кнопки
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Да';
        yesButton.onclick = () => handleResponse('yes', step);
        
        const noButton = document.createElement('button');
        noButton.textContent = 'Нет';
        noButton.onclick = () => handleResponse('no', step);
        
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        
        stepDiv.appendChild(buttonContainer);
        flowchart.appendChild(stepDiv);
    });
    
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
    toolsList.innerHTML = '';
    flowchartData.usefulTools.forEach(tool => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${tool.name}</strong> — ${tool.description}`;
        toolsList.appendChild(li);
    });

    // Embed BSR recyclinghoefe map
    const mapIframeId = 'bsr-map-iframe';
    if (!document.getElementById(mapIframeId)) {
        const mapIframe = document.createElement('iframe');
        mapIframe.id = mapIframeId;
        mapIframe.src = 'https://www.bsr.de/recyclinghoefe-20503.php?currRCLocation=88898f9e-66ba-4c77-9e57-486d186f2d6a&view=map';
        mapIframe.width = '100%';
        mapIframe.height = '500';
        mapIframe.style.border = '1px solid #ccc';
        mapIframe.style.marginTop = '24px';
        toolsList.parentElement.appendChild(mapIframe);
    }
    
    // Show first step
    document.getElementById('step0').style.display = 'block';
}

// Function to handle user response
function handleResponse(response, step) {
    // Hide current step
    document.getElementById(`step${step.id}`).style.display = 'none';
    
    if (response === 'yes') {
        // Show result for "Yes" response
        showResult(step, 'yes');
    } else if (step.id === totalSteps - 1) {
        // Show message to start over or look for complicated cases
        const resultContainer = document.getElementById('result');
        const resultText = document.getElementById('result-text');
        const resultDetails = document.getElementById('result-details');
        resultText.textContent = "Это конец. Начните заново или посмотрите сложные случаи ниже.";
        resultDetails.innerHTML = '';

        // Add "Start Over" button
        const startOverButton = document.createElement('button');
        startOverButton.className = 'reset-btn';
        startOverButton.textContent = 'Начать заново';
        startOverButton.addEventListener('click', resetFlowchart);
        resultDetails.appendChild(startOverButton);

        resultContainer.style.display = 'block';
    } else {
        // Move to next step for "No" response
        const nextStep = document.getElementById(`step${step.id + 1}`);
        if (nextStep) {
            nextStep.style.display = 'block';
        }
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
    // Hide all steps
    flowchartData.steps.forEach(step => {
        const stepElement = document.getElementById(`step${step.id}`);
        stepElement.style.display = 'none';
    });
    
    // Show first step
    document.getElementById('step0').style.display = 'block';
    
    // Hide result
    document.getElementById('result').style.display = 'none';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    totalSteps = flowchartData.steps.length;
    initializeFlowchart();
    
    // Add event listener to reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFlowchart);
    }
}); 
