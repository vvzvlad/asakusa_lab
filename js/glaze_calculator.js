/**
 * Функция для расчета массы порошка и воды по системе уравнений
 * @param {number} volume - Объем глазури в мл
 * @param {number} target_density - Целевая плотность глазури
 * @param {number} powder_density - Истинная плотность сухого порошка
 * @returns {Object} - Объект с массой порошка, массой воды и влажностью
 */
function calculate_powder_and_water(volume, target_density, powder_density) {
  // Вес итоговой глазури
  const total_weight = volume * target_density;
  
  // Решение системы уравнений:
  // mp + mw = total_weight
  // mp/powder_density + mw/1 = volume
  
  // Выражаем mw из первого уравнения: mw = total_weight - mp
  // Подставляем во второе: mp/powder_density + (total_weight - mp)/1 = volume
  // Упрощаем: mp/powder_density + total_weight - mp = volume
  // Преобразуем: mp/powder_density - mp = volume - total_weight
  // Выносим mp за скобки: mp * (1/powder_density - 1) = volume - total_weight
  // Находим mp: mp = (volume - total_weight) / (1/powder_density - 1)
  
  const powder_mass = (volume - total_weight) / (1/powder_density - 1);
  const water_mass = total_weight - powder_mass;
  
  // Расчет влажности как отношение массы воды к массе порошка в процентах
  const moisture = Math.round((water_mass / powder_mass) * 100);
  
  return {
    powder_mass: Math.round(powder_mass * 10) / 10,
    water_mass: Math.round(water_mass * 10) / 10,
    moisture: moisture
  };
} 

function check_zero_volumes(data) {
  for (const key in data) {
      const cell = data[key];
      if (cell.content) {
          for (const component_key in cell.content) {
              const component = cell.content[component_key];
              if (component[0] > 0 && component[1] === 0) return true;
          }
      }
  }
  return false;
}

//---------------- square ----------------

function generate_square_data(size, tester_volume, rounding_precision = 0.5) {
  const data = {};
  // Цвета для четырех компонентов
  const a_color = '#FFF200';
  const b_color = '#ED1C24';
  const c_color = '#645FAA';
  const d_color = '#00A651';
  
  // Создаем таблицу пропорций в зависимости от размера
  const ratios = generate_square_ratios(size);
  
  let point_index = 1;
  
  // Вычисляем множитель для округления на основе точности
  const rounding_factor = 1 / rounding_precision;
  
  for (let i = 0; i < ratios.length; i++) {
    const a_ratio = ratios[i][0]; // Процент первого цвета
    const b_ratio = ratios[i][1]; // Процент второго цвета
    const c_ratio = ratios[i][2]; // Процент третьего цвета
    const d_ratio = ratios[i][3]; // Процент четвертого цвета
    
    // Объем компонентов в зависимости от процентов с настраиваемым округлением
    const a_volume = a_ratio > 0 ? Math.round(tester_volume * a_ratio / 100 * rounding_factor) / rounding_factor : null;
    const b_volume = b_ratio > 0 ? Math.round(tester_volume * b_ratio / 100 * rounding_factor) / rounding_factor : null;
    const c_volume = c_ratio > 0 ? Math.round(tester_volume * c_ratio / 100 * rounding_factor) / rounding_factor : null;
    const d_volume = d_ratio > 0 ? Math.round(tester_volume * d_ratio / 100 * rounding_factor) / rounding_factor : null;
    
    // Определяем цвета компонентов
    const first_color = a_ratio > 0 ? a_color : null;
    const second_color = b_ratio > 0 ? b_color : null;
    const third_color = c_ratio > 0 ? c_color : null;
    const fourth_color = d_ratio > 0 ? d_color : null;

    // Определяем имя точки
    let name = `${point_index}`;

    data[point_index] = {
      name: name,
      content: {
        1: [a_ratio > 0 ? a_ratio : null, a_volume, first_color],
        2: [b_ratio > 0 ? b_ratio : null, b_volume, second_color],
        3: [c_ratio > 0 ? c_ratio : null, c_volume, third_color],
        4: [d_ratio > 0 ? d_ratio : null, d_volume, fourth_color]
      }
    };
    
    point_index++;
  }
  
  return data;
}

