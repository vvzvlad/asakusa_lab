        let current_stretch_type = "linear"; // Default type

        function render_linear_table() {
            const container = document.querySelector('.calc_glaze')
            const initial_size = parseInt(document.getElementById('lineSize').value);
            const initial_volume = parseInt(document.getElementById('testerVolume').value);
            let data = generate_line_data(initial_size, initial_volume, 0.5);
            
            if (check_zero_volumes(data)) data = generate_line_data(initial_size, initial_volume, 0.1);
            if (check_zero_volumes(data)) data = generate_line_data(initial_size, initial_volume, 0.05);
            if (check_zero_volumes(data)) data = generate_line_data(initial_size, initial_volume, 0.01);

            
            container.innerHTML = '';
            generate_line_table(initial_size, data, container);

            const summary_container = document.querySelector('.summary_container');
            const density = parseFloat(document.getElementById('density').value);
            const dry_density = parseFloat(document.getElementById('dryDensity').value);
            summary_container.innerHTML = generate_linear_summary(data, initial_size, density, dry_density);
            return data;
        }

        function render_triangle_table() {
            const container = document.querySelector('.calc_glaze')
            const initial_size = parseInt(document.getElementById('lineSize').value);
            const initial_volume = parseInt(document.getElementById('testerVolume').value);
            let data = generate_triangle_data(initial_size, initial_volume, 0.5);
            
            if (check_zero_volumes(data)) data = generate_triangle_data(initial_size, initial_volume, 0.1);
            if (check_zero_volumes(data)) data = generate_triangle_data(initial_size, initial_volume, 0.05);
            if (check_zero_volumes(data)) data = generate_triangle_data(initial_size, initial_volume, 0.01);
            container.innerHTML = '';
            generate_triangle_table(initial_size, data, container);

            const summary_container = document.querySelector('.summary_container');
            const density = parseFloat(document.getElementById('density').value);
            const dry_density = parseFloat(document.getElementById('dryDensity').value);
            summary_container.innerHTML = generate_triangle_summary(data, initial_size, density, dry_density);
            return data;
        }

        function render_square_table() {
            const container = document.querySelector('.calc_glaze')
            const initial_size = parseInt(document.getElementById('lineSize').value);
            const initial_volume = parseInt(document.getElementById('testerVolume').value);
            let data = generate_square_data(initial_size, initial_volume, 0.5);
            
            if (check_zero_volumes(data)) data = generate_square_data(initial_size, initial_volume, 0.1);
            if (check_zero_volumes(data)) data = generate_square_data(initial_size, initial_volume, 0.05);
            if (check_zero_volumes(data)) data = generate_square_data(initial_size, initial_volume, 0.01);
            
            container.innerHTML = '';
            generate_rect_table(initial_size, initial_size, data, container);

            const summary_container = document.querySelector('.summary_container');
            const density = parseFloat(document.getElementById('density').value);
            const dry_density = parseFloat(document.getElementById('dryDensity').value);
            summary_container.innerHTML = generate_square_summary(data, initial_size, density, dry_density);
            return data;
        }
        
        function set_stretch_type(type) {
            current_stretch_type = type;
            console.log(`Selected stretch type: ${type}`);
            
            // Remove active class from all nav links
            document.querySelectorAll('.stretch-type').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to the selected link
            document.querySelector(`.stretch-type[data-type="${type}"]`).classList.add('active');
            
            // Set max value for lineSize based on stretch type
            const line_size_input = document.getElementById('lineSize');
            let max_value = 1; 
            
            if (type === "linear") max_value = 11;
            if (type === "triangle") max_value = 9;
            if (type === "square") max_value = 8;
            
            
            line_size_input.max = max_value;
            
            // Ensure current value doesn't exceed the new max
            if (parseInt(line_size_input.value) > max_value) {
                line_size_input.value = max_value;
            }
            
            // Save to localStorage
            localStorage.setItem('stretch_type', type);

            generate_calc();
        }
        
        function save_filter_values() {
            const line_size = document.getElementById('lineSize').value;
            const tester_volume = document.getElementById('testerVolume').value;
            const density = document.getElementById('density').value;
            const dry_density = document.getElementById('dryDensity').value;
            
            localStorage.setItem('line_size', line_size);
            localStorage.setItem('tester_volume', tester_volume);
            localStorage.setItem('density', density);
            localStorage.setItem('dry_density', dry_density);
        }
        
        function restore_filter_values() {
            const line_size = localStorage.getItem('line_size');
            const tester_volume = localStorage.getItem('tester_volume');
            const density = localStorage.getItem('density');
            const dry_density = localStorage.getItem('dry_density');
            
            if (line_size) document.getElementById('lineSize').value = line_size;
            if (tester_volume) document.getElementById('testerVolume').value = tester_volume;
            if (density) document.getElementById('density').value = density;
            if (dry_density) document.getElementById('dryDensity').value = dry_density;
        }

        function generate_calc() {
            if (current_stretch_type === "linear") {
                const data = render_linear_table();
                console.log("linear table generated: ", data);
            } else if (current_stretch_type === "triangle") {
                const data = render_triangle_table();
                console.log("triangle table generated: ", data);
            } else if (current_stretch_type === "square") {
                const data = render_square_table();
                console.log("square table generated: ", data);
            }
            // Save filter values to localStorage
            save_filter_values();
        }

        document.addEventListener("DOMContentLoaded", function() {
            // Restore filter values from localStorage
            restore_filter_values();

            generate_calc();
            

            
            // Add event listeners to inputs
            const filter_inputs = document.querySelectorAll('.filter-item input');
            filter_inputs.forEach(input => {
                input.addEventListener('change', generate_calc);
                input.addEventListener('input', generate_calc);
            });
            
            // Add event listeners to stretch type links
            document.querySelectorAll('.stretch-type').forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    set_stretch_type(this.getAttribute('data-type'));
                });
            });
            
            // Restore saved stretch type
            const saved_type = localStorage.getItem('stretch_type');
            if (saved_type) {
                set_stretch_type(saved_type);
            } else {
                set_stretch_type('linear'); // Default
            }
        });
