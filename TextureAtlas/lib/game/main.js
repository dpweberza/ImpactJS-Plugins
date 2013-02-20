ig.module( 
    'game.main' 
    )
.requires(
    'impact.game',
    'plugins.texture-atlas', // Include the plugin
    'game.entities.pod'
    )
.defines(function(){

    MyGame = ig.Game.extend({
        
        textureAtlas: new ig.TextureAtlas('media/sprites.png'),
        
        animatedPod: null, // demo for TextureAtlasAnimation
        staticPod: null, // demo for TextureAtlasImage
        font: null, // demo for TextureAtlasFont
	
        init: function() {
            this.animatedPod = ig.game.spawnEntity(EntityPod, 0, 0);
            this.animatedPod.currentAnim.flip.x = true;
            this.staticPod = new ig.TextureAtlasImage(this.textureAtlas, 'EscapePodFemale 1.png', true);
            this.font = new ig.TextureAtlasFont(this.textureAtlas, '04b03.font.png', true);
        },
	
        update: function() {
            this.parent();
        },
	
        draw: function() {
            this.parent();
            this.staticPod.draw(100, 0);
            this.font.draw('TextureAtlasFont', 0, 0);
        }
    });


    ig.main( '#canvas', MyGame, 60, 320, 240, 1 );
});