function generate_square_ratios(size) {
  const ratio_tables = {
    3: [  [100, 0, 0, 0], [50, 50,  0,  0], [0, 100, 0, 0],
          [50, 0, 50, 0], [25, 25, 25, 25], [0, 50, 0, 50],
          [0, 0, 100, 0], [ 0,  0, 50, 50], [0, 0, 0, 100]  ],

    4: [  [100, 0, 0, 0], [67, 33, 0, 0], [33, 67, 0, 0], [0, 100, 0, 0],
          [67, 0, 33, 0], [45, 22, 22, 11], [22, 45, 11, 22], [0, 67, 0, 33],
          [33, 0, 67, 0], [22, 11, 45, 22], [11, 22, 22, 45], [0, 33, 0, 67],
          [0, 0, 100, 0], [0, 0, 67, 33], [0, 0, 33, 67], [0, 0, 0, 100] ],

    5: [  [100, 0, 0, 0], [75, 25, 0, 0], [50, 50, 0, 0], [25, 75, 0, 0], [0, 100, 0, 0],
          [75, 0, 25, 0], [56, 19, 19, 6], [38, 38, 12, 12], [19, 56, 6, 19], [0, 75, 0, 25],
          [50, 0, 50, 0], [38, 12, 38, 12], [25, 25, 25, 25], [12, 38, 12, 38], [0, 50, 0, 50],
          [25, 0, 75, 0], [19, 6, 56, 19], [12, 12, 38, 38], [6, 19, 19, 56], [0, 25, 0, 75],
          [0, 0, 100, 0], [0, 0, 75, 25], [0, 0, 50, 50], [0, 0, 25, 75], [0, 0, 0, 100] ],

    6: [  [100, 0, 0, 0], [80, 20, 0, 0], [60, 40, 0, 0], [40, 60, 0, 0], [20, 80, 0, 0], [0, 100, 0, 0],
          [80, 0, 20, 0], [64, 16, 16, 4], [48, 32, 12, 8], [32, 48, 8, 12], [16, 64, 4, 16], [0, 80, 0, 20],
          [60, 0, 40, 0], [48, 12, 32, 8], [36, 24, 24, 16], [24, 36, 16, 24], [12, 48, 8, 32], [0, 60, 0, 40],
          [40, 0, 60, 0], [32, 8, 48, 12], [24, 16, 36, 24], [16, 24, 24, 36], [8, 32, 12, 48], [0, 40, 0, 60],
          [20, 0, 80, 0], [16, 4, 64, 16], [12, 8, 48, 32], [8, 12, 32, 48], [4, 16, 16, 64], [0, 20, 0, 80],
          [0, 0, 100, 0], [0, 0, 80, 20], [0, 0, 60, 40], [0, 0, 40, 60], [0, 0, 20, 80], [0, 0, 0, 100] ],
          
    7: [  [100, 0, 0, 0], [83, 17, 0, 0], [67, 33, 0, 0], [50, 50, 0, 0], [33, 67, 0, 0], [17, 83, 0, 0], [0, 100, 0, 0],
          [83, 0, 17, 0], [69, 14, 14, 3], [55, 28, 11, 6], [42, 42, 8, 8], [28, 55, 6, 11], [14, 69, 3, 14], [0, 83, 0, 17],
          [67, 0, 33, 0], [55, 11, 28, 6], [44, 22, 22, 12], [33, 33, 17, 17], [22, 44, 12, 22], [11, 55, 6, 28], [0, 67, 0, 33],
          [50, 0, 50, 0], [42, 8, 42, 8], [33, 17, 33, 17], [25, 25, 25, 25], [17, 33, 17, 33], [8, 42, 8, 42], [0, 50, 0, 50],
          [33, 0, 67, 0], [28, 6, 55, 11], [22, 12, 44, 22], [17, 17, 33, 33], [12, 22, 22, 44], [6, 28, 11, 55], [0, 33, 0, 67],
          [17, 0, 83, 0], [14, 3, 69, 14], [11, 6, 55, 28], [8, 8, 42, 42], [6, 11, 28, 55], [3, 14, 14, 69], [0, 17, 0, 83],
          [0, 0, 100, 0], [0, 0, 83, 17], [0, 0, 67, 33], [0, 0, 50, 50], [0, 0, 33, 67], [0, 0, 17, 83], [0, 0, 0, 100] ],
          
    8: [  [100, 0, 0, 0], [86, 14, 0, 0], [71, 29, 0, 0], [57, 43, 0, 0], [43, 57, 0, 0], [29, 71, 0, 0], [14, 86, 0, 0], [0, 100, 0, 0],
          [86, 0, 14, 0], [74, 12, 12, 2], [62, 24, 10, 4], [50, 36, 8, 6], [38, 48, 6, 8], [26, 60, 4, 10], [12, 74, 2, 12], [0, 86, 0, 14],
          [71, 0, 29, 0], [62, 10, 24, 4], [52, 20, 20, 8], [42, 30, 16, 12], [32, 40, 12, 16], [22, 50, 8, 20], [10, 62, 4, 24], [0, 71, 0, 29],
          [57, 0, 43, 0], [50, 8, 36, 6], [42, 16, 30, 12], [34, 24, 24, 18], [26, 32, 18, 24], [18, 40, 12, 30], [8, 50, 6, 36], [0, 57, 0, 43],
          [43, 0, 57, 0], [38, 6, 48, 8], [32, 12, 40, 16], [26, 18, 32, 24], [20, 24, 24, 32], [14, 30, 16, 40], [6, 38, 8, 48], [0, 43, 0, 57],
          [29, 0, 71, 0], [26, 4, 60, 10], [22, 8, 50, 20], [18, 12, 40, 30], [14, 16, 30, 40], [10, 20, 20, 50], [4, 26, 10, 60], [0, 29, 0, 71],
          [14, 0, 86, 0], [12, 2, 74, 12], [10, 4, 62, 24], [8, 6, 50, 36], [6, 8, 38, 48], [4, 10, 26, 60], [2, 12, 12, 74], [0, 14, 0, 86],
          [0, 0, 100, 0], [0, 0, 86, 14], [0, 0, 71, 29], [0, 0, 57, 43], [0, 0, 43, 57], [0, 0, 29, 71], [0, 0, 14, 86], [0, 0, 0, 100] ]
  };
  
  // Возвращаем таблицу пропорций для заданного размера
  return ratio_tables[size] || ratio_tables[3]; // Если размер не найден, используем размер 3
}

