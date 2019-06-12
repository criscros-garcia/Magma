var isSpare=false;
var isStrike=false;
var isNestedStrike = false;
var games = [];
var Tscore = 0;
 

function tiro(resultT1=0){
	//primer tiro genera un aleatorio de 0 - 10
	//segundo tiro genera aleatorio con pinos restantes
	return Math.floor((Math.random() * (10-resultT1)) + 1);	
}

//CICLO QUE HARÁ LOS 10 FRAMES(GAMES).

for(var i=0; i<10;i++){	
	var tiro1 = tiro();
	var tiro2 = null;
	var tiroExtra=0;
//creamos cada frame	
	games.push({
	shoot1: null,
	shoot2: null,
	bonus: 0,
	Pscore: null
});
	
//si es el último frame y isSpare or isStrike gana tiro extra
	if((i==9) && (tiro1==10)){
		tiroExtra=tiro();
		games[i].Pscore+=tiroExtra;
	}
	
	games[i].shoot1 = tiro1;	
	
	if(isSpare){
		games[i-1].bonus = tiro1;
		games[i-1].Pscore+= games[i-1].bonus; 
		console.log("-----SPARE-----");
		console.log("tiro1: "+games[i-1].shoot1);
		console.log("tiro2: "+games[i-1].shoot2);
		console.log(games[i-1].Pscore);
		
	}
	
	if(isStrike){
		games[i-1].bonus = tiro1;
		
	}
	
	if(isNestedStrike){
		games[i-2].bonus += games[i].shoot1;
		games[i-1].Pscore+=games[i].bonus ;
			console.log("----------STRIKE--------");
			console.log("tiro 1: "+games[i-1].shoot1);
			console.log("tiro 2: "+games[i-1].shoot2);
			console.log(games[i-1].Pscore);
			
		}
	
	if (tiro1==10){				
		isSpare = false;
		isNestedStrike = (isStrike) ? true:false; 
		isStrike = true;		 
		
	 	games[i].shoot2 = 0;
		games[i].Pscore = games[i].shoot1;
		
	}else{		
		tiro2 = tiro(tiro1);		
		games[i].shoot2 = tiro2;
		
		
		if(isStrike){
			games[i-1].bonus+= tiro2;
			games[i-1].Pscore+=games[i-1].bonus ;
			console.log("----------STRIKE--------");
			console.log("tiro 1: "+games[i-1].shoot1);
			console.log("tiro 2: "+games[i-1].shoot2);
			console.log(games[i-1].Pscore);
			
		}
		
		isStrike = false;
		
		//CHECAMOS SI ES SPARE
		if((tiro1+tiro2) === 10){
			isSpare=true;
			games[i].Pscore = tiro1+tiro2;
				//SI ES EL ULTIMO FRAME Y HACE SPARE ==>TIRO EXTRA
				if(i==9){
				console.log("----TIRO EXTRA-----");
				tiroExtra=tiro();
				games[i].Pscore+=tiroExtra;
				}
			
		}else{
			isSpare=false;
			games[i].Pscore = tiro1+tiro2;
			console.log("---FRAME "+ i +"---------");
			console.log("tiro1: "+tiro1);
			console.log("tiro2: "+tiro2);
			console.log(games[i].Pscore);
			
		}
	}
}
	console.table(games);

games.forEach(function(juego){
Tscore+=juego.Pscore;
});

console.log("PUNTAJE FINAL: "+ Tscore);
