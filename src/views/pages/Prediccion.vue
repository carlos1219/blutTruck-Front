<script>
import axios from 'axios';
import { mapState } from 'pinia';
import { useUserStore } from '/stores/user'; // Adjust path if necessary

export default {
    data() {
        return {
            riskPercentage: 45,
            apiRiskPercentage: null,
            isLoading: false,
            apiError: null,
            recommendations: [],

            monitoredPeople: [],
            isListLoading: false,
            listApiError: null,

            isInfinite: true,
            currentTranslate: 0
        };
    },
    computed: {
        // Map userId from the Pinia store
        ...mapState(useUserStore, {
            userId: (store) => store.fullUserData?.userId
        }),

        // Computed for main display percentage
        displayPercentage() {
            return this.apiRiskPercentage !== null && !this.apiError ? parseFloat(this.apiRiskPercentage.toFixed(1)) : this.riskPercentage;
        },

        // Computed for main display risk message
        riskMessage() {
            const percentage = this.displayPercentage;
            if (percentage < 30) return 'Bajo riesgo';
            if (percentage < 70) return 'Riesgo moderado';
            return 'Alto riesgo';
        },

        staticStyle() {
            // Only apply translation in static mode
            if (!this.isInfinite) {
                return { transform: `translateX(${this.currentTranslate}px)` };
            }
            return {};
        }
    },
    methods: {
        // Face image based on numeric percentage (used by both main display and list)
        faceImage(percentage) {
            if (percentage === null || typeof percentage === 'undefined') {
                return '/demo/images/caras/gris.png';
            }
            if (percentage < 30) return '/demo/images/caras/verde.png';
            if (percentage < 70) return '/demo/images/caras/amarilla.png';
            return '/demo/images/caras/roja.png';
        },

        toggleCarousel() {
            this.isInfinite = !this.isInfinite;
            this.currentTranslate = 0; // Reset position when toggling
        },
        prevSlide() {
            // Simple fixed step - might need refinement for dynamic content
            this.currentTranslate += 200;
            // Add bounds checks if needed
        },
        nextSlide() {
            // Simple fixed step - might need refinement for dynamic content
            this.currentTranslate -= 200;
            // Add bounds checks if needed (e.g., don't go beyond content width)
        },

        // --- Fetch main prediction data (Unchanged) ---
        async fetchPredictionData() {
            if (!this.userId) {
                this.apiError = 'No se pudo obtener el ID de usuario.';
                return;
            }
            this.isLoading = true;
            this.apiError = null;
            this.apiRiskPercentage = null;
            this.recommendations = [];
            const apiUrl = 'http://localhost:3000/api/ReadData/getprediction';
            const payload = { UserId: this.userId, IdToken: 'string' };

            try {
                const response = await axios.post(apiUrl, payload);
                // Assuming 'resultado' is lowercase string number, 'alertas' is lowercase array/null
                if (response.data && typeof response.data.resultado === 'string') {
                    const parsedPercentage = parseFloat(response.data.resultado);
                    if (!isNaN(parsedPercentage)) {
                        this.apiRiskPercentage = parsedPercentage;
                        if (response.data.alertas && Array.isArray(response.data.alertas)) {
                            this.recommendations = response.data.alertas;
                        } else {
                            this.recommendations = [];
                        }
                    } else {
                        throw new Error(`Valor de predicción principal inválido: "${response.data.resultado}".`);
                    }
                } else {
                    throw new Error('Respuesta inválida (predicción principal).');
                }
            } catch (error) {
                console.error('Error fetchPredictionData:', error);
                this.apiError = `Error (predicción principal): ${error.response?.data?.Message || error.message || 'Desconocido'}`;
                this.apiRiskPercentage = null;
                this.recommendations = [];
            } finally {
                this.isLoading = false;
            }
        },

        async fetchMonitoredList() {
            if (!this.userId) {
                this.listApiError = 'No se pudo obtener el ID de usuario para la lista.';
                return;
            }
            this.isListLoading = true;
            this.listApiError = null;
            this.monitoredPeople = []; // Reset list

            const apiUrl = 'http://localhost:3000/api/ReadData/getlistprediction';
            const payload = { UserId: this.userId, IdToken: 'string' }; // Or actual token

            try {
                console.log('Fetching monitored list for UserId:', this.userId);
                const response = await axios.post(apiUrl, payload);

                // Check if response.data is an array
                if (response.data && Array.isArray(response.data)) {
                    this.monitoredPeople = response.data
                        .map((item) => {
                            // Use lowercase 'resultado' and 'nombre' assuming standard JSON camelCase serialization
                            const percentageStr = item.resultado;
                            // --- CHANGE HERE: Use item.nombre ---
                            const name = item.nombre || `Usuario ${item.userId || 'Desconocido'}`; // Use 'nombre' field, provide fallback

                            if (typeof percentageStr === 'string') {
                                const percentage = parseFloat(percentageStr);
                                if (!isNaN(percentage)) {
                                    return {
                                        name: name, // Keep 'name' as the key in the component's array
                                        percentage: parseFloat(percentage.toFixed(1)) // Parse and format
                                    };
                                } else {
                                    console.warn(`Invalid percentage string "${percentageStr}" for user ${name}. Skipping.`);
                                    return null; // Skip this item if percentage is invalid
                                }
                            } else {
                                console.warn(`Missing or invalid 'resultado' type for user ${name}. Skipping.`);
                                return null; // Skip this item if percentage string is missing/invalid
                            }
                        })
                        .filter((person) => person !== null); // Remove items that were skipped due to errors

                    console.log('API Monitored List Received:', this.monitoredPeople);

                    // Add checks for list processing results (same as before)
                    if (this.monitoredPeople.length === 0 && response.data.length > 0) {
                        console.warn('Processed list is empty, check API response format (nombre, resultado string).');
                        this.listApiError = 'Error procesando la lista recibida (verificar formato nombre/resultado).'; // More specific error
                    } else if (this.monitoredPeople.length === 0) {
                        console.log('No monitored people data returned or all entries were invalid.');
                    }
                } else {
                    throw new Error('Respuesta inválida (lista): No se recibió un array.');
                }
            } catch (error) {
                console.error('Error fetchMonitoredList:', error);
                this.listApiError = `Error (lista): ${error.response?.data?.Message || error.message || 'Desconocido'}`;
                this.monitoredPeople = [];
            } finally {
                this.isListLoading = false;
            }
        }
    },
    mounted() {
        console.log('Component mounted');
        // Fetch both main prediction and monitored list
        this.fetchPredictionData();
        this.fetchMonitoredList();
    }
};
</script>