function generate_square_summary(data, size, density, dry_density, rounding_precision = 0.5) {
  let total_a_volume = 0;
  let total_b_volume = 0;
  let total_c_volume = 0;
  let total_d_volume = 0;
  
  // Рассчитываем суммы объемов для каждого состава
  for (const point_idx in data) {
    if (data[point_idx].content[1][1]) total_a_volume += data[point_idx].content[1][1];
    if (data[point_idx].content[2][1]) total_b_volume += data[point_idx].content[2][1];
    if (data[point_idx].content[3][1]) total_c_volume += data[point_idx].content[3][1];
    if (data[point_idx].content[4][1]) total_d_volume += data[point_idx].content[4][1];
  }
  
  // Вычисляем множитель для округления на основе точности
  const rounding_factor = 1 / rounding_precision;
  
  // Округляем с учетом настраиваемой точности
  total_a_volume = Math.round(total_a_volume * rounding_factor) / rounding_factor;
  total_b_volume = Math.round(total_b_volume * rounding_factor) / rounding_factor;
  total_c_volume = Math.round(total_c_volume * rounding_factor) / rounding_factor;
  total_d_volume = Math.round(total_d_volume * rounding_factor) / rounding_factor;
  
  // Общий объем всех тестеров
  const total_volume = total_a_volume + total_b_volume + total_c_volume + total_d_volume;
  
  // Рассчитываем компоненты для каждого состава
  const a_components = calculate_powder_and_water(total_a_volume, density, dry_density);
  //const b_components = calculate_powder_and_water(total_b_volume, density, dry_density);
  //const c_components = calculate_powder_and_water(total_c_volume, density, dry_density);
  //const d_components = calculate_powder_and_water(total_d_volume, density, dry_density);
  
  // Рассчитываем компоненты для общей базы
  const total_components = calculate_powder_and_water(total_volume, density, dry_density);

  const total_testers = size * size;
  let total_testers_text = 'тестеров';
  if (total_testers == 9) total_testers_text = 'тестеров';
  if (total_testers == 16) total_testers_text = 'тестеров';
  if (total_testers == 25) total_testers_text = 'тестеров';
  if (total_testers == 36) total_testers_text = 'тестеров';
  if (total_testers == 49) total_testers_text = 'тестеров';
  if (total_testers == 64) total_testers_text = 'тестера';
  // Создаем HTML для блока с суммами
  const summary_html = `
    <div class="card border-0">
      <div class="card-body p-0">
        <h5 class="card-title mb-3">Итого ${total_testers} ${total_testers_text}:</h5>
        <div class="mb-3">
          <p class="mb-2"><span class="fw-medium">Составы A, B, C, D по отдельности:</span> ${total_a_volume}мл (${a_components.powder_mass}г сухой массы + ${a_components.water_mass}г воды) <span class="text-secondary">(влажность ${a_components.moisture}%)</span></p>
          <p class="pt-2 border-top">Если база общая: ${total_volume}мл (${total_components.powder_mass}г сухой массы + ${total_components.water_mass}г воды)</p>
        </div>
      </div>
    </div>
  `;
  
  return summary_html;
}

