/**
 * @author David Weber
 * @version 0.1
 * @licence opensource
 * URL: http://dpweberza.tumblr.com/
 */
ig.module(
    'game.entities.retrohighscorenamefield' 
    )
.requires(
    'impact.entity'
    )
.defines(function(){
    EntityRetroHighsSoreNameField= ig.Entity.extend({
        // Font settings
        fontNormal: null,
        fontHighlighted: null,
        letterSpacing: 20,
        // List of symbols
        symbols: ['_', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        // Name settings
        numberOfChars: 3,
        highlightedChar: 0,
        name: [],
        init: function( x, y, settings) {
            this.parent( x, y, settings);
            
            // Validate settings
            if (this.fontNormal == null)
                throw "fontNormal is required!";
            if (this.fontHighlighted == null)
                throw "fontHighlighted is required!";
            if (this.numberOfChars < 1)
                throw "numberOfChars must be atleast 1!";
            
            // Bind keys to switch between characters
            ig.input.bind( ig.KEY.LEFT_ARROW, 'prev_char' );
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'next_char' );
            
            // Bind keys to switch between symbols
            ig.input.bind( ig.KEY.DOWN_ARROW, 'prev_symbol' );
            ig.input.bind( ig.KEY.UP_ARROW, 'next_symbol' );
            
            // Init name character array
            this.name = [];
            for (var i = 0; i < this.numberOfChars; i++)
            {
                this.name.push({
                    symbol: 1
                });
            }
        },
        update: function()
        {
            // Switch between chars
            if ( ig.input.pressed('prev_char') && this.highlightedChar > 0) {
                this.highlightedChar--;
            }
            else if ( ig.input.pressed('next_char') && this.highlightedChar < this.numberOfChars - 1) {
                this.highlightedChar++;
            }
            
            // Switch between symbols
            if ( ig.input.pressed('prev_symbol') && this.name[this.highlightedChar].symbol > 0) {
                this.name[this.highlightedChar].symbol--;
            }
            else if ( ig.input.pressed('next_symbol') && this.name[this.highlightedChar].symbol < this.symbols.length -  1) {
                this.name[this.highlightedChar].symbol++;
            }
            
            this.parent();
        },
        draw: function() {
            this.parent();
            
            // Draw each char
            for (var i = 0; i < this.numberOfChars; i++)
            {
                this.drawCharacter( i, this.pos.x + (this.letterSpacing * i), this.pos.y );
            }
        },
        drawCharacter: function(index, x, y) {
            var symbol = this.symbols[this.name[index].symbol];
            
            // Draw a character highlighted or normal
            if (index == this.highlightedChar)
                this.fontHighlighted.draw( symbol, x, y, ig.Font.ALIGN.CENTER );
            else
                this.fontNormal.draw( symbol, x, y, ig.Font.ALIGN.CENTER );
        },
        getName: function(){
            var name = '';
            for (var i = 0; i < this.numberOfChars; i++)
            {
                name += this.symbols[this.name[i].symbol];
            }
            return name;
        }
    });
});