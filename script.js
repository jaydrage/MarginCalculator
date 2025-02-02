let currentMode = 'calculate-margin';

document.querySelectorAll('.mode-btn').forEach(button => {
    button.addEventListener('click', function() {
        const mode = this.dataset.mode;
        switchMode(mode);
    });
});

function switchMode(mode) {
    currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Show/hide relevant input fields
    if (mode === 'calculate-margin') {
        document.getElementById('selling-price-group').classList.remove('hidden');
        document.getElementById('target-margin-group').classList.add('hidden');
        document.getElementById('calculated-price-item').classList.add('hidden');
    } else {
        document.getElementById('selling-price-group').classList.add('hidden');
        document.getElementById('target-margin-group').classList.remove('hidden');
        document.getElementById('calculated-price-item').classList.remove('hidden');
    }
}

function calculate() {
    const cost = parseFloat(document.getElementById('cost').value) || 0;
    
    if (currentMode === 'calculate-margin') {
        const sellingPrice = parseFloat(document.getElementById('selling-price').value) || 0;
        
        if (cost <= 0 || sellingPrice <= 0) {
            alert('Please enter valid numbers greater than 0');
            return;
        }

        const marginAmount = sellingPrice - cost;
        const marginPercentage = (marginAmount / sellingPrice) * 100;

        document.getElementById('margin-amount').textContent = `$${marginAmount.toFixed(2)}`;
        document.getElementById('margin-percentage').textContent = `${marginPercentage.toFixed(2)}%`;
    } else {
        const targetMargin = parseFloat(document.getElementById('target-margin').value) || 0;
        
        if (cost <= 0 || targetMargin <= 0 || targetMargin >= 100) {
            alert('Please enter valid numbers (cost > 0 and 0 < margin < 100)');
            return;
        }

        const sellingPrice = cost / (1 - (targetMargin / 100));
        const marginAmount = sellingPrice - cost;

        document.getElementById('margin-amount').textContent = `$${marginAmount.toFixed(2)}`;
        document.getElementById('margin-percentage').textContent = `${targetMargin.toFixed(2)}%`;
        document.getElementById('calculated-price').textContent = `$${sellingPrice.toFixed(2)}`;
    }
} 