//---------------- Triangle ----------------

function generate_triangle_data(size, tester_volume, rounding_precision = 0.5) {
  const data = {};
  // Цвета для трех компонентов
  const a_color = '#FFF200';
  const b_color = '#ED1C24';
  const c_color = '#645FAA';
  
  // Создаем таблицу пропорций в зависимости от размера
  const ratios = generate_triangle_ratios(size);
  
  let point_index = 1;
  
  // Вычисляем множитель для округления на основе точности
  const rounding_factor = 1 / rounding_precision;
  
  for (let i = 0; i < ratios.length; i++) {
    const a_ratio = ratios[i][0];  // Процент первого цвета
    const b_ratio = ratios[i][1]; // Процент второго цвета
    const c_ratio = ratios[i][2]; // Процент третьего цвета
    
    // Объем компонентов в зависимости от процентов с настраиваемым округлением
    const a_volume = a_ratio > 0 ? Math.round(tester_volume * a_ratio / 100 * rounding_factor) / rounding_factor : null;
    const b_volume = b_ratio > 0 ? Math.round(tester_volume * b_ratio / 100 * rounding_factor) / rounding_factor : null;
    const c_volume = c_ratio > 0 ? Math.round(tester_volume * c_ratio / 100 * rounding_factor) / rounding_factor : null;
    
    // Определяем цвета компонентов
    const first_color = a_ratio > 0 ? a_color : null;
    const second_color = b_ratio > 0 ? b_color : null;
    const third_color = c_ratio > 0 ? c_color : null;

    // Определяем имя точки
    let name;
    //if (a_ratio === 100) name = 'A';
    //else if (b_ratio === 100) name = 'B';
    //else if (c_ratio === 100) name = 'C';
    //else name = `${point_index}`;

    name = `${point_index}`;

    data[point_index] = {
      name: name,
      content: {
        1: [a_ratio > 0 ? a_ratio : null, a_volume, first_color],
        2: [b_ratio > 0 ? b_ratio : null, b_volume, second_color],
        3: [c_ratio > 0 ? c_ratio : null, c_volume, third_color]
      }
    };
    
    point_index++;
  }
  
  return data;
}

