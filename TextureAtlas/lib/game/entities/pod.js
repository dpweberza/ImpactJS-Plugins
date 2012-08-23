ig.module(
    'game.entities.pod' 
    )
.requires(
    'impact.entity'
    )
.defines(function(){
    EntityPod = ig.Entity.extend({
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addTextureAtlasAnim( ig.game.textureAtlas, 'idle', 1, ['EscapePodFemale 1.png', 'EscapePodFemale 2.png'], false); // Add texture atlas animation
        }
    });
});