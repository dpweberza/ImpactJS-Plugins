ig.module(
    'plugins.packed-textures'
    )
.requires(
    )
.defines(function(){
    "use strict";

    // This module holds our TexturePacker exported JSON arrays
    ig.PackedTextures = ig.Class.extend({
        spacepods: {
            "frames": [


            {
                "filename": "EscapePodFemale 1.png",
                "frame": {
                    "x":2,
                    "y":2,
                    "w":250,
                    "h":250
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x":0,
                    "y":0,
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
                "frame": {
                    "x":254,
                    "y":2,
                    "w":250,
                    "h":250
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x":0,
                    "y":0,
                    "w":250,
                    "h":250
                },
                "sourceSize": {
                    "w":250,
                    "h":250
                }
            },
            {
                "filename": "EscapePodMale 1.png",
                "frame": {
                    "x":2,
                    "y":254,
                    "w":250,
                    "h":250
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x":0,
                    "y":0,
                    "w":250,
                    "h":250
                },
                "sourceSize": {
                    "w":250,
                    "h":250
                }
            },
            {
                "filename": "EscapePodMale 2.png",
                "frame": {
                    "x":254,
                    "y":254,
                    "w":250,
                    "h":250
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x":0,
                    "y":0,
                    "w":250,
                    "h":250
                },
                "sourceSize": {
                    "w":250,
                    "h":250
                }
            }],
            "meta": {
                "app": "http://www.texturepacker.com",
                "version": "1.0",
                "image": "space_pods_array.png",
                "format": "RGBA8888",
                "size": {
                    "w":512,
                    "h":512
                },
                "scale": "1",
                "smartupdate": "$TexturePacker:SmartUpdate:a46ef0d9504271481f07c238e925b191$"
            }
        }


    });

});