// app.js
import API from './api.js';
import DOM from './dom.js';

let foodId = null; // Inicializar variable

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar alimentos al cargar la página
    try {
        const foods = await API.fetchFoods(); // Cambiar a fetchFoods
        DOM.renderFoods(foods); // Cambiar a renderFoods
    } catch (error) {
        DOM.showMessage('Error cargando los alimentos', true);
    }

    // Manejar el envío del formulario
    document.getElementById('food-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim());

        if (!name || !description) {
            DOM.showMessage('Por favor complete todos los campos', true);
            return;
        }

        try {
            if (foodId) {
                // Modificar alimento existente
                await API.updateFood(foodId, { name, description, ingredients });
                DOM.showMessage('Alimento modificado correctamente');
            } else {
                // Crear nuevo alimento
                await API.createFood({ name, description, ingredients });
                DOM.showMessage('Alimento creado correctamente');
            }

            // Recargar lista de alimentos
            const foods = await API.fetchFoods(); // Cambiar a fetchFoods
            DOM.renderFoods(foods); // Cambiar a renderFoods

            // Limpiar el formulario
            document.getElementById('food-form').reset();
            foodId = null; // Reiniciar foodId
            document.getElementById('submit-btn').textContent = 'Enviar';
        } catch (error) {
            DOM.showMessage('Error al guardar el alimento', true);
        }
    });
});
