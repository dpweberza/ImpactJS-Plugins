This plugin allows you to add a retro style high score name text field to your game. The player uses his / her keyboard to switch each character to the desired letter of the alphabet to make up his / her name.

Usage is really simple:

Include the entity in your module requires: 'game.entities.retrohighscorenamefield'

In your games init function spawn an instance of the entity by passing in two different fonts and the number of characters you need and then save the object returned so that you can ask it for the name later.

this.retroNameField = ig.game.spawnEntity(EntityRetroHighsSoreNameField, x, y, {
fontNormal: this.fontNormal,
fontHighlighted: this.fontHighlighted,
numberOfChars: 3, // Optional, defaults to 3
letterSpacing: 20 // Optional, defaults to 20
});

To get the name after saying the Enter key was pressed simply call getName()

this.retroNameField.getName()