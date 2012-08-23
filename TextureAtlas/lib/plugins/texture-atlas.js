ig.module(
    'plugins.texture-atlas'
    )
.requires(
    'impact.animation',
    'impact.image',
    'impact.entity'
    )
.defines(function(){
    "use strict";

    // Add a nice convenience method to the Entity class so that we can add TextureAtlasAnimations
    ig.Entity.inject({
        addTextureAtlasAnim: function( textureAtlas, name, frameTime, sequence, stop ) {
        
            if( !textureAtlas) 
                throw( 'No texture atlas to add the animation from!' );
            if( !name) 
                throw( 'No name to call the animation!' );
                
            var a = new ig.TextureAtlasAnimation(textureAtlas, frameTime, sequence, stop);
            this.anims[name] = a;
            if( !this.currentAnim ) {
                this.currentAnim = a;
            }
		
            return a;
        }
    });

    // A TextureAtlas class holds an Image and the packed texture JSON array exported from TexturePacker
    ig.TextureAtlas = ig.Class.extend({
        image: null,
        
        packedTexture:  null,
        width: 0,
        height: 0,
	
        init: function(path, packedTexture) {
            this.image = new ig.Image( path );
            
            if (packedTexture == null)
                throw('Packed texture is null!');
            this.packedTexture = packedTexture;
            this.width = packedTexture.meta.size.w;
            this.height = packedTexture.meta.size.h;
        },
        
        getFrameData: function(frame) {
            var i = 0;
            for (i = 0; i <  this.packedTexture.frames.length; i++)
            {
                if (this.packedTexture.frames[i].filename == frame)
                    return this.packedTexture.frames[i];
            }
        
            throw('Frame: ' + frame + ' does not exist!');
        }
    });
    
    // A TextureAtlasAnimation extends Impact's Animation class to allow looking up a frames data from the TexturePacker JSON array
    ig.TextureAtlasAnimation = ig.Animation.extend({
        textureAtlas: null,
        
        frameData: 0,
	
        init: function( textureAtlas, frameTime, sequence, stop ) {
            this.textureAtlas = textureAtlas;
            this.pivot = {
                x: textureAtlas.width/2, 
                y: textureAtlas.height/2
            };
            this.timer = new ig.Timer();

            this.frameTime = frameTime;
            this.sequence = sequence;
            this.stop = !!stop;
            this.frameData = this.textureAtlas.getFrameData(this.sequence[0]);
        },
        
        rewind: function() {
            this.timer.reset();
            this.loopCount = 0;
            this.frameData = this.textureAtlas.getFrameData(this.sequence[0]);
            return this;
        },
	
        update: function() {
            var frameTotal = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(frameTotal / this.sequence.length);
            if( this.stop && this.loopCount > 0 ) {
                this.frame = this.sequence.length - 1;
            }
            else {
                this.frame = frameTotal % this.sequence.length;
            }
            this.frameData = this.textureAtlas.getFrameData(this.sequence[this.frame]);
        },
	
	
        draw: function( targetX, targetY ) {
            var bbsize = Math.max(this.textureAtlas.width, this.textureAtlas.height);
                
            // On screen?
            if(
                targetX > ig.system.width || targetY > ig.system.height ||
                targetX + bbsize < 0 || targetY + bbsize < 0
                ) {
                return;
            }
		
            if( this.alpha != 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
		
            if( this.angle == 0 ) {		
                this.textureAtlas.image.draw(
                    targetX, targetY,
                    this.frameData.frame.x, this.frameData.frame.y, this.frameData.frame.w, this.frameData.frame.h
                    );
            }
            else {
            // TODO - angled drawing
            }
		
            if( this.alpha != 1) {
                ig.system.context.globalAlpha = 1;
            }
        }
    });

});