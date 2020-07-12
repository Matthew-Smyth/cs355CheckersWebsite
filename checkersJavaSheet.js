//Variable turn is 1 for red and 2

function returnNeighbors(p)
{
	var parentBox = p.parentElement;
	var boxNum = parentBox.id;
	var potenOne = null;
	var potenTwo = null;
	var pieceColor = null;
	boxNum = boxNum.slice(3,boxNum.length);
	boxNum = parseInt(boxNum);
	if((boxNum+1)%8==0)
	{
		if(p.className=="redPiece")
			pieceColor = 7;
		if(p.className=="blackPiece")
			pieceColor = -9;
		potenOne = boxNum + pieceColor;
	}
	else if(boxNum==0 || boxNum%8==0)
	{
		if(parentBox.className=="redPiece")
			pieceColor = 9;
		if(p.className=="blackPiece")
			pieceColor = -7;
		potenTwo = boxNum + pieceColor;
	}
	else
	{
		if(p.className=="redPiece")
			pieceColor = 1;
		if(p.className=="blackPiece")
			pieceColor = -1;
		potenOne = boxNum + (7 * pieceColor);
		potenTwo = boxNum + (9 * pieceColor);
	}
	if(potenOne<63 && potenOne>0 && potenTwo<63 && potenTwo>0)
		return [potenOne, potenTwo];
	else if(potenOne<63 && potenOne>0)
		return [potenOne, null];
	else
		return [null, potenTwo];
}
function findMin(a,b,c)
{
	if(a!=null && a<c-8)
		return a;
	if(b!=null && b<c-8)
		return b;
	return null;
}

function findMax(a,b,c)


{
	if(a!=null && a>c-8)
		return a;
	if(b!=null && b>c-8)
		return b;
	return null;
}

