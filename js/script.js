function start() {

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='helicopter'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='helicopter'></div>");
	$("#fundoGame").append("<div id='inimigo2' ></div>");
	$("#fundoGame").append("<div id='amigo' class='human'></div>");
	

	var jogo = {}
	
	jogo.timer = setInterval(loop, 30);
	
	function loop() {
		movefundo();
		movejogador();
		moveinimigoHelicoptero();
		moveinimigo();
		moveHumano();
	} 
	
	/* Moving Background */
	function movefundo() {
		esquerda = parseInt($("#fundoGame").css("background-position"));
		$("#fundoGame").css("background-position", esquerda-2);
	}

	/* Player Config */
	var TECLA = {
		W: 87,
		S: 83,
		D: 68
	}
	
	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});


	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	function movejogador() {
	
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo-7);
			if (topo <= 0) {
				$("#jogador").css("top", topo+7);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo+7);
			if (topo >= 434) {	
				$("#jogador").css("top", topo-7);	
			}	
		}
		
		if (jogo.pressionou[TECLA.D]) {
			console.log('a')
		}
	}

	/* Enemy Config */
	var velocidade= 12;
	var posicaoY = parseInt(Math.random() * 334);

	function moveinimigoHelicoptero() {
		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left", posicaoX-velocidade);
		$("#inimigo1").css("top", posicaoY);

		if (posicaoX <= 0) {
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left", 694);
		$("#inimigo1").css("top", posicaoY);	
		}
	}

	function moveinimigo() {
        posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left", posicaoX-5);
				
		if (posicaoX <= 0) {	
			$("#inimigo2").css("left", 775);		
		}
	}

	/* Human Config */

	function moveHumano() {
	
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left", posicaoX+2);

		if (posicaoX > 906) {
			$("#amigo").css("left", 0);		
		}
	}

} 