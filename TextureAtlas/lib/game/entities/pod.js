ig.module(
    'game.entities.pod' 
    )
.requires(
    'impact.entity',
    'plugins.texture-atlas' // Include the plugin
)
.defines(function(){
    EntityPod = ig.Entity.extend({
        textureAtlas: new ig.TextureAtlas(new ig.Image('media/sprites.png'), ig.PackedTextures.sprites),

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAtlasAnim('idle', 1, [1, 2], false); // Add texture atlas animation
        }
    });
});