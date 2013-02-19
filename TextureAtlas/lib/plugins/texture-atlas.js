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
        addTextureAtlasAnim: function(textureAtlas, name, frameTime, sequence, stop, maintainFrameOffset) {
            
            if(!textureAtlas) 
                throw('No texture atlas to add the animation from!');
            if(!name) 
                throw('No name to call the animation!');
            
            var a = new ig.TextureAtlasAnimation(textureAtlas, frameTime, sequence, stop, maintainFrameOffset);
            this.anims[name] = a;
            if( !this.currentAnim ) {
                this.currentAnim = a;
            }
            
            return a;
        }
    });
    
    /**
     * A TextureAtlas class holds an Image and the packed texture JSON array exported from TexturePacker / ShoeBox
     *
     * Author: dpweberza@gmail.com
     *
     * Version 0.1  - 2012/10/14
     *
     * Notes:
     */
    ig.TextureAtlas = ig.Class.extend({
        image: null,
        
        packedTexture:  null,
        width: 0,
        height: 0,
        
        init: function(spriteSheetImage, packedTexture) {
            this.image = spriteSheetImage;
            
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
    
    /**
     * A TextureAtlasAnimation extends Impact's Animation class to allow looking up a frames data from the TexturePacker JSON array
     *
     * Author: dpweberza@gmail.com
     *
     * Version 0.4  - 2013/02/19
     *
     * Notes:
     */
    ig.TextureAtlasAnimation = ig.Animation.extend({
        textureAtlas: null,
        maintainFrameOffset: false,
        frameData: 0,
        
        init: function(textureAtlas, frameTime, sequence, stop, maintainFrameOffset) {
            this.textureAtlas = textureAtlas;
            this.timer = new ig.Timer();
            this.frameTime = frameTime;
            this.sequence = sequence;
            this.frameData = this.textureAtlas.getFrameData(this.sequence[0]);
            this.stop = !!stop;
            if (maintainFrameOffset)
                this.maintainFrameOffset = maintainFrameOffset;
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
        
        
        draw: function(targetX, targetY) {
            var bbsize = Math.max(this.textureAtlas.width, this.textureAtlas.height);
            
            var x = targetX;
            var y = targetY;
            
            if (this.frameData.trimmed && this.maintainFrameOffset) 
            {
                // offset the image position according to source size, so that trimmed image still appears centered as it should
                x += this.frameData.spriteSourceSize.x;
                y += this.frameData.spriteSourceSize.y;
            }
            
            // On screen?
            if (x > ig.system.width || y > ig.system.height || x + bbsize < 0 || y + bbsize < 0) {
                return;
            }
            
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            
            var halfWidth = this.frameData.frame.w / 2;
            var halfHeight = this.frameData.frame.h / 2;
                 
            ig.system.context.save();
            ig.system.context.translate(
                ig.system.getDrawPos(x + halfWidth),
                ig.system.getDrawPos(y + halfHeight)
                );
            ig.system.context.rotate(this.angle);

            var scaleX = this.flip.x ? -1 : 1;
            var scaleY = this.flip.y ? -1 : 1;
            if (this.flip.x || this.flip.y) {
                ig.system.context.scale(scaleX, scaleY);
            }
                
            this.textureAtlas.image.draw(-halfWidth, -halfHeight, this.frameData.frame.x, this.frameData.frame.y, this.frameData.frame.w, this.frameData.frame.h);
            ig.system.context.restore();
            
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = 1;
            }
        }
    });
    
    
    /**
     * A TextureAtlasImage extends Impact's Image class to allow looking up an images data from the TexturePacker JSON array
     *
     * Author: dpweberza@gmail.com
     *
     * Version 0.1  - 2012/10/22
     *
     * Notes:
     */
    ig.TextureAtlasImage = ig.Image.extend({
        textureAtlas: null,
        frameData: 0,
        maintainFrameOffset: false,
        
        init: function(textureAtlas, frameName, maintainFrameOffset) {
            this.textureAtlas = textureAtlas;
            this.frameData = this.textureAtlas.getFrameData(frameName);
            if (maintainFrameOffset)
                this.maintainFrameOffset = maintainFrameOffset;
        },
        
        draw: function(targetX, targetY) {
            var x = targetX;
            var y = targetY;
            
            if (this.frameData.trimmed && this.maintainFrameOffset) 
            {
                // offset the image position according to source size, so that trimmed image still appears as it should
                x += this.frameData.spriteSourceSize.x;
                y += this.frameData.spriteSourceSize.y;
            }
            
            this.textureAtlas.image.draw(x, y, this.frameData.frame.x, this.frameData.frame.y, this.frameData.frame.w, this.frameData.frame.h);
        }
    });
	
    /**
     * A TextureAtlasFont extends Impact's Font class to allow looking up a font's bitmap from the TexturePacker JSON array
     *
     * Author: dpweberza@gmail.com
     *
     * Version 0.1  - 2013/02/19
     *
     * Notes:
     */
    ig.TextureAtlasFont = ig.Font.extend({
        textureAtlas: null,
        frameData: 0,
        maintainFrameOffset: false,
        
        init: function(textureAtlas, frameName, maintainFrameOffset) {
            this.textureAtlas = textureAtlas;
            this.frameData = this.textureAtlas.getFrameData(frameName);
            if (maintainFrameOffset)
                this.maintainFrameOffset = maintainFrameOffset;
            this._loadMetrics();
        },
	
        _drawChar: function( c, targetX, targetY ) {		
            var scale = ig.system.scale;
            var charX = this.indices[c] * scale;
            var charY = 0;
            var charWidth = this.widthMap[c] * scale;
            var charHeight = (this.height-2) * scale;		
			
            var x = ig.system.getDrawPos(targetX);
            var y = ig.system.getDrawPos(targetY);
            if (this.frameData.trimmed && this.maintainFrameOffset) 
            {
                // offset the image position according to source size, so that trimmed image still appears as it should
                x += this.frameData.spriteSourceSize.x;
                y += this.frameData.spriteSourceSize.y;
            }
            
            //console.log(charWidth + ' - ' + charHeight);
            this.textureAtlas.image.draw(x, y, this.frameData.frame.x + charX, this.frameData.frame.y + charY, charWidth, charHeight); // TODO - test and correct
            //this.textureAtlas.image.draw(x, y, this.frameData.frame.x, this.frameData.frame.y, this.frameData.frame.w, this.frameData.frame.h);
				
            return this.widthMap[c] + this.letterSpacing;
        },
        
        _loadMetrics: function() {
            // Draw the bottommost line of this font image into an offscreen canvas
            // and analyze it pixel by pixel.
            // A run of non-transparent pixels represents a character and its width
		
            this.height = this.frameData.frame.h -1;
            this.widthMap = [];
            this.indices = [];
		
            var canvas = ig.$new('canvas');
            canvas.width = this.frameData.frame.w;
            canvas.height = this.frameData.frame.h;
      
            var ctx = canvas.getContext('2d');
            ctx.drawImage( this.textureAtlas.image.data, this.frameData.frame.x, this.frameData.frame.y, this.frameData.frame.w, this.frameData.frame.h, 0, 0, this.frameData.frame.w, this.frameData.frame.h);
            var px = ctx.getImageData(0, this.frameData.frame.h-1, this.frameData.frame.w, 1);
		
            var currentChar = 0;
            var currentWidth = 0;
            for( var x = 0; x < this.frameData.frame.w; x++ ) {
                var index = x * 4 + 3; // alpha component of this pixel
                if( px.data[index] != 0 ) {
                    currentWidth++;
                }
                else if( px.data[index] == 0 && currentWidth ) {
                    this.widthMap.push( currentWidth );
                    this.indices.push( x-currentWidth );
                    currentChar++;
                    currentWidth = 0;
                }
            }
            this.widthMap.push( currentWidth );
            this.indices.push( x-currentWidth );
        }
    });

});