function generate_triangle_ratios(size) {
  const ratio_tables = {
    3: [
      [100, 0, 0],
      [50, 50, 0], [50, 0, 50],
      [0, 100, 0], [0, 50, 50], [0, 0, 100]
    ],
    4: [
      [100, 0, 0],
      [67, 33, 0], [67, 0, 33],
      [33, 67, 0], [33, 33, 33], [33, 0, 67],
      [0, 100, 0], [0, 67, 33], [0, 33, 67], [0, 0, 100]
    ],
    5: [
      [100, 0, 0],
      [75, 25, 0], [75, 0, 25],
      [50, 50, 0], [50, 25, 25], [50, 0, 50],
      [25, 75, 0], [25, 50, 25], [25, 25, 50], [25, 0, 75],
      [0, 100, 0], [0, 75, 25], [0, 50, 50], [0, 25, 75], [0, 0, 100]
    ],
    6: [
      [100, 0, 0],
      [80, 20, 0], [80, 0, 20],
      [60, 40, 0], [60, 20, 20], [60, 0, 40],
      [40, 60, 0], [40, 40, 20], [40, 20, 40], [40, 0, 60],
      [20, 80, 0], [20, 60, 20], [20, 40, 40], [20, 20, 60], [20, 0, 80],
      [0, 100, 0], [0, 80, 20], [0, 60, 40], [0, 40, 60], [0, 20, 80], [0, 0, 100]
    ],
    7: [
      [100, 0, 0],
      [83, 17, 0], [83, 0, 17],
      [67, 33, 0], [67, 17, 17], [67, 0, 33],
      [50, 50, 0], [50, 33, 17], [50, 17, 33], [50, 0, 50],
      [33, 67, 0], [33, 50, 17], [33, 33, 33], [33, 17, 50], [33, 0, 67],
      [17, 83, 0], [17, 67, 17], [17, 50, 33], [17, 33, 50], [17, 17, 67], [17, 0, 83],
      [0, 100, 0], [0, 83, 17], [0, 67, 33], [0, 50, 50], [0, 33, 67], [0, 17, 83], [0, 0, 100]
    ],
    8: [
      [100, 0, 0],
      [86, 14, 0], [86, 0, 14],
      [71, 29, 0], [71, 14, 14], [71, 0, 29],
      [57, 43, 0], [57, 29, 14], [57, 14, 29], [57, 0, 43],
      [43, 57, 0], [43, 43, 14], [43, 29, 29], [43, 14, 43], [43, 0, 57],
      [29, 71, 0], [29, 57, 14], [29, 43, 29], [29, 29, 43], [29, 14, 57], [29, 0, 71],
      [14, 86, 0], [14, 71, 14], [14, 57, 29], [14, 43, 43], [14, 29, 57], [14, 14, 71], [14, 0, 86],
      [0, 100, 0], [0, 86, 14], [0, 71, 29], [0, 57, 43], [0, 43, 57], [0, 29, 71], [0, 14, 86], [0, 0, 100]
    ],
    9: [
      [100, 0, 0],
      [88, 12, 0], [88, 0, 12],
      [75, 25, 0], [75, 12, 12], [75, 0, 25],
      [62, 38, 0], [62, 25, 12], [62, 12, 25], [62, 0, 38],
      [50, 50, 0], [50, 38, 12], [50, 25, 25], [50, 12, 38], [50, 0, 50],
      [38, 62, 0], [38, 50, 12], [38, 38, 25], [38, 25, 38], [38, 12, 50], [38, 0, 62],
      [25, 75, 0], [25, 62, 12], [25, 50, 25], [25, 38, 38], [25, 25, 50], [25, 12, 62], [25, 0, 75],
      [12, 88, 0], [12, 75, 12], [12, 62, 25], [12, 50, 38], [12, 38, 50], [12, 25, 62], [12, 12, 75], [12, 0, 88],
      [0, 100, 0], [0, 88, 12], [0, 75, 25], [0, 62, 38], [0, 50, 50], [0, 38, 62], [0, 25, 75], [0, 12, 88], [0, 0, 100]
    ]
  };
  
  // Возвращаем таблицу пропорций для заданного размера
  return ratio_tables[size] || ratio_tables[3]; // Если размер не найден, используем размер 3
}

