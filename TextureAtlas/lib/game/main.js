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
	textureImage: new ig.Image('media/space_pods_array.png'),
        pod: null,
	
        init: function() {
            this.textureAtlas = new ig.TextureAtlas(this.textureImage, new ig.PackedTextures().spacepods); // Create the texture atlas
            this.pod = ig.game.spawnEntity(EntityPod, 0, 0);
        },
	
        update: function() {
            this.parent();
        },
	
        draw: function() {
            this.parent();
        }
    });


    ig.main( '#canvas', MyGame, 60, 320, 240, 1 );

});