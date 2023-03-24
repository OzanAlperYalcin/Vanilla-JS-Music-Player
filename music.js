class Music {
    constructor (title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }
    getName () {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Valhalla Calling", "Miracle Of Sound ft. Payton Parrish","valhalla-calling.jpg","valhalla-calling.mp3"),    
    new Music("Another Level", "Oh The Larceny","another-level.png","another-level.mp3"),    
    new Music("Because The Night", "Mystic Prophecy","because-the-night.png","because-the-night.mp3")
];