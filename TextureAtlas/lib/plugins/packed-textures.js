ig.module(
    'plugins.packed-textures'
    )
.requires(
    )
.defines(function(){
    "use strict";

    // This module holds our TexturePacker exported JSON arrays
    ig.PackedTextures = ig.Class.extend({
        sprites: {
            "frames": [
            {
                "filename": "04b03.font.png", 
                "rotated": false,
                "trimmed": true,
                "frame": {
                    "x":0,
                    "y":0,
                    "w":422,
                    "h":9
                },
                "spriteSourceSize": {
                    "x":0,
                    "y":0,
                    "w":422,
                    "h":9
                },
                "sourceSize": {
                    "w":422,
                    "h":9
                }
            },
            {
                "filename": "EscapePodFemale 1.png", 
                "rotated": false,
                "trimmed": true,
                "frame": {
                    "x":0,
                    "y":9,
                    "w":92,
                    "h":111
                },
                "spriteSourceSize": {
                    "x":79,
                    "y":71,
                    "w":250,
                    "h":250
                },
                "sourceSize": {
                    "w":250,
                    "h":250
                }
            },
            {
                "filename": "EscapePodFemale 2.png", 
                "rotated": false,
                "trimmed": true,
                "frame": {
                    "x":92,
                    "y":9,
                    "w":92,
                    "h":111
                },
                "spriteSourceSize": {
                    "x":79,
                    "y":71,
                    "w":250,
                    "h":250
                },
                "sourceSize": {
                    "w":250,
                    "h":250
                }
            },
            ]
            ,
            "meta": {
                "app": "ShoeBox",
                "size": {
                    "w":512,
                    "h":512
                }
            }
        }
    });
});