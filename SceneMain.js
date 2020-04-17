class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    	this.load.image("voicam","assets/voi cam.png");
      this.load.image("voicam_ha_mieng","assets/voi cam ha mieng.png");
      this.load.image("voitim","assets/voi tim.png");
      this.load.image("voitim_ha_mieng","assets/voi tim ha mieng.png");
      this.load.image("voido","assets/voi do.png");
      this.load.image("circle","assets/circle.png");
      this.load.image("rectangle","assets/rectangle.png");
      this.load.image("square","assets/square.png");
      this.load.image("triangle","assets/triangle.png");

    }
    create() {
    var voicam = this.add.image(250,400,"voicam");
    var voicam_ha_mieng = this.add.image(255,405,"voicam_ha_mieng");
    voicam_ha_mieng.visible = false;
    var voitim = this.add.image(1200,400,"voitim");
    var circle = this.add.image(600,400,"circle");
    var triangle = this.add.image(750,400,"triangle");
    var square = this.add.image(900,400,"square");
    var rectangle = this.add.image(750,550,"rectangle");

    circle.setInteractive();
    triangle.setInteractive();
    square.setInteractive();
    rectangle.setInteractive();
    this.input.setDraggable(circle);
    this.input.setDraggable(triangle);
    this.input.setDraggable(square);
    this.input.setDraggable(rectangle);

    var check = false;

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
        check = true;
    });
    this.input.on('dragend',()=>check = false)

    var cir = new Phaser.Geom.Circle(100,400,350);


    this.input.on('pointermove', function (pointer) {

        if(cir.contains(pointer.x, pointer.y) && check === true)
        {
            voicam.visible = false;
            voicam_ha_mieng.visible = true;
        }
        else
        {
            voicam.visible = true;
            voicam_ha_mieng.visible = false;
        }

    });

    }
    update() {}
}
