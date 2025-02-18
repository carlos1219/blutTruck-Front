<script>
export default {
    data() {
        return {
            riskPercentage: 45,
            isInfinite: true,
            currentTranslate: 0,
            people: [
                { name: 'Juan Pérez', percentage: 25 },
                { name: 'María López', percentage: 50 },
                { name: 'Carlos García', percentage: 75 },
                { name: 'Ana Martínez', percentage: 30 },
                { name: 'Luis Ramírez', percentage: 60 },
                { name: 'Juan Pérez', percentage: 25 },
                { name: 'María López', percentage: 50 },
                { name: 'Carlos García', percentage: 75 },
                { name: 'Ana Martínez', percentage: 30 },
                { name: 'Luis Ramírez', percentage: 60 }
            ],
            personData: {
                Edad: 61,
                Genero: 1,
                AlturaCm: 168,
                PesoKg: 70.0,
                PresionSistolica: 120,
                PresionDiastolica: 90,
                Colesterol: 2,
                Glucosa: 1,
                Fuma: 0,
                BebeAlcohol: 0,
                Activo: 1,
                EnfermedadCardiaca: 1
            },
            recommendations: []
        };
    },
    computed: {
        riskMessage() {
            if (this.riskPercentage < 30) {
                return 'Bajo riesgo';
            } else if (this.riskPercentage < 70) {
                return 'Riesgo moderado';
            } else {
                return 'Alto riesgo';
            }
        },
        staticStyle() {
            if (!this.isInfinite) {
                return { transform: `translateX(${this.currentTranslate}px)` };
            }
            return {};
        }
    },
    methods: {
        faceImage(percentage) {
            if (percentage < 30) {
                return '/demo/images/caras/verde.png';
            } else if (percentage < 70) {
                return '/demo/images/caras/amarilla.png';
            } else {
                return '/demo/images/caras/roja.png';
            }
        },
        toggleCarousel() {
            this.isInfinite = !this.isInfinite;
            this.currentTranslate = 0;
        },
        prevSlide() {
            this.currentTranslate += 200;
        },
        nextSlide() {
            this.currentTranslate -= 200;
        },
        evaluateHealthMetrics() {
            const recommendations = [];

            // Define normal ranges
            const normalRanges = {
                PresionSistolica: [80, 150],
                PresionDiastolica: [50, 90],
                Colesterol: [0, 1], // Assuming 0-1 is normal
                Glucosa: [0, 1], // Assuming 0-1 is normal
                PesoKg: [50, 80], // Example range
                Activo: [1] // 1 means active
            };

            // Evaluate each metric
            if (this.personData.PresionSistolica < normalRanges.PresionSistolica[0] || this.personData.PresionSistolica > normalRanges.PresionSistolica[1]) {
                recommendations.push('Tu presión sistólica está fuera del rango normal. Considera consultar a un médico.');
            }

            if (this.personData.PresionDiastolica < normalRanges.PresionDiastolica[0] || this.personData.PresionDiastolica > normalRanges.PresionDiastolica[1]) {
                recommendations.push('Tu presión diastólica está fuera del rango normal. Considera consultar a un médico.');
            }

            if (this.personData.Colesterol > normalRanges.Colesterol[1]) {
                recommendations.push('Tu nivel de colesterol es alto. Considera cambios en tu dieta.');
            }

            if (this.personData.Glucosa > normalRanges.Glucosa[1]) {
                recommendations.push('Tu nivel de glucosa es alto. Considera consultar a un médico.');
            }

            if (this.personData.PesoKg < normalRanges.PesoKg[0] || this.personData.PesoKg > normalRanges.PesoKg[1]) {
                recommendations.push('Tu peso está fuera del rango normal. Considera una dieta equilibrada y ejercicio regular.');
            }

            if (!normalRanges.Activo.includes(this.personData.Activo)) {
                recommendations.push('No estás suficientemente activo. Considera aumentar tu actividad física.');
            }

            this.recommendations = recommendations;
            console.log('Recommendations:', this.recommendations); // Debugging line
        }
    },
    mounted() {
        console.log('Component mounted'); // Debugging line
        this.evaluateHealthMetrics();
    }
};
</script>

<template>
    <div>
        <div class="health-monitor">
            <div class="face-container">
                <img :src="faceImage(riskPercentage)" alt="Face Indicator" class="h-80 w-auto" />
                <div class="risk-info">
                    <div class="risk-label">Riesgo:</div>
                    <div class="risk-percentage">{{ riskPercentage }}%</div>
                </div>
            </div>
            <div class="recommendations" :class="{ 'single-column': recommendations.length === 1 }">
                <div v-for="(recommendation, index) in recommendations" :key="index" class="recommendation-box">
                    {{ recommendation }}
                </div>
            </div>
        </div>

        <button @click="toggleCarousel" class="toggle-btn rounded-border">
            {{ isInfinite ? 'Modo Estático (con flechas)' : 'Modo Infinito (automático)' }}
        </button>

        <div class="people-list">
            <div class="people-container" :class="{ infinite: isInfinite }" :style="staticStyle">
                <div v-for="(person, index) in people" :key="index" class="person-card">
                    <img :src="faceImage(person.percentage)" alt="Person Face" class="h-auto w-40" />
                    <p>{{ person.name }}</p>
                    <p>{{ person.percentage }}%</p>
                </div>
            </div>
        </div>
        <div v-if="!isInfinite" class="arrow-controls">
            <button @click="prevSlide" class="arrow-btn rounded-border">←</button>
            <button @click="nextSlide" class="arrow-btn rounded-border">→</button>
        </div>
    </div>
</template>

<style scoped>
.health-monitor {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.face-container {
    text-align: center;
}

.risk-info {
    display: flex;
    justify-content: space-between;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.risk-label,
.risk-percentage {
    font-size: 1.2rem;
    font-weight: bold;
}

.person-card {
    flex: 0 auto;
    text-align: center;
    margin-right: 4rem;
}

.people-list {
    width: 150%;
    overflow: hidden;
    position: relative;
}

.people-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.people-container.infinite {
    animation: scrollLeft 30s linear infinite;
}

@keyframes scrollLeft {
    0% {
        transform: translateX(100%);
    }
    20% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}

.toggle-btn {
    margin: 1rem auto;
    display: block;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 4rem;
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
}

.recommendations {
    margin-top: 2rem;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
    font-size: 1.2rem;
    padding: 1rem;
    margin: 0.5rem;
    text-align: center;
    width: 45%; /* Adjusted width for two-column layout */
    box-sizing: border-box; /* Ensures padding is included in width */
}

.recommendations.single-column .recommendation-box {
    width: 80%; /* Adjusted width for single-column layout */
}
</style>
