class Player {
    constructor (musicList) {
    this.musicList = musicList;
    this.playerIndex = 0;
    }
    getMusic() {
        return this.musicList[this.playerIndex];
    }
    prev() {
        if (this.playerIndex != 0) {
            this.playerIndex --;
        } else {
            this.playerIndex = this.musicList.length - 1;
        }
    }
    next() {
        if (this.playerIndex +1 < this.musicList.length) {
            this.playerIndex ++;
        } else {
            this.playerIndex = 0;
        }
    }
}
