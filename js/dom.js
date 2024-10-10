export default class DOM {
    static renderFoods(foods) {
        const foodList = document.getElementById('food-list');
        foodList.innerHTML = ''; // Limpiar la lista

        if (foods.length === 0) {
            const noFoodsMessage = document.createElement('li');
            noFoodsMessage.textContent = 'No hay alimentos disponibles.';
            foodList.appendChild(noFoodsMessage);
        } else {
            foods.forEach(food => {
                const listItem = document.createElement('li');
                const foodImage = document.createElement('img');
                const foodInfo = document.createElement('div');

                // Configurar imagen
                foodImage.src = food.image; // Suponiendo que 'image' es la propiedad que contiene la URL de la imagen
                foodImage.alt = food.name; // Suponiendo que 'name' es la propiedad del nombre del alimento
                foodImage.classList.add('food-image');

                // Crear contenedor para la información
                foodInfo.classList.add('food-info');
                foodInfo.innerHTML = `
                    <strong>${food.name}</strong>
                    <p>${food.description}</p>
                    <p>Ingredientes: ${food.ingredients}</p>
                `;

                listItem.appendChild(foodImage);
                listItem.appendChild(foodInfo);

                listItem.dataset.id = food.id;

                listItem.addEventListener('click', () => {
                    DOM.populateForm(food); // Llama a populateForm con el objeto de alimento
                });

                foodList.appendChild(listItem);
            });
        }
    }

    static showMessage(message, isError = false) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.style.color = isError ? 'red' : 'green';
    }

    static populateForm(food) {
        document.getElementById('name').value = food.name; // Cambia 'Name' a 'name' para que coincida
        document.getElementById('ingredients').value = food.ingredients; // Ajuste el ID según tu formulario
        document.getElementById('description').value = food.description; // Ajuste el ID según tu formulario
        // Si hay un campo para el ID, puedes agregarlo aquí
        // document.getElementById('id').value = food.id; // Descomentar si es necesario
    }
}
