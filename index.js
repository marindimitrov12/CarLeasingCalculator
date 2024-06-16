
const CAR_VALUE_MIN = 10000;
const CAR_VALUE_MAX = 200000;
const DOWN_PAYMENT_MIN = 10;
const DOWN_PAYMENT_MAX = 50;


function updateDownPaymentValue(value) {
    if (!validateDownPayment(value)) return;

    const downPaymentValue = document.getElementById('downPaymentValue');
    const carValueElement = document.getElementById('carValue');
    const downPaymentAmountElement = document.getElementById('downPaymentAmount');

    downPaymentValue.textContent = value + '%';

    const carValue = parseFloat(carValueElement.value);
    const downPaymentAmount = (carValue * value / 100).toFixed(2);
    downPaymentAmountElement.textContent = downPaymentAmount;

    updateLeasingDetails();
}


function updateCarValue(value) {
    if (!validateCarValue(value)) return;

    const carValueElement = document.getElementById('carValue');
    carValueElement.value = value;
    updateLeasingDetails();
}


function validateCarValue(value) {
    const carValue = parseFloat(value);
    if (isNaN(carValue) || carValue < CAR_VALUE_MIN || carValue > CAR_VALUE_MAX) {
        alert(`Car value must be between €${CAR_VALUE_MIN} and €${CAR_VALUE_MAX}.`);
        return false;
    }
    return true;
}


function validateDownPayment(value) {
    const downPayment = parseFloat(value);
    if (isNaN(downPayment) || downPayment < DOWN_PAYMENT_MIN || downPayment > DOWN_PAYMENT_MAX) {
        alert(`Down payment percentage must be between ${DOWN_PAYMENT_MIN}% and ${DOWN_PAYMENT_MAX}%.`);
        return false;
    }
    return true;
}


function updateLeasingDetails() {
    const carValueElement = document.getElementById('carValue');
    const downPaymentElement = document.getElementById('downPayment');
    const leasePeriodElement = document.getElementById('leasePeriod');
    const carTypeElement = document.getElementById('carType');
    const downPaymentAmountElement = document.getElementById('downPaymentAmount');

    const carValue = parseFloat(carValueElement.value);
    const downPaymentPercentage = parseFloat(downPaymentElement.value);
    const leasePeriod = parseInt(leasePeriodElement.value);
    const carType = carTypeElement.value;

    const annualInterestRate = carType === 'Used' ? 3.7 : 2.99; 
    const monthlyInterestRate = (annualInterestRate / 12) / 100; 

    const downPaymentAmount = (carValue * downPaymentPercentage / 100).toFixed(2);
    const loanAmount = carValue - downPaymentAmount;

    const monthlyInstallment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));
    const totalLeasingCost = (monthlyInstallment * leasePeriod + parseFloat(downPaymentAmount)).toFixed(2);

    document.querySelector('.details-left p:nth-child(1)').textContent = `Total Leasing Cost: €${totalLeasingCost}`;
    downPaymentAmountElement.textContent = downPaymentAmount;
    document.querySelector('.details-right p:nth-child(1)').textContent = `Monthly Installment: €${monthlyInstallment.toFixed(2)}`;
    document.querySelector('.details-right p:nth-child(2)').textContent = `Interest Rate: ${annualInterestRate}%`;
}


document.addEventListener('DOMContentLoaded', () => {
    const downPaymentSlider = document.getElementById('downPaymentSlider');
    const carValueSlider = document.getElementById('carValueSlider');
    const leasePeriodElement = document.getElementById('leasePeriod');
    const carTypeElement = document.getElementById('carType');
    const carValueElement = document.getElementById('carValue');
    const downPaymentElement = document.getElementById('downPayment');

    downPaymentSlider.addEventListener('input', () => {
        downPaymentElement.value = downPaymentSlider.value;
        updateDownPaymentValue(downPaymentSlider.value);
    });

    carValueSlider.addEventListener('input', () => {
        updateCarValue(carValueSlider.value);
    });

    leasePeriodElement.addEventListener('change', updateLeasingDetails);
    carTypeElement.addEventListener('change', updateLeasingDetails);
    carValueElement.addEventListener('input', () => {
        if (validateCarValue(carValueElement.value)) {
            carValueSlider.value = carValueElement.value;
            updateLeasingDetails();
        }
    });
    downPaymentElement.addEventListener('input', () => {
        if (validateDownPayment(downPaymentElement.value)) {
            downPaymentSlider.value = downPaymentElement.value;
            updateDownPaymentValue(downPaymentElement.value);
        }
    });

    
    updateLeasingDetails();
});
