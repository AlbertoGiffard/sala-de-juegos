export class User {
    id: any;
    uid: any;
    lastSignIn: any;
    topScoreAhorcado: number;
    topScoreMyM: number;
    topScorePreguntados: number;
    topScorePropio: number;

    constructor() {
        this.id = '';
        this.uid = '';
        this.topScoreAhorcado = 0;
        this.topScoreMyM = 0;
        this.topScorePreguntados = 0;
        this.topScorePropio = 0;
    }
}
