// Калькулятор рабочего рецепта глиняного шликера
// Логика портирована с https://ceramicmachines.tilda.ws/slip_casting_calculator

// density display value -> internal coefficient (dry solid fraction)
const DENSITY_COEFF = {
    '1.65': 0.6401, '1.66': 0.6460, '1.67': 0.6519, '1.68': 0.6577,
    '1.69': 0.6634, '1.70': 0.6691, '1.71': 0.6746, '1.72': 0.6802,
    '1.73': 0.6856, '1.74': 0.6910, '1.75': 0.6964, '1.76': 0.7017,
    '1.77': 0.7068, '1.78': 0.7120, '1.79': 0.7171, '1.80': 0.7222,
    '1.81': 0.7271, '1.82': 0.7321, '1.83': 0.7369, '1.84': 0.7418,
    '1.85': 0.7465,
};

function getDensityCoeff(sliderValue) {
    const key = parseFloat(sliderValue).toFixed(2);
    return DENSITY_COEFF[key] || 0.6964;
}

function formatWater(grams) {
    if (!isFinite(grams) || isNaN(grams) || grams < 0) return '0 мл';
    const ml = grams; // water density ≈ 1 g/ml
    if (ml < 1000) {
        return `${Math.round(ml)} мл`;
    } else {
        return `${(ml / 1000).toFixed(1)} л`;
    }
}

function formatGrams(value) {
    if (!isFinite(value) || isNaN(value) || value < 0) return '0 г';
    return `${Math.round(value * 100) / 100} г`;
}

function calculate() {
    // material: 0 = dry mass, 0.2 = plastic mass
    const materialChecked = document.querySelector('input[name="material"]:checked');
    const material = materialChecked ? parseFloat(materialChecked.value) : 0;

    // weight in kg → convert to grams
    const weightKg = parseFloat(document.getElementById('weight').value) || 0;
    const weight = weightKg * 1000;

    const densitySlider = document.getElementById('density');
    const density = getDensityCoeff(densitySlider.value);

    const glass = parseFloat(document.getElementById('glass').value);
    const soda = parseFloat(document.getElementById('soda').value);

    // Формулы из Tilda Zero Block
    // water = (weight / density) * (1 - density - material)
    const water = (weight / density) * (1 - density - material);

    // liquid_glass = (1 - material) * weight * glass / 100
    const liquidGlass = (1 - material) * weight * glass / 100;

    // soda_ash = (1 - material) * weight * soda / 100
    const sodaAsh = (1 - material) * weight * soda / 100;

    document.getElementById('result-water').textContent = `Объём воды: ${formatWater(water)}`;
    document.getElementById('result-glass').textContent = `Необходимое количество жидкого стекла: ${formatGrams(liquidGlass)}`;
    document.getElementById('result-soda').textContent = `Необходимое количество кальцинированной соды: ${formatGrams(sodaAsh)}`;
}

function initSlider(sliderId, displayId, decimals) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    display.textContent = parseFloat(slider.value).toFixed(decimals);
    slider.addEventListener('input', () => {
        display.textContent = parseFloat(slider.value).toFixed(decimals);
        calculate();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSlider('glass', 'glass-display', 2);
    initSlider('soda', 'soda-display', 2);
    initSlider('density', 'density-display', 2);

    document.querySelectorAll('input[name="material"]').forEach(el => {
        el.addEventListener('change', calculate);
    });

    document.getElementById('weight').addEventListener('input', calculate);

    calculate();
});
