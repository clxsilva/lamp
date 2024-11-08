/**
 * Simples simulador de uma lâmpada
 * @author Claudio Silva
 */

// variáveis de apoio da lógica
let onoff = false // o interruptor inicia desligado
let lampada = true // a lampada está normal

function quebrar() {
    if (lampada === true) {
        // reproduzindo um arquivo de áudio no JS
        // passo 1: copiar o arquivo de áudio para o projeto
        // passo 2: usar a classe áudio (biblioteca interna do JS)
        let som = new Audio()
        som.src = "sound/glassbreaking.wav"
        som.play()
        document.getElementById('lamp').src = "img/broken.jpg"
        // apoio à lógica para o JS identificar a lâmpada quebrada
        lampada = false
    }
}

function chave() {
    if (onoff === false && lampada === true) {
        document.getElementById('interruptor').src = "img/swon.png"
        onoff = true // o JS agora sabe que a chave está ligada
        document.getElementById('lamp').src = "img/on.jpg"
    } else if (lampada === true) {
        document.getElementById('interruptor').src = "img/swoff.png"
        onoff = false
        document.getElementById('lamp').src = "img/off.jpg"
    } 
}
