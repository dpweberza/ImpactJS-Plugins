ig.module( 
    'game.main' 
    )
.requires(
    'impact.game',
    'plugins.texture-atlas', // Include the plugin
    'plugins.packed-textures', // Include the TexturePacker JSON array for the texture atlas
    'game.entities.pod'
    )
.defines(function(){

    MyGame = ig.Game.extend({
        
        textureAtlas: null,
        textureImage: new ig.Image('media/sprites.png'),
        
        animatedPod: null, // demo for TextureAtlasAnimation
        staticPod: null, // demo for TextureAtlasImage
        font: null, // demo for TextureAtlasFont
	
        init: function() {
            this.textureAtlas = new ig.TextureAtlas(this.textureImage, new ig.PackedTextures().sprites); // Create the texture atlas
            this.animatedPod = ig.game.spawnEntity(EntityPod, 0, 0);
            this.animatedPod.currentAnim.flip.x = true;
            this.staticPod = new ig.TextureAtlasImage(ig.game.textureAtlas, 'EscapePodFemale 1.png', true);
            this.font = new ig.TextureAtlasFont(ig.game.textureAtlas, '04b03.font.png', true);
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