function generate_triangle_summary(data, size, density, dry_density, rounding_precision = 0.5) {
  let total_a_volume = 0;
  let total_b_volume = 0;
  let total_c_volume = 0;
  
  // Рассчитываем суммы объемов для каждого состава
  for (const point_idx in data) {
    if (data[point_idx].content[1][1]) total_a_volume += data[point_idx].content[1][1];
    if (data[point_idx].content[2][1]) total_b_volume += data[point_idx].content[2][1];
    if (data[point_idx].content[3][1]) total_c_volume += data[point_idx].content[3][1];
  }
  
  // Вычисляем множитель для округления на основе точности
  const rounding_factor = 1 / rounding_precision;
  
  // Округляем с учетом настраиваемой точности
  total_a_volume = Math.round(total_a_volume * rounding_factor) / rounding_factor;
  total_b_volume = Math.round(total_b_volume * rounding_factor) / rounding_factor;
  total_c_volume = Math.round(total_c_volume * rounding_factor) / rounding_factor;
  
  // Общий объем всех тестеров
  const total_volume = total_a_volume + total_b_volume + total_c_volume;
  
  // Рассчитываем компоненты для каждого состава
  const a_components = calculate_powder_and_water(total_a_volume, density, dry_density);
  //const b_components = calculate_powder_and_water(total_b_volume, density, dry_density);
  //const c_components = calculate_powder_and_water(total_c_volume, density, dry_density);
  
  // Рассчитываем компоненты для общей базы
  const total_components = calculate_powder_and_water(total_volume, density, dry_density);

  const total_testers = size * (size + 1) / 2;
  let total_testers_text = '';
  if (total_testers == 6) total_testers_text = 'тестеров';
  if (total_testers == 10) total_testers_text = 'тестеров';
  if (total_testers == 15) total_testers_text = 'тестеров';
  if (total_testers == 21) total_testers_text = 'тестер';
  if (total_testers == 28) total_testers_text = 'тестеров';
  if (total_testers == 36) total_testers_text = 'тестеров';
  if (total_testers == 45) total_testers_text = 'тестеров';
  
  // Создаем HTML для блока с суммами
  const summary_html = `
    <div class="card border-0">
      <div class="card-body p-0">
        <h5 class="card-title mb-3">Итого ${total_testers} ${total_testers_text}:</h5>
        <div class="mb-3">
          <p class="mb-2"><span class="fw-medium">Составы A, B, C по отдельности:</span> ${total_a_volume}мл (${a_components.powder_mass}г сухой массы + ${a_components.water_mass}г воды) <span class="text-secondary">(влажность ${a_components.moisture}%)</span></p>
          <p class="pt-2 border-top">Если база общая: ${total_volume}мл (${total_components.powder_mass}г сухой массы + ${total_components.water_mass}г воды)</p>
        </div>
      </div>
    </div>
  `;
  
  return summary_html;
}

//---------------- Linear ----------------

// Data generation functions
function generate_line_data(size, tester_volume, rounding_precision = 0.5) {
  const data = {};
  // Начальный и конечный цвета линии
  const start_color = '#FFF200';
  const end_color = '#ED1C24';
  
  // Создаем таблицу пропорций в зависимости от размера
  const ratios = generate_line_ratios(size);
  
  // Вычисляем множитель для округления на основе точности
  const rounding_factor = 1 / rounding_precision;
  
  for (let i = 1; i <= size; i++) {
    const first_ratio = ratios[i-1][0];  // Процент первого цвета
    const second_ratio = ratios[i-1][1]; // Процент второго цвета
    
    // Объем компонентов в зависимости от процентов с настраиваемым округлением
    const first_volume = first_ratio > 0 ? Math.round(tester_volume * first_ratio / 100 * rounding_factor) / rounding_factor : null;
    const second_volume = second_ratio > 0 ? Math.round(tester_volume * second_ratio / 100 * rounding_factor) / rounding_factor : null;
    
    // Цвет зависит от соотношения компонентов
    // Если один из компонентов 0%, используем цвет другого компонента
    // Иначе линейно смешиваем цвета
    const first_color = first_ratio > 0 ? start_color : null;
    const second_color = second_ratio > 0 ? end_color : null;


    data[i] = {
      name: i === 1 ? 'A' : (i === size ? 'B' : `A${i-1}`),
      content: {
        1: [first_ratio > 0 ? first_ratio : null, first_volume, first_color],
        2: [second_ratio > 0 ? second_ratio : null, second_volume, second_color]
      }
    };
  }
  
  
  return data;
}



