/**
 * Simples simulador de uma lâmpada
 * @author Claudio Silva
 */

// variáveis de apoio da lógica
let onoff = false // o interruptor inicia desligado
let lampada = true // a lampada está ok

// pré carregamento do arquivo de áudio
let som = new Audio("sound/breaking-glass.mp3")

// lanterna (pré carregamento)
// lanterna (pré carregamento)
let stream, track // variáveis de apoio
inicializarLanterna()

function quebrar() {
    if (lampada === true) {
        document.getElementById('lamp').src = "img/broken.jpg"
        // reproduzindo um arquivo de áudio no JS
        // passo 1: copiar o arquivo de áudio para o projeto
        // passo 2: usar a classe áudio (biblioteca interna do JS)
        // passo 3: pré carregar o arquivo de áudio para sincronizar com a troca de imagem (experiência do usuário)
        som.play()
        // apoio à lógica para o JS identificar a lâmpada quebrada
        lampada = false
    }
}

function chave() {
    if (onoff === false) {
        // ligar a chave
        document.getElementById('interruptor').src = "img/swon.png"
        onoff = true // o JS agora sabe que a chave está ligada
        // verificar se a lâmpada está intacta antes de acender
        if (lampada === true) {
            document.getElementById('lamp').src = "img/on.jpg"
        }
    } else {
        document.getElementById('interruptor').src = "img/swoff.png"
        onoff = false
        // verificar se a lâmpada está intacta antes de apagar
        if (lampada === true) {
            document.getElementById('lamp').src = "img/off.jpg"
        } 
    }
}


// estudo de eventos relacionados a click do mouse (pressionado ou não pressionado) e telas touch
// passo 1: capturar os elementos do html (DOM)
const botao = document.getElementById('button')
const lampadaImg = document.getElementById('lamp')

// passo 2: manipular o evento mouse pressionado
// addEventListener ("escuta de eventos em tempo real")
// mousedown (mouse pressionado constantemente)
// mouseup (soltar o botão do mouse)
// touchstart (pressionar a tela)
// touchend (deixar de pressionar)

// pressionar o botão do mouse e manter
botao.addEventListener('mousedown', (event) => {
    event.preventDefault() // ignorar o comportamento padrão
    // console.log("botão do mouse pressionado")
    // se a lâmpada estiver intacta e o interruptor principal estiver desligado
    if (lampada === true && onoff === false) {
        lampadaImg.src = "img/on.jpg" // trocar imagem
    }
})

// soltar o botão do mouse
botao.addEventListener('mouseup', (event) => {
    event.preventDefault() // ignorar o comportamento padrão
    // console.log("botão do mouse solto")
    if (lampada === true && onoff === false) {
        lampadaImg.src = "img/off.jpg" // trocar imagem
    }
})

// pressionar a tela touch e manter
botao.addEventListener('touchstart', (event) => {
    event.preventDefault() // ignorar o comportamento padrão
    // console.log("tela pressionada")
    if (lampada === true && onoff === false) {
        lampadaImg.src = "img/on.jpg" // trocar imagem
    }
})

// deixar de pressionar a tela touch
botao.addEventListener('touchend', (event) => {
    event.preventDefault() // ignorar o comportamento padrão
    // console.log("deixar de pressionar")
    if (lampada === true && onoff === false) {
        lampadaImg.src = "img/off.jpg" // trocar imagem
    }
})

// Event listeners para os botões
document.getElementById("ligarButton").addEventListener("click", async () => {
    if (!track) {
        await inicializarLanterna(); // Inicializa a lanterna ao clicar no botão
    }
    ligar(); // Ligar a lanterna
});

document.getElementById("desligarButton").addEventListener("click", desligar); // Desliga a lanterna

// lanterna (torch)
async function inicializarLanterna() {
    // try-catch (tratamento de exceções)
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
        
        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]
        
        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return;
        }
        console.log("lanterna pronta")
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}

// Função para ligar a lanterna (torch)
async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}

// Função para desligar a lanterna sem parar o stream
async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}