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

<pre><code>this.retroNameField.getName()</code></pre>