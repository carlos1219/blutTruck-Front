// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        fullUserData: null,
        dias: {},
        monitoredUserData: null
    }),
    actions: {
        setUserData(data) {
            this.fullUserData = data;
        },
        setDias(diasData) {
            this.dias = diasData;
        },
        setMonitoredUserData(data) {
            this.monitoredUserData = data;
        },
        updateDiasInUserData(newDias) {
            if (this.fullUserData) {
                // Actualiza solo la propiedad "dias" en fullUserData
                this.fullUserData = { ...this.fullUserData, dias: newDias };
            } else {
                // Si fullUserData aún no existe, puedes inicializarla con la propiedad "dias"
                this.fullUserData = { dias: newDias };
            }
        }
    }
});
