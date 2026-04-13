// Калькулятор рабочего рецепта глиняного шликера
// Логика портирована с https://ceramicmachines.tilda.ws/slip_casting_calculator

// density lookup: display value -> internal coefficient (dry solid fraction)
const DENSITY_OPTIONS = [
    { label: '1.65', value: 0.6401 },
    { label: '1.66', value: 0.6460 },
    { label: '1.67', value: 0.6519 },
    { label: '1.68', value: 0.6577 },
    { label: '1.69', value: 0.6634 },
    { label: '1.70', value: 0.6691 },
    { label: '1.71', value: 0.6746 },
    { label: '1.72', value: 0.6802 },
    { label: '1.73', value: 0.6856 },
    { label: '1.74', value: 0.6910 },
    { label: '1.75', value: 0.6964 },
    { label: '1.76', value: 0.7017 },
    { label: '1.77', value: 0.7068 },
    { label: '1.78', value: 0.7120 },
    { label: '1.79', value: 0.7171 },
    { label: '1.80', value: 0.7222 },
    { label: '1.81', value: 0.7271 },
    { label: '1.82', value: 0.7321 },
    { label: '1.83', value: 0.7369 },
    { label: '1.84', value: 0.7418 },
    { label: '1.85', value: 0.7465 },
];

function formatResult(value) {
    if (!isFinite(value) || isNaN(value)) return '?';
    return Math.round(value * 100) / 100;
}

function calculate() {
    // material: 0 = dry mass, 0.2 = plastic mass
    const materialChecked = document.querySelector('input[name="material"]:checked');
    const material = materialChecked ? parseFloat(materialChecked.value) : 0;

    const weight = parseFloat(document.getElementById('weight').value) || 0;

    const densitySelect = document.getElementById('density');
    const density = parseFloat(densitySelect.value);

    const glass = parseFloat(document.getElementById('glass').value);
    const soda = parseFloat(document.getElementById('soda').value);

    // Формулы из Tilda Zero Block
    // water = (weight / density) * (1 - density - material)
    const water = (weight / density) * (1 - density - material);

    // liquid_glass = (1 - material) * weight * glass / 100
    const liquidGlass = (1 - material) * weight * glass / 100;

    // soda_ash = (1 - material) * weight * soda / 100
    const sodaAsh = (1 - material) * weight * soda / 100;

    // Update water result
    const waterResult = document.getElementById('result-water');
    waterResult.textContent = `Вам нужно ${formatResult(water)} грамм воды`;

    // Update liquid glass result
    const glassResult = document.getElementById('result-glass');
    glassResult.textContent = `Вам нужно ${formatResult(liquidGlass)} граммов жидкого стекла`;

    // Update soda ash result
    const sodaResult = document.getElementById('result-soda');
    sodaResult.textContent = `Вам нужно ${formatResult(sodaAsh)} граммов кальцинированной соды`;
}

function initSlider(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    display.textContent = slider.value;
    slider.addEventListener('input', () => {
        display.textContent = slider.value;
        calculate();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Init sliders
    initSlider('glass', 'glass-display');
    initSlider('soda', 'soda-display');

    // Material radio buttons
    document.querySelectorAll('input[name="material"]').forEach(el => {
        el.addEventListener('change', calculate);
    });

    // Weight input
    document.getElementById('weight').addEventListener('input', calculate);

    // Density select
    document.getElementById('density').addEventListener('change', calculate);

    // Initial calculation
    calculate();
});