//currently working on this function
function returnJumpers(pID)
{
	var jumpers = {};
	var newNeighbors;
	var root = document.getElementById("peice"+pID);
	var neighbors = returnNeighbors(root);
	var idNum = root.parentElement.id.slice(3,root.parentElement.id.length)
	var smallNeighbor = findMin(neighbors[0],neighbors[1],idNum);
	var bigNeighbor = findMax(neighbors[0],neighbors[1],idNum);
	if(smallNeighbor!=null && document.getElementById("box" + smallNeighbor).childElementCount!=0 && document.getElementById("box" + smallNeighbor).lastElementChild.className!=root.className)
	{
		newNeighbors = returnNeighbors(document.getElementById("box" + smallNeighbor).lastChild);
		var smallestNeighbor = findMin(newNeighbors[0],newNeighbors[1],smallNeighbor);
		if(smallestNeighbor!=null && document.getElementById("box" + smallestNeighbor).childElementCount==0)
		{
			jumpers+=[root,smallNeighbor, smallestNeighbor];
		}
	}
	if(bigNeighbor!=null && document.getElementById("box" + bigNeighbor).childElementCount!=0 && document.getElementById("box" + bigNeighbor).lastElementChild.className!=root.className)
	{
		newNeighbors = returnNeighbors(document.getElementById("box" + bigNeighbor).lastChild);
		var biggestNeighbor = findMax(newNeighbors[0],newNeighbors[1],bigNeighbor);
		if(biggestNeighbor!=null && document.getElementById("box" + biggestNeighbor).childElementCount==0)
		{
			jumpers+=[root, bigNeighbor, biggestNeighbor];
		}
	}
	return jumpers;
}
//currently working on this function
function checkJump(turn)
{
	var setOfPieces = null;
	var jumpPath = [];
	if(turn==1)
		setOfPieces = 0;
	else
		setOfPieces = 12
	for(var i=setOfPieces; i<setOfPieces+12; i++)
	{
		jumpPath = returnJumpers(i);
	}
}
function checkBox(p)
{
	var midpointX = ((p.getBoundingClientRect().width)/2)+p.getBoundingClientRect().left;
	var midpointY = ((p.getBoundingClientRect().height)/2)+p.getBoundingClientRect().top;
	for(var i=0; i<64; i++)
	{
		var bx = document.getElementById("box" + i.toString());
		if(bx.className!="red" && midpointX<bx.getBoundingClientRect().right && midpointX > bx.getBoundingClientRect().left && midpointY > bx.getBoundingClientRect().top && midpointY < bx.getBoundingClientRect().bottom && bx.childElementCount==0)
		{
			var idNum= p.parentElement.id.slice(3,p.parentElement.id.length)
			if((i > idNum)&&(p.className=="redPiece"))
			{
				return bx;
			}
			else if((i < idNum)&&(p.className=="blackPiece"))
				return bx;
		}
	}
	return null;
}
function highlightBox(pOne, highlightedBoxes)
{
	var pBoth = returnNeighbors(pOne);
	var potenOne = pBoth[0];
	var potenTwo = pBoth[1];
	var newBox = null;
	if(potenOne!=null)
	{
		newBox = document.getElementById("box" + potenOne.toString());
		if(newBox.childElementCount==0)
		{
			newBox.style.backgroundImage =  "URL('highlightBack.jpg')";
			highlightedBoxes[0] = potenOne;
		}
	}
	if(potenTwo!=null)
	{
		newBox = document.getElementById("box" + potenTwo.toString());
		if(newBox.childElementCount==0)
		{
			newBox.style.backgroundImage =  "URL('highlightBack.jpg')";
			highlightedBoxes[1] = potenTwo;
		}
	}
}
function unHighlight(highlightedBoxes)
{
	if(highlightedBoxes[0]!=null)
	{
		var firstBox = document.getElementById("box"+highlightedBoxes[0]);
		firstBox.style.backgroundImage = "URL('blackBack.jpg')";
	}
	if(highlightedBoxes[1]!=null)
	{
		var secondBox = document.getElementById("box"+highlightedBoxes[1]);
		secondBox.style.backgroundImage = "URL('blackBack.jpg')";
	}
	highlightedBoxes = [null, null];
}
function makeBoard()
{
	var checkersBoard = document.getElementById("board");
	var size = parseInt(document.getElementById("boardscript").getAttribute("data-name"));
	var row = 1;
	checkersBoard.add
	checkersBoard.style.height = size+"px";
	checkersBoard.style.width = size+"px";
	var highlightedBoxes = [null,null];
	for(var i=0; i<64; i++)
	{
		var box = document.createElement("div");
		var piece = document.createElement("div");
		var leftval = 0;
		var topval = 0;
		piece.style.width = piece.style.height = size*.125 + "px";
		piece.id = "piece" + i;
		
		box.id = "box" + i.toString();
		
		if(i+1<25 && i>0)
		{					
			piece.className = "redPiece";
		}
		
		if(i+1<64 && i>39)
		{
			piece.className = "blackPiece";
		}
		
		piece.style.backgroundSize = "100%";
		
		if(row%2==0)																																								
		{
			if((i+2)%2==0)
			{
				box.className = "black";
				checkersBoard.appendChild(box);
				
				if(i+1<25 && i>0 || i+1<64 && i>39)
				{
					
					leftval = box.getBoundingClientRect().left;
					piece.style.left = leftval + "px";
					topval = box.getBoundingClientRect().top;
					piece.style.top = topval + "px";
					box.appendChild(piece);
					
				}
				
			}
			else
			{
				box.className = "red";
				checkersBoard.appendChild(box);
			}
			
		}
		else 
		{
			if((i+2)%2==0)
			{
				box.className = "red";
				checkersBoard.appendChild(box);
			}
			else
			{
				box.className = "black";
				checkersBoard.appendChild(box);
				if(i+1<25 && i>0 || i+1<64 && i>39)
				{
					leftval = box.getBoundingClientRect().left;
					piece.style.left = leftval + "px";
					topval = box.getBoundingClientRect().top;
					piece.style.top = topval + "px";
					box.appendChild(piece);
				}
				
			}
		}

		if((i+1)%8==0)
			row++;
		
		piece.onmousedown = function(event) 
		{
			var pieceUsed = event.target;
			pieceUsed.style.zIndex = 10;
			highlightBox(pieceUsed, highlightedBoxes);
			document.addEventListener("mousemove", moveDiv); 
			
			function moveDiv(e)
			{
				pieceUsed.style.left = e.pageX - pieceUsed.offsetWidth / 2 + "px";
				pieceUsed.style.top = e.pageY - pieceUsed.offsetHeight / 2 + "px";
			}

			pieceUsed.onmouseup = function()
			{
				unHighlight(highlightedBoxes);
				document.removeEventListener("mousemove", moveDiv);
				pieceUsed.style.zIndex = 2;
				var boxIn = checkBox(pieceUsed);
				if(boxIn!=null)
				{
					pieceUsed.style.left = boxIn.getBoundingClientRect().left + "px";
					pieceUsed.style.top = boxIn.getBoundingClientRect().top + "px";
					pieceUsed.parentElement.lastChild = null;
					boxIn.appendChild(pieceUsed);
				}
				else
				{
					pieceUsed.style.left = pieceUsed.parentElement.getBoundingClientRect().left + "px";
					pieceUsed.style.top = pieceUsed.parentElement.getBoundingClientRect().top + "px";
				}
				checkJump(1);
				pieceUsed.onmouseup = null;
			};
			pieceUsed.ondragstart = function() {
			return false;
			};
		};
	}
}