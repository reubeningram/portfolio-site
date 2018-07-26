// Select color input
// Select size input
// When size is submitted by the user, call makeGrid()

	function makeGrid() {

		//clears previous grid
		 $("tr").remove();

		let width = document.getElementById("input_width").value;
		let height = document.getElementById("input_height").value;

			
			for(let row=0; row < height; row++) {
		  
				$("#pixel_canvas").append('<tr></tr>');
				
				for(let column=0; column < width; column++) {
					$("tr").last().append('<td onclick="setColor()"></td>');		 
					
				}//end column		 			
			}//end row	
	}//end makeGrid


	 
	function setColor() {
		
		let selectedColor = document.getElementById("colorPicker").value;
		
		$("td").click(function(){
			$(this).css({"background-color": selectedColor});
		});		
		
	}//end setColor



	 
	 
			

	 


