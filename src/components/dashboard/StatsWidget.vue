<template>
    <!-- Pasos -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Pasos</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">10000</div>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <!-- Puedes cambiar el ícono según disponibilidad -->
                    <i class="pi pi-map text-blue-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Calorías Activas -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Calorías Activas</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">500</div>
                </div>
                <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <!-- SVG Llama de fuego con color modificado -->
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
                        <path
                            d="M 9 4 L 10.726562 5.9082031 C 10.741563 5.9252031 12.181266 7.5891094 11.947266 9.5371094 C 11.798266 10.781109 10.986922 11.930406 9.5449219 12.941406 C 5.3059219 15.813406 4.0203438 19.676781 5.7773438 23.425781 C 7.0993437 26.247781 9.9972813 28 13.113281 28 L 14.927734 28 L 13.791016 26.388672 C 12.883016 25.214672 12.900187 23.873047 13.117188 22.873047 C 14.662188 24.042047 16.466703 23.89275 17.720703 23.09375 C 18.871703 22.35975 19.685891 21.037937 19.712891 19.460938 C 19.970891 19.868938 20.183937 20.344094 20.335938 20.871094 C 20.777938 22.402094 20.724094 24.737297 19.121094 26.279297 L 17.451172 28 L 19.025391 28 C 19.916391 28 20.810422 27.8335 21.607422 27.4375 C 24.096422 26.2025 25.776109 23.946547 26.662109 20.685547 C 27.383109 18.030547 26.922484 14.523922 25.396484 11.794922 C 21.857484 5.4439219 11.999031 4.2979531 11.582031 4.2519531 L 9 4 z M 13.453125 6.6152344 C 16.360125 7.2692344 21.514344 8.9335312 23.652344 12.769531 C 24.915344 15.026531 25.326563 17.8675 24.726562 20.1875 C 24.229563 22.1285 23.448078 23.578609 22.330078 24.599609 C 22.725078 23.101609 22.615813 21.558406 22.257812 20.316406 C 21.602812 18.048406 20.050125 16.403484 18.203125 16.021484 L 16 15.560547 L 17.142578 17.511719 C 18.203578 19.295719 17.628484 20.78025 16.646484 21.40625 C 15.863484 21.90525 14.583781 21.9535 13.550781 20.4375 L 12.597656 19.037109 L 11.832031 20.548828 C 11.567031 21.071828 10.540422 23.331078 11.232422 25.705078 C 9.7724219 25.231078 8.29725 24.171172 7.53125 22.451172 C 5.91025 18.813172 8.3426875 16.171891 10.679688 14.587891 C 12.627688 13.222891 13.7245 11.595906 13.9375 9.7539062 C 14.0755 8.5629062 13.812125 7.4792344 13.453125 6.6152344 z"
                            fill="#FF4500"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Frecuencia Cardiaca Promedio -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">FC Promedio</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">90</div>
                </div>
                <div class="flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-heart text-pink-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Frecuencia Cardiaca Mínima -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">FC Mínima</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">60</div>
                </div>
                <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-arrow-down text-green-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Frecuencia Cardiaca Máxima -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">FC Máxima</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">130</div>
                </div>
                <div class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-arrow-up text-yellow-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Frecuencia Cardiaca en Reposo -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">FC en Reposo</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">60</div>
                </div>
                <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="40" height="40" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#FF4500" stroke="none">
                            <path
                                d="M25 388 c-2 -7 -6 -56 -10 -108 -3 -52 -8 -137 -11 -187 l-6 -93 35 0 c31 0 36 3 39 27 l3 28 175 0 175 0 3 -27 c3 -25 8 -28 39 -28 l35 0 -6 103 c-4 56 -10 145 -14 197 l-7 95 -223 3 c-173 2 -223 0 -227 -10z m435 -78 c0 -58 -3 -68 -15 -64 -9 4 -15 19 -15 35 0 41 -21 47 -180 47 -159 0 -180 -6 -180 -47 0 -16 -6 -31 -15 -35 -12 -4 -15 6 -15 64 l0 70 210 0 210 0 0 -70z m-236 -6 c29 -11 17 -24 -21 -24 -21 0 -55 -4 -75 -9 -33 -8 -38 -7 -38 9 0 10 6 21 13 23 18 8 103 8 121 1z m170 0 c9 -3 16 -14 16 -24 0 -16 -5 -17 -37 -9 -21 5 -55 9 -75 9 -37 0 -51 13 -25 23 18 8 103 8 121 1z m28 -68 c24 -11 40 -28 47 -48 21 -61 31 -58 -219 -58 -250 0 -240 -3 -220 57 20 56 80 73 240 69 85 -2 125 -7 152 -20z m58 -171 c0 -33 -4 -45 -15 -45 -8 0 -15 8 -15 18 0 38 -18 42 -200 42 -182 0 -200 -4 -200 -42 0 -10 -7 -18 -15 -18 -11 0 -15 12 -15 45 l0 45 230 0 230 0 0 -45z"
                            ></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Peso -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Peso</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">82 kg</div>
                </div>
                <div class="flex items-center justify-center bg-indigo-100 dark:bg-indigo-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="40" height="40" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#3F51B5" stroke="none">
                            <path
                                d="M103 391 c-3 -12 -15 -21 -32 -23 -22 -3 -26 -8 -29 -39 -2 -27 -9 -38 -23 -42 -27 -7 -27 -67 0 -74 14 -4 21 -15 23 -42 3 -31 7 -36 29 -39 17 -2 29 -11 32 -23 5 -17 12 -20 44 -17 l38 3 3 58 3 57 59 0 59 0 3 -57 3 -58 38 -3 c32 -3 39 0 44 17 3 12 15 21 32 23 22 3 26 8 29 39 2 27 9 38 23 42 27 7 27 67 0 74 -14 4 -21 15 -23 42 -3 31 -7 36 -29 39 -17 2 -29 11 -32 23 -5 17 -12 20 -44 17 l-38 -3 -3 -57 -3 -58 -59 0 -59 0 -3 58 -3 57 -38 3 c-32 3 -39 0 -44 -17z m67 -141 l0 -140 -25 0 -25 0 0 140 0 140 25 0 25 0 0 -140z m210 0 l0 -140 -25 0 -25 0 0 140 0 140 25 0 25 0 0 -140z m-280 0 c0 -93 -1 -100 -20 -100 -19 0 -20 7 -20 100 0 93 1 100 20 100 19 0 20 -7 20 -100z m340 0 c0 -93 -1 -100 -20 -100 -19 0 -20 7 -20 100 0 93 1 100 20 100 19 0 20 -7 20 -100z m-400 0 c0 -11 -4 -20 -10 -20 -5 0 -10 9 -10 20 0 11 5 20 10 20 6 0 10 -9 10 -20z m270 0 c0 -18 -7 -20 -60 -20 -53 0 -60 2 -60 20 0 18 7 20 60 20 53 0 60 -2 60 -20z m170 0 c0 -11 -4 -20 -10 -20 -5 0 -10 9 -10 20 0 11 5 20 10 20 6 0 10 -9 10 -20z"
                            ></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Altura -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Altura</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">182 cm</div>
                </div>
                <div class="flex items-center justify-center bg-teal-100 dark:bg-teal-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#009688" stroke="none">
                            <path d="M140 470 c0 -6 43 -10 110 -10 67 0 110 4 110 10 0 6 -43 10 -110 10 -67 0 -110 -4 -110 -10z" />
                            <path
                                d="M221 419 c-24 -32 -22 -50 4 -29 13 11 15 -5 15 -140 0 -135 -2 -151 -15 -140 -26 21 -28 3 -4 -29 13 -17 26 -31 29 -31 3 0 16 14 29 31 24 32 22 50 -4 29 -13 -11 -15 5 -15 140 0 135 2 151 15 140 26 -21 28 -3 4 29 -13 17 -26 31 -29 31 -3 0 -16 -14 -29 -31z"
                            />
                            <path d="M140 430 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 430 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 390 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 390 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 350 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 350 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 310 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 310 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 270 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 270 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 230 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 230 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 190 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 190 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 150 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 150 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 110 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 110 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 70 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M340 70 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z" />
                            <path d="M140 30 c0 -6 43 -10 110 -10 67 0 110 4 110 10 0 6 -43 10 -110 10 -67 0 -110 -4 -110 -10z" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Presión Arterial Sistólica -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Presión Sistólica</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">120 mmHg</div>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-arrow-up text-orange-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Presión Arterial Diastólica -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Presión Diastólica</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">60 mmHg</div>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-arrow-down text-orange-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Saturación de Oxígeno -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Saturación de Oxígeno</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">99 %</div>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-cloud text-blue-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Glucosa en Sangre -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Glucosa en Sangre</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">12 mg/dL</div>
                </div>
                <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" fill="#D1A4E2" stroke="none">
                            <path
                                d="M322 418 c-7 -7 -12 -20 -12 -29 0 -38 -10 -48 -35 -37 -61 28 -140 -25 -153 -103 -6 -37 -12 -45 -32 -47 -60 -9 -63 -36 -14 -104 30 -40 41 -49 63 -46 21 2 28 10 35 39 8 35 9 35 62 35 47 -1 57 3 85 30 20 21 32 44 36 71 5 36 9 41 42 49 48 12 51 35 10 93 -46 64 -62 74 -87 49z m58 -60 c23 -31 27 -44 18 -50 -18 -11 -56 -10 -63 1 -5 10 4 91 11 91 2 0 17 -19 34 -42z m-79 -57 c19 -19 29 -39 29 -58 l-1 -28 -22 27 c-62 76 -67 119 -6 59z m-38 -50 c34 -51 43 -71 34 -80 -21 -21 -34 -11 -80 58 -34 51 -43 71 -34 80 21 21 34 11 80 -58z m-50 -71 c23 -39 5 -39 -34 -1 -19 19 -29 39 -29 58 l1 28 22 -27 c12 -15 31 -41 40 -58z m-65 -13 c12 -14 -2 -87 -16 -87 -7 0 -62 74 -62 83 0 5 25 12 56 16 6 0 16 -5 22 -12z"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Temperatura Corporal -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Temperatura</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">36 °C</div>
                </div>
                <div class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#FF9800" stroke="none">
                            <path
                                d="M207 482 c-14 -15 -17 -41 -17 -137 0 -116 -1 -120 -27 -148 -23 -23 -28 -37 -28 -77 0 -43 5 -54 33 -82 47 -48 117 -48 164 0 28 28 33 39 33 82 0 40 -5 54 -29 79 -28 30 -29 31 -8 31 12 0 22 5 22 10 0 6 -9 10 -20 10 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9 10 -20 10 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9 10 -20 10 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9 10 -20 10 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9 10 -20 10 -15 0 -20 7 -20 28 0 55 -68 83 -103 44z m67 -8 c10 -4 16 -18 16 -35 0 -27 -3 -29 -40 -29 -38 0 -40 2 -40 29 0 36 26 50 64 35z m16 -170 c0 -79 2 -89 25 -110 59 -54 36 -151 -40 -170 -101 -25 -167 99 -90 170 23 21 25 31 25 110 l0 86 40 0 40 0 0 -86z"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Frecuencia Respiratoria -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Frecuencia Respiratoria</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">40 rpm</div>
                </div>
                <div class="flex items-center justify-center bg-teal-100 dark:bg-teal-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-sync text-teal-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>
</template>
