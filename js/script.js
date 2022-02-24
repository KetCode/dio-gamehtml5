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
		$("#fundoGame").css("background-position", esquerda - 2);
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
			$("#jogador").css("top", topo - 7);
			if (topo <= 0) {
				$("#jogador").css("top", topo + 7);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo + 7);
			if (topo >= 434) {	
				$("#jogador").css("top", topo - 7);	
			}	
		}
		
		if (jogo.pressionou[TECLA.D]) {
			disparo();
		}
	}

	/* Enemy Config */
	var velocidade = 12;
	var posicaoY = parseInt(Math.random() * 334); // calcula posição top random no eixo y

	function moveinimigoHelicoptero() {
		posicaoX = parseInt($("#inimigo1").css("left")); // inicia o sprite no lado esquerdo
		$("#inimigo1").css("left", posicaoX - velocidade); // velocidade do helicoptero inimigo
		$("#inimigo1").css("top", posicaoY); // realiza o loop quando o helicoptero nasce dnv (acho que não ta sendo necessário essa linha)

		if (posicaoX <= 0) { // posição ao chegar no lado esquerdo	
			posicaoY = parseInt(Math.random() * 334); // calcula posição top random no eixo y quando começa o loop
			$("#inimigo1").css("left", 694); // volta para a posição inicial no lado direito
			$("#inimigo1").css("top", posicaoY); // realiza o loop quando o helicoptero nasce dnv 	
		}
	}

	function moveinimigo() {
        posicaoX = parseInt($("#inimigo2").css("left")); // inicia o sprite no lado esquerdo
		$("#inimigo2").css("left", posicaoX - 5); // velocidade do carro
				
		if (posicaoX <= 0) { // posição ao chegar no lado esquerdo	
			$("#inimigo2").css("left", 775); // volta para a posição inicial no lado direito		
		}
	}

	/* Human Config */
	function moveHumano() {
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left", posicaoX + 2); // velocidade do personagem

		if (posicaoX > 906) { // distancia max para o loop
			$("#amigo").css("left", 0);	// volta para a distância inicial	
		}
	}

	/* Player's shoot */
	var podeAtirar = true;

	function disparo() {
	
		if (podeAtirar == true) {
			podeAtirar = false; // não pode realizar o tiro enquanto a função do tiro ainda está rodando
			topo = parseInt($("#jogador").css("top"))
			posicaoX = parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 190; // posição x do tiro
			topoTiro = topo + 42; // posição y do tiro
			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("top", topoTiro);
			$("#disparo").css("left", tiroX);
			var tempoDisparo = window.setInterval(executaDisparo, 30); // velocidade do disparo sem sair da caixa do jogo, só diminuir q aumenta a velocidade.
		}
	 
		function executaDisparo() {
			posicaoX = parseInt($("#disparo").css("left"));
			$("#disparo").css("left", posicaoX + 15); // velocidade do disparo, porém sai da caixa do jogo.
	
			if (posicaoX > 900) {	
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				podeAtirar = true; // agora pode realizar outro disparo
			}
		}
	}
} 