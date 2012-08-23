<h1><a href="http://impactjs.com">ImpactJS</a> - Plugins</h1>

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

<h3>TextureAtlas and TextureAtlasAnimation</h3>
<p>This plugin allows you to create a TextureAtlas from <a target="_blank" href="http://www.codeandweb.com/texturepacker">TexturePacker</a> output and then create animation objects by referring to frames of different sizes by name.</p>
<p>A demo has been included for your convenience, just copy in your impact folder</p>
<p><strong>Warning:</strong> I still need to implement drawing when the animation is angled. Coming soon...</p>
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
		pod: null,

		init: function() {
			this.textureAtlas = new ig.TextureAtlas('media/space_pods_array.png', new ig.PackedTextures().spacepods); // Create the texture atlas
			this.pod = ig.game.spawnEntity(EntityPod, 0, 0);
		}
	});
	</code></pre>
	</li>
	<li>Lastly add a animation to your entity using the texture atlas
	<pre><code>
	EntityPod = ig.Entity.extend({
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addTextureAtlasAnim( ig.game.textureAtlas, 'idle', 1, ['EscapePodFemale 1.png', 'EscapePodFemale 2.png'], false); // Add texture atlas animation
		}
	});
	</code></pre>
	</li>
</ol>