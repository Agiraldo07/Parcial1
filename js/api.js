// api.js
const BASE_URL = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods';

export default class API {
    static async fetchFoods() {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al obtener los alimentos: ${errorData.message || response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error en fetchFoods: ", error.message);
            throw error;
        }
    }

    static async createFood(food) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(food)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al crear el alimento: ${errorData.message || response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error en createFood: ", error.message);
            throw error;
        }
    }

    static async updateFood(id, food) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(food)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al modificar el alimento: ${errorData.message || response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error en updateFood: ", error.message);
            throw error;
        }
    }
}
