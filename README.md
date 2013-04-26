<h1><a href="http://impactjs.com">ImpactJS</a> - Plugins</h1>

<h3>NOTICE: Unfortunately I will no longer be maintaining any ImpactJS plugins.</h3>
This means no bug fixes, pull request merging or support.

<h3>Retro High Score Name Field</h3>
<a href="http://www.pointofimpactjs.com/plugins/view/35/retro-high-score-name-field">Plugin Home</a>

<p>This plugin allows you to add a retro style high score name text field to your game. The player uses his / her keyboard to switch each character to the desired letter of the alphabet to make up his / her name.</p>

<p><strong>Usage is really simple:</strong></p>

<p>Include the entity in your module requires: 'game.entities.retrohighscorenamefield'</p>

<p>In your games init function spawn an instance of the entity by passing in two different fonts and the number of characters you need and then save the object returned so that you can ask it for the name later.</p>

<pre>
	<code>
	this.retroNameField = ig.game.spawnEntity(EntityRetroHighsSoreNameField, x, y, {
		fontNormal: this.fontNormal,
		fontHighlighted: this.fontHighlighted,
		numberOfChars: 3, // Optional, defaults to 3
		letterSpacing: 20 // Optional, defaults to 20
	});
	</code>
</pre>

<p>To get the name after saying the Enter key was pressed simply call getName()</p>

<pre>
	<code>this.retroNameField.getName()</code>
</pre>

<hr />

<h3>TextureAtlas, TextureAtlasAnimation and TextureAtlasImage</h3>
<p>This plugin allows you to create a TextureAtlas from <a target="_blank" href="http://www.codeandweb.com/texturepacker">TexturePacker</a> or <a href="http://renderhjs.net/shoebox/">ShoeBox</a> output and then create animation objects by referring to frames of different sizes by name.</p>
<p>A demo has been included for your convenience, just copy in your impact folder</p>
<p><strong>Usage is really simple:</strong></p>

<ol>
	<li>Add all the images you need to TexturePacker and then publish your atlas image, making sure to select JSON-ARRAY as the data format.</li>
	<li>Assign the JSON array from TexturePacker to a varaiable in packed-textures.js
	<pre><code>
	// This module holds our TexturePacker exported JSON arrays
	ig.PackedTextures = ig.Class.extend({
		spacepods: {
			"frames": [
			{
				....
			}],
			"meta": {
			   ....
			}
		}
	});
	</code></pre>
	</li>
	<li>Include the plugin and your packed texure data in your main.js requires()
	<pre><code>
	ig.module( 
		'game.main' 
	)
	.requires(
		'impact.game',
		'plugins.texture-atlas', // Include the plugin
		'plugins.packed-textures', // Include the TexturePacker JSON array for the texture atlas
		'game.entities.pod'
	)
	</code></pre>
	</li>
	<li>Create a TextureAtlas object in your main.js
	<pre><code>
	MyGame = ig.Game.extend({
		textureAtlas: null,
		textureImage: new ig.Image('media/space_pods_array.png'),
		pod: null,

		init: function() {
			this.textureAtlas = new ig.TextureAtlas(this.textureImage, new ig.PackedTextures().spacepods); // Create the texture atlas
			this.pod = ig.game.spawnEntity(EntityPod, 0, 0);
		}
	});
	</code></pre>
	</li>
	<li>Lastly add an animation to your entity using the texture atlas
	<pre><code>
	EntityPod = ig.Entity.extend({
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			// Entity addTextureAtlasAnim: function(textureAtlas, name, frameTime, sequence, stop, maintainFrameOffset)
			this.addTextureAtlasAnim( ig.game.textureAtlas, 'idle', 1, ['EscapePodFemale 1.png', 'EscapePodFemale 2.png'], false); // Add texture atlas animation
		}
	});
	</code></pre>
	</li>
	<li>Or if you just need a static image to your entity using the texture atlas
	<pre><code>
	EntityButton = ig.Entity.extend({
		backgroundImage: null,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			// TextureAtlasImage init: function(textureAtlas, frameName, maintainFrameOffset)
			this.backgroundImage = new ig.TextureAtlasImage(ig.game.textureAtlas, 'ButtonBg.png', true);
		}
	});
	</code></pre>
	</li>
        <li>Or if you want to load a font using the texture atlas
	<pre><code>
	this.font = new ig.TextureAtlasFont(ig.game.textureAtlas, '04b03.font.png', true);
	</code></pre>
	</li>
	<li>If you're using ShoeBox which is awesome and free, then you will want to update your export settings
	<pre><code>
	outer: 		{"frames": [\n@loop]\n,"meta": {\n\t"app": "ShoeBox",\n\t"size": {"w":@W,"h":@H}\n}\n}
	format:		\t{\n\t\t"filename": "@id", "rotated": false,"trimmed": true,\n\t\t"frame": {"x":@x,"y":@y,"w":@w,"h":@h},\n\t\t"spriteSourceSize": {"x":@fx,"y":@fy,"w":@fw,"h":@fh},\n\t\t"sourceSize": {"w":@fw,"h":@fh}\n\t},\n
	</code></pre>
	</li>
</ol>