<template>
    <div>
        <div class="health-monitor">
            <div class="face-container">
                <div v-if="isLoading" class="loading-indicator">Cargando predicción...</div>

                <div v-else-if="apiError" class="error-message">
                    <p>Error al obtener la predicción:</p>
                    <p>{{ apiError }}</p>
                </div>

                <div v-else>
                    <img :src="faceImage(displayPercentage)" class="h-60 w-auto" alt="Risk Face" />
                    <div class="risk-info">
                        <div class="risk-label">{{ riskMessage }}:</div>
                        <div class="risk-percentage">{{ displayPercentage }}%</div>
                    </div>
                </div>
            </div>

            <div class="recommendations" :class="{ 'single-column': recommendations.length === 1 }">
                <div v-if="!isLoading && !apiError && !recommendations.length" class="no-recommendations">
                    {{ apiRiskPercentage !== null ? 'No hay alertas específicas.' : 'Esperando resultado...' }}
                </div>
                <div v-else-if="!isLoading && !apiError" v-for="(alert, index) in recommendations" :key="'alert-' + index" class="recommendation-box">
                    {{ alert }}
                </div>
            </div>
        </div>

        <button @click="toggleCarousel" class="toggle-btn rounded-border">
            {{ isInfinite ? 'Modo Estático (con flechas)' : 'Modo Infinito (deshabilitado)' }}
        </button>

        <div v-if="isListLoading" class="list-loading-indicator">Cargando lista de monitorizados...</div>

        <div v-else-if="listApiError" class="list-error-message">
            <p>Error al obtener la lista:</p>
            <p>{{ listApiError }}</p>
        </div>

        <div v-else-if="!monitoredPeople.length" class="no-monitored-people">No hay personas monitorizadas para mostrar.</div>

        <div v-else class="people-list">
            <div class="people-container" :style="staticStyle">
                <div v-for="(person, index) in monitoredPeople" :key="'monitored-' + index" class="person-card">
                    <img :src="faceImage(person.percentage)" :alt="`Cara de ${person.name}`" class="h-auto w-40" />
                    <p>{{ person.name }}</p>
                    <p>{{ person.percentage }}%</p>
                </div>
            </div>
        </div>

        <div v-if="!isInfinite && monitoredPeople.length > 0" class="arrow-controls">
            <button @click="prevSlide" class="arrow-btn rounded-border">←</button>
            <button @click="nextSlide" class="arrow-btn rounded-border">→</button>
        </div>
    </div>
