function start() {

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='helicopter'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='helicopter'></div>");
	$("#fundoGame").append("<div id='inimigo2' ></div>");
	$("#fundoGame").append("<div id='amigo' class='human'></div>");
	$("#fundoGame").append("<div id='placar'></div>");

	var jogo = {}
	var fimdejogo = false;	
	
	jogo.timer = setInterval(loop, 30);
	
	function loop() {
		movefundo();
		movejogador();
		moveinimigoHelicoptero();
		moveinimigo();
		moveHumano();
		colisao();
		placar();
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

	/* Player's colision */
	function colisao() {
		var colisao1 = ($("#jogador").collision($("#inimigo1"))); // colisão do jogador com o helicopter, trocar a função colision para calcular a posição do player e inimigo para aproximar mais a colisão
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));
		
		/* Jogador - inimigo1 (helicoptero) */
		if (colisao1.length > 0) {
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao(inimigo1X, inimigo1Y);

			posicaoY = parseInt(Math.random() * 334); // quando acontece a colisão o helicoptero inimigo se reposicionano eixo y e volta para posição inicial no eixo x
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoY);
		}

		/* Jogador - inimigo2 (caminhão) */
		if (colisao2.length > 0) {
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao(inimigo2X, inimigo2Y);

			$("#inimigo2").remove();
			reposicionaCaminhao();	
		}

		/* Jogador - inimigo1 (helicoptero) acerto do tiro */
		if (colisao3.length > 0) {
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));	
			explosao(inimigo1X, inimigo1Y);
			$("#disparo").css("left", 950); // reposiciona o tiro, some quando bate no inimigo, se diminuir o tiro continua sendo renderizado no jogo, n pode ser menor que 900
				
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);

			pontos = pontos + 100;
		}

		/* Jogador - inimigo2 (caminhão) acerto do tiro */
		if (colisao4.length > 0) {
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#inimigo2").remove();
			explosao(inimigo2X, inimigo2Y);
			$("#disparo").css("left", 950);
			
			reposicionaCaminhao();
			pontos = pontos + 50;
		}

		/* Jogador - humano */
		if (colisao5.length > 0) {
			reposicionaHumano();
			$("#amigo").remove();
			salvos++;
		}

		/* Inimigo2 (caminhão) - humano */
		if (colisao6.length > 0) {
			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosaoHumano(amigoX, amigoY);
			$("#amigo").remove();
					
			reposicionaHumano();
			perdidos++;			
		}
	}

	function explosao(inimigoX, inimigoY) {
		$("#fundoGame").append("<div id='explosao'></div");
		$("#explosao").css("background-image", "url(imgs/explosao.png)");

		var div = $("#explosao");

		div.css("top", inimigoY); // indica onde a explosão vai aparecer
		div.css("left", inimigoX);
		div.animate({width: 200, opacity: 0}, "slow"); //vai ter uma animação da explosão crecendo (width) e sumindo aos poucos (opacity), com a animação lenta (slow)
		
		var tempoExplosao = window.setInterval(removeExplosao, 1000); // remove a animação de explosão em 1s
		
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}	
	}

	function reposicionaCaminhao() {
		var tempoColisao = window.setInterval(reposiciona, 5000);

		function reposiciona() {
			window.clearInterval(tempoColisao);
			tempoColisao = null;

			if (fimdejogo == false) {
				$("#fundoGame").append("<div id=inimigo2></div");
			}
		}	
	}

	function reposicionaHumano() {
		var tempoHumano = window.setInterval(reposiciona, 6000);
		
		function reposiciona() {
			window.clearInterval(tempoHumano);
			tempoHumano = null;
		
			if (fimdejogo == false) {
				$("#fundoGame").append("<div id='amigo' class='human'></div>");
			}
		}
	}

	function explosaoHumano(amigoX, amigoY) {
		$("#fundoGame").append("<div id='explosaoHumano' class='humanDead'></div");
		$("#explosaoHumano").css("top", amigoY);
		$("#explosaoHumano").css("left", amigoX);

		var tempoExplosao = window.setInterval(resetaExplosao, 1000);
		
		function resetaExplosao() {
			$("#explosaoHumano").remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;		
		}	
	}

	/* Placar */
	var pontos = 0;
	var salvos = 0;
	var perdidos = 0;

	function placar() {
		$("#placar").html("<h2 id='pontuação'> Pontos: " + pontos + "<br> Salvos: " + salvos + " <br> Perdidos: " + perdidos + "</h2>");	
	}
} 