/**
 * Simples simulador de uma lâmpada
 * @author Claudio Silva
 */

function quebrar() {
    document.getElementById('lamp').src="img/broken.jpg"
    // reproduzindo um arquivo de áudio no JS
    // passo 1: copiar o arquivo de áudio para o projeto
    // passo 2: usar a classe áudio (biblioteca interna do JS)
    let som = new Audio()
    som.src="sound/glassbreaking.wav"
    som.play()
}