function generate_line_ratios(size) {
  // Таблица процентов для разных размеров линии
  const ratio_tables = {
    3: [[100, 0], [50, 50], [0, 100]],
    4: [[100, 0], [67, 33], [33, 67], [0, 100]],
    5: [[100, 0], [75, 25], [50, 50], [25, 75], [0, 100]],
    6: [[100, 0], [80, 20], [60, 40], [40, 60], [20, 80], [0, 100]],
    7: [[100, 0], [83, 17], [67, 33], [50, 50], [33, 67], [17, 83], [0, 100]],
    8: [[100, 0], [86, 14], [71, 29], [57, 43], [43, 57], [29, 71], [14, 86], [0, 100]],
    9: [[100, 0], [87.5, 12.5], [75, 25], [62.5, 37.5], [50, 50], [37.5, 62.5], [25, 75], [12.5, 87.5], [0, 100]],
    10: [[100, 0], [89, 11], [78, 22], [67, 33], [56, 44], [44, 56], [33, 67], [22, 78], [11, 89], [0, 100]],
    11: [[100, 0], [90, 10], [80, 20], [70, 30], [60, 40], [50, 50], [40, 60], [30, 70], [20, 80], [10, 90], [0, 100]]
  };
  
  // Возвращаем таблицу пропорций для заданного размера
  return ratio_tables[size] || ratio_tables[3]; // Если размер не найден, используем размер 3
}


function generate_linear_summary(data, size, density, dry_density, rounding_precision = 0.5) {
  let total_first_volume = 0;
  let total_second_volume = 0;
  
  // Рассчитываем суммы объемов для каждого состава
  for (let i = 1; i <= size; i++) {
    if (data[i].content[1][1]) total_first_volume += data[i].content[1][1];
    if (data[i].content[2][1]) total_second_volume += data[i].content[2][1];
  }
  
  // Вычисляем множитель для округления на основе точности
  const rounding_factor = 1 / rounding_precision;
  
  // Округляем с учетом настраиваемой точности
  total_first_volume = Math.round(total_first_volume * rounding_factor) / rounding_factor;
  total_second_volume = Math.round(total_second_volume * rounding_factor) / rounding_factor;
  
  // Общий объем всех тестеров
  const total_volume = total_first_volume + total_second_volume;
  
  // Рассчитываем компоненты для первого состава
  const first_components = calculate_powder_and_water(total_first_volume, density, dry_density);
  //const second_components = calculate_powder_and_water(total_second_volume, density, dry_density);
  
  // Рассчитываем компоненты для общей базы
  const total_components = calculate_powder_and_water(total_volume, density, dry_density);
  
  // Создаем HTML для блока с суммами
  const summary_html = `
    <div class="card border-0">
      <div class="card-body p-0">
        <h5 class="card-title mb-3">Итого:</h5>
        <div class="mb-3">
          <p class="mb-2"><span class="fw-medium">Составы A, B по отдельности:</span> ${total_first_volume}мл (${first_components.powder_mass}г сухой массы + ${first_components.water_mass}г воды) <span class="text-secondary">(влажность ${first_components.moisture}%)</span></p>
          <p class="pt-2 border-top">Если база общая: ${total_volume}мл (${total_components.powder_mass}г сухой массы + ${total_components.water_mass}г воды)</p>
          </div>
      </div>
    </div>
  `;
  
  return summary_html;
}