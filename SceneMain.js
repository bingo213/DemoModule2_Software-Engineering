class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload() {
    this.load.image("voicam", "assets/voi cam.png");
    this.load.image("voicam_ha_mieng", "assets/voi cam ha mieng.png");
    this.load.image("voicamsleep", "assets/voi cam sleep.png");
    this.load.image("voitim", "assets/voi tim.png");
    this.load.image("voitim_ha_mieng", "assets/voi tim ha mieng.png");
    this.load.image("voitimsleep", "assets/voi tim sleep.png");
    this.load.image("voi_do_trai", "assets/voi do trai.png");
    this.load.image("voi_do_phai", "assets/voi do phai.png");
    this.load.image("circle1", "assets/circle1.png");
    this.load.image("rectangle1", "assets/rectangle1.png");
    this.load.image("square1", "assets/square1.png");
    this.load.image("triangle1", "assets/triangle1.png");
    this.load.image("circle2", "assets/circle2.png");
    this.load.image("square2", "assets/square2.png");
    this.load.image("triangle2", "assets/triangle2.png");
  }

  create() {
    const gameScene = this.scene.get("SceneMain");
    this.count1 = 0;
    this.count2 = 0;

    this.voicam = this.add.image(250, 400, "voicam");
    this.voicam_ha_mieng = this.add.image(250, 400, "voicam_ha_mieng");
    this.voicam_ha_mieng.visible = false;
    this.voi_do_trai = this.add.image(250, 400, "voi_do_trai");
    this.voi_do_trai.visible = false;
    this.voicamsleep = this.add.image(250, 400, "voicamsleep");
    this.voicamsleep.visible = false;

    this.voitim = this.add.image(1200, 400, "voitim");
    this.voitim_ha_mieng = this.add.image(1200, 400, "voitim_ha_mieng");
    this.voitim_ha_mieng.visible = false;
    this.voi_do_phai = this.add.image(1200, 400, "voi_do_phai");
    this.voi_do_phai.visible = false;
    this.voitimsleep = this.add.image(1200, 400, "voitimsleep");
    this.voitimsleep.visible = false;

    this.circle1 = this.add.image(600, 400, "circle1").setName('circle');
    this.triangle1 = this.add.image(750, 450, "triangle1").setName('triangle');
    this.square1 = this.add.image(900, 400, "square1").setName('square');
    this.rectangle1 = this.add.image(750, 630, "rectangle1").setName('rectangle');
    this.circle2 = this.add.image(720, 270, "circle2").setName('circle');
    this.triangle2 = this.add.image(600, 650, "triangle2").setName('triangle');
    this.square2 = this.add.image(500, 200, "square2").setName('square');
    this.rectangle2 = this.add.image(900, 150, "rectangle1").setName('rectangle');

    this.circle1.setInteractive();
    this.triangle1.setInteractive();
    this.square1.setInteractive();
    this.rectangle1.setInteractive();
    this.circle2.setInteractive();
    this.triangle2.setInteractive();
    this.square2.setInteractive();
    this.rectangle2.setInteractive();
    this.input.setDraggable(gameScene.circle1);
    this.input.setDraggable(gameScene.triangle1);
    this.input.setDraggable(gameScene.square1);
    this.input.setDraggable(gameScene.rectangle1);
    this.input.setDraggable(gameScene.circle2);
    this.input.setDraggable(gameScene.triangle2);
    this.input.setDraggable(gameScene.square2);
    this.input.setDraggable(gameScene.rectangle2);

    var check = false;

    //  A drop zone
    var zone1 = this.add.zone(gameScene.voicam.x, gameScene.voicam.y).setCircleDropZone(200);
    var zone2 = this.add.zone(gameScene.voitim.x, gameScene.voitim.y).setCircleDropZone(200);
    this.bungvoicam = [{
        x: 150,
        y: 610
      },
      {
        x: 280,
        y: 600
      }
    ];

    this.bungvoitim = [{
        x: 1200,
        y: 610
      },
      {
        x: 1200,
        y: 600
      }
    ];

    this.input.on('dragstart', function(pointer, gameObject) {

      this.children.bringToTop(gameObject);

    }, this);

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      check = true;

    });
    this.input.on('dragend', function(pointer, gameObject, dropped) {
      check = false;
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      if (gameScene.bungvoicam.length === 0) zone1.destroy();
      if (gameScene.bungvoitim.length === 0) zone2.destroy();

    });


    this.input.on('drop', function(pointer, gameObject) {
      check = false;
      if (voi === 1) {
        if (gameObject.name === 'triangle') {
          gameScene.voicam_ha_mieng.visible = true;
          gameScene.moveToStomatch(voi, gameObject);

        } else {
          gameScene.voi_do_trai.visible = true;
          gameScene.voicam.visible = false;
          setTimeout(function() {
            gameScene.voi_do_trai.visible = false;
          }, 1500);
          gameScene.back(voi, gameObject, gameObject.input.dragStartX, gameObject.input.dragStartY);
        }
        //  }
      }


      if (voi === 2) {
        if (gameObject.name === 'circle') {
          gameScene.voitim_ha_mieng.visible = true;
          gameScene.moveToStomatch(voi, gameObject);
        } else {
          gameScene.voi_do_phai.visible = true;
          setTimeout(function() {
            gameScene.voi_do_phai.visible = false;
          }, 1500);
          gameScene.back(voi, gameObject, gameObject.input.dragStartX, gameObject.input.dragStartY);
        }
      }
    });

    var cir1 = new Phaser.Geom.Circle(100, 400, 350);
    var cir2 = new Phaser.Geom.Circle(1300, 400, 350);

    var voi = 0;
    this.input.on('pointermove', function(pointer) {
      if (cir1.contains(pointer.x, pointer.y) && check === true) {
        gameScene.voicam.visible = false;
        gameScene.voicam_ha_mieng.visible = true;
        voi = 1;
      } else {
        gameScene.voicam.visible = true;
        gameScene.voicam_ha_mieng.visible = false;
      }

      if (cir2.contains(pointer.x, pointer.y) && check === true) {
        gameScene.voitim.visible = false;
        gameScene.voitim_ha_mieng.visible = true;
        voi = 2;
      } else {
        gameScene.voitim.visible = true;
        gameScene.voitim_ha_mieng.visible = false;
      }

    });
  }

  update() {
    if (this.bungvoicam.length === 0) {
      if(this.count1 < 200)
        this.count1++;
      else {
          this.sleepvoicam();
        }
      }
    if (this.bungvoitim.length === 0) {
      if(this.count2 < 200)
        this.count2++;
      else {
          this.sleepvoitim();
        }
    }
  }

  back(voi, gameObject, x, y) {
    if (voi === 1) {
      this.tweens.timeline({
        targets: gameObject,
        ease: 'Linear',
        tweens: [{
            x: 100,
            y: 250,
            duration: 500
          },
          {
            x: x,
            y: y,
            duration: 1000
          }
        ]
      });
    }
    if (voi === 2) {
      this.tweens.timeline({
        targets: gameObject,
        ease: 'Power1',
        tweens: [{
            x: 1300,
            y: 250,
            duration: 500
          },
          {
            x: x,
            y: y,
            duration: 1000
          }
        ]
      });
    }
  }

  sleepvoicam() {
    this.triangle1.visible = false;
    this.triangle2.visible = false;
    this.voicam.visible = false;
    this.voicam_ha_mieng.visible = false;
    this.voicamsleep.visible = true;
  }
  sleepvoitim() {
    this.circle1.visible = false;
    this.circle2.visible = false;
    this.voitim.visible = false;
    this.voitim_ha_mieng.visible = false;
    this.voitimsleep.visible = true;
  }

  moveToStomatch(voi, gameObject) {
    if (voi === 1) {
      this.tweens.timeline({
        targets: gameObject,
        ease: 'Linear',
        tweens: [{
            x: 100,
            y: 250,
            duration: 200
          },
          {
            x: this.bungvoicam[0].x,
            y: this.bungvoicam[0].y,
            scaleX: 0.5,
            scaleY: 0.5,
            angle: 180,
            ease: 'Bounce.easeOut',
            duration: 3000
          }
        ]
      });
      this.bungvoicam.shift();
    }
    if (voi === 2) {
      this.tweens.timeline({
        targets: gameObject,
        ease: 'Power1',
        tweens: [{
            x: 1300,
            y: 250,
            duration: 200
          },
          {
            x: this.bungvoitim[0].x,
            y: this.bungvoitim[0].y,
            scaleX: 0.5,
            scaleY: 0.5,
            angle: 180,
            ease: 'Bounce.easeOut',
            duration: 3000
          }
        ]
      });
      this.bungvoitim.shift();
    }
  }
}