</template>

<style scoped>
/* --- Add styles for list loading/error --- */
.list-loading-indicator,
.list-error-message,
.no-monitored-people {
    text-align: center;
    margin: 2rem 1rem;
    font-weight: bold;
    color: #555;
}
.list-error-message {
    color: red;
    border: 1px solid red;
    padding: 1rem;
    border-radius: 5px;
    background-color: #ffebee;
    width: 80%; /* Limit width */
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

/* --- Styles from previous step (mostly unchanged) --- */
.loading-indicator,
.error-message,
.no-recommendations {
    margin-top: 2rem;
    font-weight: bold;
    text-align: center;
}
.error-message {
    color: red;
    border: 1px solid red;
    padding: 1rem;
    border-radius: 5px;
    background-color: #ffebee;
    width: 80%; /* Limit width */
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}
.error-message img {
    margin-top: 1rem;
    opacity: 0.7;
}
.health-monitor {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}
.face-container {
    text-align: center;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}
.risk-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
}
.risk-label,
.risk-percentage {
    font-size: 1.2rem;
    font-weight: bold;
}
.person-card {
    flex: 0 0 auto;
    text-align: center;
    margin-right: 2rem;
    width: 160px;
}
.person-card img {
    display: block;
    margin: 0 auto 0.5rem auto;
}
.people-list {
    width: 100%;
    overflow: hidden; /* Hides overflow for static arrow controls */
    position: relative;
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-top: 1rem;
}
.people-container {
    display: flex;
    align-items: center;
    /* Add transition for smoother movement in static mode */
    transition: transform 0.5s ease;
}

/* Infinite animation class is defined but NOT applied by default anymore */
.people-container.infinite {
    animation: scrollLeft 30s linear infinite;
}

@keyframes scrollLeft {
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-1920px);
    } /* Adjust this value! */
}

.toggle-btn {
    margin: 1rem auto;
    display: block;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
.toggle-btn:hover {
    background: #0056b3;
}

.arrow-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}
.arrow-btn {
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    background: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
.arrow-btn:hover {
    background: #0056b3;
}

.recommendations {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 800px;
    padding: 0 1rem;
    box-sizing: border-box;
    min-height: 50px;
}
.recommendations.single-column {
    flex-direction: column;
    align-items: center;
}
.recommendations .recommendation-box {
    background-color: white;
    border: 2px solid #3498db;
    border-radius: 10px;
    color: #3498db;
    font-size: 1rem;
    padding: 1rem;
    text-align: center;
    flex-basis: 45%;
    box-sizing: border-box;
    margin: 0;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.recommendations.single-column .recommendation-box {
    flex-basis: 80%;
    width: auto;
}
.rounded-border {
    border-radius: 20px;
}
</style>
