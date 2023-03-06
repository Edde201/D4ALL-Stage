//Images
var image_base_random = ['url(./images/robertPistol.png)', 'url(./images/brandonPistol.png)', 'url(./images/saimonPistol.png)'] //Imagenes de los enemigos
var image_base_allies = ['url(./images/alexa.png)', 'url(./images/amai.png)', 'url(./images/yaz.png)'] //Imagenes de los aliados
var image_base_bonus = ['url(./images/cheems.png)'] //Imagen del personaje bonus

////Ubicacion de donde apareceran los enemigos
var imagesEnemi = document.getElementsByClassName('imgEnemi')
var imagesAllies = document.getElementsByClassName('allies')
var imagesBonus = document.getElementsByClassName('bonus')

//Animacion del disparo
var animation = document.getElementsByClassName('triggerAnimation')

//Animacion de cambio de color de la barra del jugar
var body = document.getElementById('body')

//Ubicacion de las miras
var seeImage1 = document.getElementById('1') //Mira 1
var seeImage2 = document.getElementById('2') //Mira 2
var seeImage3 = document.getElementById('3') //Mira 3
var seeImage4 = document.getElementById('4') //Mira 4
var seeImage5 = document.getElementById('5') //Mira 5
var seeImage6 = document.getElementById('6') //Mira 6
var seeImage7 = document.getElementById('7') //Mira 7
var seeImage8 = document.getElementById('8') //Mira 8


//Datos mostrados de Hits y puntos
var results = document.getElementById('results')
var resultsHitsEnemis = document.getElementById('resultsHitsEnemis')
var resultsHitsAllies = document.getElementById('resultsHitsAllies')
var resultsHitsBonus = document.getElementById('resultsHitsBonus')
var resultsTotal = document.getElementById('resultsTotal')
var restart = document.getElementById('restart')

//Puntos por disparo
var numEnemis = document.getElementById('pointsHits')

//Agregacion de sonidos, al recibir daño
var soundsDamageEnemi = document.getElementById('soundsDamageEnemi')
var soundsDamageAllies = document.getElementById('soundsDamageAllies')
var soundsDamageBonus = document.getElementById('soundsDamageBonus')

//Puntos del jugador
var moneyPoints = document.getElementById('moneyPoints')

//Agarra las propiedades de las variables Location
var damageAnimationEnemy
var damageAnimationAllies
var damageAnimationBonus

//Div al que se les agregara las propiedades CSS
var enemyLocation
var alliesLocation
var bonusLocation

//Imagen random que se usara en el DIV
var enemiRandom
var alliesRandom
var bonusRandom

//Validacion de a quien le apuntan y a quien se le disparara
var alliesShot = false
var enemyShot = false
var bonusShot = false

//Valida si se le disparo a alguien
var validationFire = false

//Tiempo de animacion
var seconds = parseFloat(seconds)
seconds = 1.5

//Conteo de cuantas veces aparecieron los enemigos
var y = 0

//Tiempo en el que se quitara la clase Style en HTML
var removeStyle = 1800

//Tiempo en el que se agregara la clase Style en HTML
var addStyle = 2000

//Contador de cuantas balas han recibido cada uno
var fireCounter = 0
var fireCounterPositive = 0
var fireCounterNegative = 0
var fireCounterBonus = 0

//Valor guardado de los fireConunters
var bant = 0
var bantPositive = 0
var bantNegative = 0
var bantBonus = 0

//Acumulador de puntos del jugador
var pointsAccumulator = 0

//Ubicacion en donde sera ejecutada la animacion de disparo
var numero = 0

//Validacion para saber si ya le diste una ves a un personaje para que no se generen ma puntos pero si se pueda disparar a un personaje distinto
var aparicionEnemi = false
var aparicionAllies = false
var aparicionBonus = false

//Musica del juego que se escucha unicamente cuando inicia el juego
var musicGame = new Audio('./sounds/Music-Game.mp3');

//Validacion para que inicie el juego
var game = false

//Valida si ya hay una mira en la pantalla (si presionas una tecla), para que no puedas poner varias miras al mismo tiempo
var validation = false

//Valida si se pueden usar las teclas para apuntar o no
var validationTeclas = false

var start = true


var screenControls = false


var inicioDelJuego = document.getElementById('inicioDeJuego')


//--------------------------------- Inicio del Juego -------------------------------------------------------------------


startGame()

function startGame(){
  validationTeclas = false
  body.style.backgroundImage = "url(./images/pantallaInicio.png)"
  body.style.backgroundAttachment = "fixed"
  numEnemis.style.visibility = "hidden"
  moneyPoints.style.visibility = "hidden"
  document.addEventListener("keydown", (event) => {
    const controlsBtn = event.key
    if (controlsBtn === 'Enter' && start === true) {
      screenControls = true
      body.style.backgroundImage = "url(./images/fondoTeclasFlechas.jpg)"
      controls()
    }
  })
}


//-------------------------------- Pantalla de controles ----------------------------------------------------------------

function controls(){
  inicioDelJuego.style.visibility = "hidden"
  start = false
  screenControls = true
  document.addEventListener("keydown", (event) => {
    const startBtn = event.key
    if (startBtn === 'Enter' && screenControls === true) {
      musicGame.play()
      musicGame.loop = true
      game = true
      body.style.backgroundImage = "url(./images/fondo.png)"
      numEnemis.style.visibility = "visible"
      moneyPoints.style.visibility = "visible"
      validationTeclas = true
    }
  })
}


//---------------------------------- Final del juego --------------------------------------------------------------------


function endGame(){
  musicGame.currentTime = 0
  validationTeclas = false
  body.style.background = "linear-gradient(rgba(5, 5, 12, 0.5), rgba(5, 7, 12, 0.15)), url(./images/fondo.png)"
  body.style.backgroundSize = "100% 100%"
  body.style.backgroundAttachment = "fixed"
  resultsHitsEnemis.innerHTML = `HITS ENEMIES: ${fireCounterPositive}`
  resultsHitsAllies.innerHTML = `HITS ALLIES: ${fireCounterNegative}`
  resultsHitsBonus.innerHTML = `HITS BONUS: ${fireCounterBonus}`
  resultsTotal.innerHTML = `$${pointsAccumulator}`
  restart.innerHTML = `</br>PLAY AGAIN: ENTER`
  document.addEventListener("keydown", (event) => {
    const resetBtn = event.key
    if (resetBtn === 'Enter') {
      window.location.reload();
    }
  })
}


//------------------------ Aparicion de los enemigos, aliados y el bonus -------------------------------------------------


function imgRandom() {
  if (game === true){
    console.log(y)
    let randoteclapearanceBonus = Math.floor(Math.random() * 40)
    let randoteclapearanceAllies = Math.floor(Math.random() * 2)
    aparicionEnemi = true
    aparicionAllies = true
    aparicionBonus = true
    enemyLocation = imagesEnemi[Math.floor(Math.random() * imagesEnemi.length)] //Generacion de la ubicaion del enemigo de manera random
    alliesLocation = imagesAllies[Math.floor(Math.random() * imagesAllies.length)]
    enemiRandom = Math.floor(Math.random() * image_base_random.length) //Imagen elegida de manera random
    let finalEnemy = image_base_random[enemiRandom] //Resultado de la generacion del enemigo + imagen
    if (randoteclapearanceAllies == 1) {
      alliesRandom = Math.floor(Math.random() * image_base_allies.length)
      let finalAllies = image_base_allies[alliesRandom]
      alliesLocation.style.backgroundImage = finalAllies //Se agrega la imagen del resultado finalAllies
      alliesLocation.style.animation = `animation ${seconds}s` //Agrega animacion de aparicion del Aliado
      alliesLocation.style.transform = 'translateY(250px)'
      setTimeout(() => {
      alliesLocation.removeAttribute('style')
      alliesLocation.style.display = 'none'
      }, removeStyle)
      alliesLocation.getAttribute(`style`)
      alliesLocation.style.display = 'block'
    }
    if (randoteclapearanceBonus == 7) {
      bonusRandom = Math.floor(Math.random() * image_base_bonus.length)
      let finalBonus = image_base_bonus[bonusRandom]
      bonusLocation = imagesBonus[Math.floor(Math.random() * imagesBonus.length)]
      bonusLocation.style.backgroundImage = finalBonus //Se agrega la imagen del resultado finalAllies
      bonusLocation.style.animation = `animation 0.5s` //Agrega animacion de aparicion del Aliado
      bonusLocation.style.transform = 'translateY(250px)'
      setTimeout(() => {
      bonusLocation.removeAttribute('style')
      bonusLocation.style.display = 'none'
    }, 900)
      bonusLocation.getAttribute(`style`)
      bonusLocation.style.display = 'block'
    }
    //Agrega CSS en HTML
    enemyLocation.style.backgroundImage = finalEnemy //Se agrega la imagen del resultado finalEnemy
    enemyLocation.style.animation = `animation ${seconds}s` //Agrega animacion de aparicion del enemigo
    enemyLocation.style.transform = 'translateY(250px)' //Punto donde desaparecera el enemigo
    setTimeout(() => { //Despues de la aparicion del enemigo, en un tiempo se ejecuta esta parte de codigo
      aparicionEnemi = false
      aparicionAllies = false
      aparicionBonus = false
    enemyLocation.removeAttribute('style') //Elimina el atributo style despues de un tiempo de haber sido generado
    enemyLocation.style.display = 'none'
    }, removeStyle)
    enemyLocation.getAttribute(`style`) //Vuele a agregar  el atributo para que se genere un nuevo enemigo
    enemyLocation.style.display = 'block' //Hace posible el dispararle al enemigo
    y++ //Aumento de contador y por cada enemigo spawnado



    if (y==30) { //Limita la aparicion de los enemigos a 50
      setTimeout(()=>{
        aparicionEnemi = false
        aparicionAllies = false
        aparicionBonus = false
        clearInterval(fase1)
      }, 1000)
      setTimeout(()=>{
        musicGame.pause()
        endGame()
      }, 2000)
    }
    time();
    //Limite de tiempos
    if (seconds <= 0.8){
      seconds = 0.8
    }
    if (removeStyle <=800) {
      removeStyle = 800
    }
    if (addStyle <=700) {
      addStyle = 700
    }
    if (y<30) {
      clearInterval(fase1)
      fase1 = setInterval(imgRandom, addStyle)
    }
  }
}

var fase1 = setInterval(imgRandom, addStyle) //Actualiza los tiempos de los enemigos para que sean mas rapidos
//Aumento de velocidad
function time(){
  addStyle -= 20
  seconds -= 0.02
  removeStyle -= 30
  return
}


//---------------------------------------------------------------------------------------------------------------


//Teclas, aparicion y desaparicion de mira al dejar de pulsar la tecla, validacion para que se precione solo una, y validacion para indetificar si la mira esta sobre el enmigo
var multiKeyValidation = false
var multiKeyValidation2 = false
var tecla = {};

onkeydown = onkeyup = function(e){
    e = e || event;
    tecla[e.keyCode] = e.type == 'keydown';

//----------------- TECLA A -------------------------------------------------------------------------------------


if (validationTeclas === true) {


  if(tecla[37]){
    if (validation === false && multiKeyValidation2 === false){
      seeImage4.style.backgroundImage = 'url(images/See.png)'
      validation = true
    }
    if (isCollide(seeImage4, document.getElementsByClassName(4)[0])) {
      enemyShot = true
      alliesShot = false
      bonusShot = false
      numero = 1
    }
    else if (isCollide(seeImage4, document.getElementsByClassName(44)[0])) {
      alliesShot = true
      bonusShot = false
      enemyShot = false
      numero = 1
    }
    else if (isCollide(seeImage4, document.getElementsByClassName(444)[0])) {
      bonusShot = true
      enemyShot = false
      alliesShot = false
      numero = 1
    }
    else bonusShot = false, enemyShot = false, alliesShot = false
  }

//----------------- TECLA  W -------------------------------------------------------------------------------------

  else if(tecla[38]){
    if (validation === false && multiKeyValidation2 === false){
      seeImage2.style.backgroundImage = 'url(images/See.png)'
      validation = true
    }
    if (isCollide(seeImage2, document.getElementsByClassName(2)[0])) {
      enemyShot = true
      alliesShot = false
      bonusShot = false
      numero = 6
    }
    else if (isCollide(seeImage2, document.getElementsByClassName(22)[0])) {
      alliesShot = true
      bonusShot = false
      enemyShot = false
      numero = 6
    }
    else if (isCollide(seeImage2, document.getElementsByClassName(222)[0])) {
      bonusShot = true
      enemyShot = false
      alliesShot = false
      numero = 6
    }
    else bonusShot = false, enemyShot = false, alliesShot = false
  }

//----------------- TECLA D -------------------------------------------------------------------------------------

  else if(tecla[39]){
    if (validation === false && multiKeyValidation2 === false){
      seeImage5.style.backgroundImage = 'url(images/See.png)'
      validation = true
    }
    if (isCollide(seeImage5, document.getElementsByClassName(5)[0])) {
      enemyShot = true
      alliesShot = false
      bonusShot = false
      numero = 4
    }
    else if (isCollide(seeImage5, document.getElementsByClassName(55)[0])) {
      alliesShot = true
      bonusShot = false
      enemyShot = false
      numero = 4
    }
    else if (isCollide(seeImage5, document.getElementsByClassName(555)[0])) {
      bonusShot = true
      enemyShot = false
      alliesShot = false
      numero = 4
    }
    else bonusShot = false, enemyShot = false, alliesShot = false
  }

//----------------- TECLA S -------------------------------------------------------------------------------------

  else if(tecla[40]){
    if (validation === false && multiKeyValidation2 === false){
      seeImage7.style.backgroundImage = 'url(images/See.png)'
      validation = true
    }
    if (isCollide(seeImage7, document.getElementsByClassName(7)[0])) {
      enemyShot = true
      alliesShot = false
      bonusShot = false
      numero = 7
    }
    else if (isCollide(seeImage7, document.getElementsByClassName(77)[0])) {
      alliesShot = true
      bonusShot = false
      enemyShot = false
      numero = 7
    }
    else if (isCollide(seeImage7, document.getElementsByClassName(777)[0])) {
      bonusShot = true
      enemyShot = false
      alliesShot = false
      numero = 7
    }
    else bonusShot = false, enemyShot = false, alliesShot = false
  }

//----------------- TECLA A+W -------------------------------------------------------------------------------------

  if(tecla[38] && tecla[37] || tecla[37] && tecla[38]){
      if (multiKeyValidation === false) {
        seeImage2.removeAttribute('style')
        seeImage4.removeAttribute('style')
        seeImage3.removeAttribute('style')
        seeImage5.removeAttribute('style')
        seeImage6.removeAttribute('style')
        seeImage7.removeAttribute('style')
        seeImage8.removeAttribute('style')
        seeImage1.style.backgroundImage = 'url(images/See.png)'
        multiKeyValidation = true
        multiKeyValidation2 = true
      }
      if (isCollide(seeImage1, document.getElementsByClassName(1)[0])) {
        enemyShot = true
        alliesShot = false
        bonusShot = false
        numero = 0
      }
      else if (isCollide(seeImage1, document.getElementsByClassName(11)[0])) {
        alliesShot = true
        bonusShot = false
        enemyShot = false
        numero = 0
      }
      else if (isCollide(seeImage1, document.getElementsByClassName(111)[0])) {
        bonusShot = true
        enemyShot = false
        alliesShot = false
        numero = 0
      }
      else bonusShot = false, enemyShot = false, alliesShot = false
    }

//----------------- TECLA D+W -------------------------------------------------------------------------------------

if(tecla[38] && tecla[39] || tecla[39] && tecla[38]){
    if (multiKeyValidation === false){
    seeImage2.removeAttribute('style')
    seeImage5.removeAttribute('style')
    seeImage3.style.backgroundImage = 'url(images/See.png)'
    multiKeyValidation = true
    multiKeyValidation2 = true
    }
  if (isCollide(seeImage3, document.getElementsByClassName(3)[0])) {
    enemyShot = true
    alliesShot = false
    bonusShot = false
    numero = 3
  }
  else if (isCollide(seeImage3, document.getElementsByClassName(33)[0])) {
    alliesShot = true
    bonusShot = false
    enemyShot = false
    numero = 3
  }
  else if (isCollide(seeImage3, document.getElementsByClassName(333)[0])) {
    bonusShot = true
    enemyShot = false
    alliesShot = false
    numero = 3
  }
  else bonusShot = false, enemyShot = false, alliesShot = false
}

//----------------- TECLA D+S -------------------------------------------------------------------------------------

    if(tecla[39] && tecla[40] || tecla[40] && tecla[39]){
      if (multiKeyValidation === false){
      seeImage5.removeAttribute('style')
      seeImage7.removeAttribute('style')
      seeImage8.style.backgroundImage = 'url(images/See.png)'
      multiKeyValidation = true
      multiKeyValidation2 = true
      }
      if (isCollide(seeImage8, document.getElementsByClassName(8)[0])) {
        enemyShot = true
        alliesShot = false
        bonusShot = false
        numero = 5
      }
      else if (isCollide(seeImage8, document.getElementsByClassName(88)[0])) {
        alliesShot = true
        bonusShot = false
        enemyShot = false
        numero = 5
      }
      else if (isCollide(seeImage8, document.getElementsByClassName(888)[0])) {
        bonusShot = true
        enemyShot = false
        alliesShot = false
        numero = 5
      }
      else bonusShot = false, enemyShot = false, alliesShot = false
    }

//----------------- TECLA S+A -------------------------------------------------------------------------------------

  if(tecla[40] && tecla[37] || tecla[37] && tecla[40]){
    if (multiKeyValidation === false){
      seeImage4.removeAttribute('style')
      seeImage7.removeAttribute('style')
      seeImage6.style.backgroundImage = 'url(images/See.png)'
      multiKeyValidation = true
      multiKeyValidation2 = true
    }
    if (isCollide(seeImage6, document.getElementsByClassName(6)[0])) {
      enemyShot = true
      alliesShot = false
      bonusShot = false
      numero = 2
    }
    else if (isCollide(seeImage6, document.getElementsByClassName(66)[0])) {
      alliesShot = true
      bonusShot = false
      enemyShot = false
      numero = 2
    }
    else if (isCollide(seeImage6, document.getElementsByClassName(666)[0])) {
      bonusShot = true
      enemyShot = false
      alliesShot = false
      numero = 2
    }
    else bonusShot = false, enemyShot = false, alliesShot = false
  }

  if(tecla[38] && tecla[40] && tecla[37] || tecla[38] && tecla[40] && tecla[39] || tecla[37] && tecla[39] && tecla[38] || tecla[37] && tecla[39] && tecla[40]){
    seeImage1.removeAttribute('style')
    seeImage2.removeAttribute('style')
    seeImage3.removeAttribute('style')
    seeImage4.removeAttribute('style')
    seeImage5.removeAttribute('style')
    seeImage6.removeAttribute('style')
    seeImage7.removeAttribute('style')
    seeImage8.removeAttribute('style')
    bonusShot = false
    enemyShot = false
    alliesShot = false
  }
}
}
document.addEventListener('keyup', (event) => {
  seeImage1.removeAttribute('style')
  seeImage1.getAttribute('style')
  seeImage2.removeAttribute('style')
  seeImage2.getAttribute('style')
  seeImage3.removeAttribute('style')
  seeImage3.getAttribute('style')
  seeImage4.removeAttribute('style')
  seeImage4.getAttribute('style')
  seeImage5.removeAttribute('style')
  seeImage5.getAttribute('style')
  seeImage6.removeAttribute('style')
  seeImage6.getAttribute('style')
  seeImage7.removeAttribute('style')
  seeImage7.getAttribute('style')
  seeImage8.removeAttribute('style')
  seeImage8.getAttribute('style')

  validation = false
  multiKeyValidation = false
  multiKeyValidation2 = false
})


//--------------------------------------------------------------------------------------------


//Validacion para aumentar contador de cada disparo dado a un Enemigon/Aliado
document.addEventListener("keydown", (event) =>{
  const fireTecla = event.key.toLowerCase()
  if (fireTecla === 'p' && aparicionEnemi === true && validation === true && enemyShot === true) {
    validationFire = true
    bantPositive = fireCounterPositive

    //Animacion de disparo
    setTimeout(()=>{
      animation[numero].style.backgroundImage = 'url(./images/damageEffect1.png)'
    },30)
    setTimeout(()=>{
      animation[numero].style.backgroundImage = 'url(./images/damageEffect2.png)'
    },40)
    setTimeout(()=>{
      animation[numero].removeAttribute('style')
      animation[numero].getAttribute('style')
    },50)
    fireCounter++
    fireCounterPositive++
    //Animacion, sonidos, puntaje de los Enemigos
    if (fireCounterPositive == bantPositive + 1) {

      setTimeout(()=>{
        moneyPoints.style.color = 'green'
      },50)
      setTimeout(()=>{
        moneyPoints.removeAttribute('style')
        moneyPoints.getAttribute('style')
      },100)
      pointsAccumulator += 300
      moneyPoints.innerHTML = '$' + pointsAccumulator
      numEnemis.innerHTML = 'HIT: ' + fireCounter
      soundsDamageEnemi.innerHTML = '<audio src="./sounds/sound-of-damage-enemi.mp3" autoplay></audio>'
      body.style.backgroundImage = 'url(./images/fondocambio.png)'
      setTimeout(()=>{
        body.style.backgroundImage = 'url(./images/fondo.png)'
      }, 200)
      aparicionEnemi = false
      damageAnimationEnemy = enemyLocation
      if (enemiRandom == 0){
        damageAnimationEnemy.style.backgroundImage = 'url(./images/robertPistolDeath.png)'
        damageAnimationEnemy.style.animation = 'animation 2s'
      }
      else if (enemiRandom == 1) {
        setTimeout(()=>{
          damageAnimationEnemy.style.backgroundImage = 'url(./images/brandonPistolDeath1.png)'
        },20)
        setTimeout(()=>{
          damageAnimationEnemy.style.backgroundImage = 'url(./images/brandonPistolDeath2.png)'
        },30)
        setTimeout(()=>{
          damageAnimationEnemy.style.backgroundImage = 'url(./images/brandonPistolDeath3.png)'
          damageAnimationEnemy.style.animation = 'animation 2s'
        },40)
      }
      else if (enemiRandom == 2) {
        damageAnimationEnemy.style.backgroundImage = 'url(./images/saimonPistolDeath.png)'
        damageAnimationEnemy.style.animation = 'animation 2s'
      }
    }
  }

  //Animacion, sonidos, puntaje de los Aliados
  else if (fireTecla === 'p' && aparicionAllies === true && validation === true && alliesShot === true) {
    validationFire = true
    bantNegative = fireCounterNegative
    fireCounter++
    setTimeout(()=>{
      animation[numero].style.backgroundImage = 'url(./images/damageEffect1.png)'
    },30)
    setTimeout(()=>{
      animation[numero].style.backgroundImage = 'url(./images/damageEffect2.png)'
    },40)
    setTimeout(()=>{
      animation[numero].removeAttribute('style')
      animation[numero].getAttribute('style')
    },50)
    fireCounterNegative++
    if (fireCounterNegative == bantNegative + 1) {
      setTimeout(()=>{
        moneyPoints.style.color = 'red'
      },50)
      setTimeout(()=>{
        moneyPoints.removeAttribute('style')
        moneyPoints.getAttribute('style')
      },100)
      pointsAccumulator -= 300
      moneyPoints.innerHTML = '$' + pointsAccumulator
      numEnemis.innerHTML = 'HIT: ' + fireCounter
      body.style.backgroundImage = 'url(./images/fondocambio.png)'
      setTimeout(()=>{
        body.style.backgroundImage = 'url(./images/fondo.png)'
      }, 200)
      soundsDamageAllies.innerHTML = '<audio src="./sounds/sound-of-damage-allies.mp3" autoplay></audio>'
      damageAnimationAllies = alliesLocation
      aparicionAllies = false
      if (alliesRandom == 0){
        damageAnimationAllies.style.backgroundImage = 'url(./images/alexaDeath.png)'
        damageAnimationAllies.style.animation = 'animation 2s'
        damageAnimationAllies.style.transform = 'translateX(250px)'
      }
      else if (alliesRandom == 1) {
        damageAnimationAllies.style.backgroundImage = 'url(./images/amaiDeath.png)'
        damageAnimationAllies.style.animation = 'animation 2s'
        damageAnimationAllies.style.transform = 'translateX(250px)'
      }
      else if (alliesRandom == 2) {
        damageAnimationAllies.style.backgroundImage = 'url(./images/yazDeath.png)'
        damageAnimationAllies.style.animation = 'animation 2s'
        damageAnimationAllies.style.transform = 'translateY(250px)'
      }
    }
  }

  //Animacion, sonidos, puntaje del Bonus
  else if (fireTecla === 'p' && aparicionBonus === true && validation === true && bonusShot === true) {
    validationFire = true
    bantBonus = fireCounterBonus
    fireCounter++
    setTimeout(()=>{
      animation[numero].style.backgroundImage = 'url(./images/damageEffect1.png)'
    },30)
    setTimeout(()=>{
      animation[numero].style.backgroundImage = 'url(./images/damageEffect2.png)'
    },40)
    setTimeout(()=>{
      animation[numero].removeAttribute('style')
      animation[numero].getAttribute('style')
    },50)
    fireCounterBonus++
    if (fireCounterBonus == bantBonus + 1) {
      setTimeout(()=>{
        moneyPoints.style.color = 'maroon'
      },50)
      setTimeout(()=>{
        moneyPoints.removeAttribute('style')
        moneyPoints.getAttribute('style')
      },100)
      pointsAccumulator += 1000
      moneyPoints.innerHTML = '$' + pointsAccumulator
      numEnemis.innerHTML = 'HIT: ' + fireCounter
      body.style.backgroundImage = 'url(./images/fondocambio.png)'
      setTimeout(()=>{
        body.style.backgroundImage = 'url(./images/fondo.png)'
      }, 200)
      soundsDamageBonus.innerHTML = '<audio src="./sounds/boing.mp3" autoplay></audio>'
      aparicionBonus = false
      damageAnimationBonus = bonusLocation
      damageAnimationBonus.removeAttribute('style')
      damageAnimationBonus.getAttribute('style')
      if (bonusRandom == 0){
        damageAnimationBonus.style.backgroundImage = 'url(./images/cheemsDeath.png)'
        damageAnimationBonus.style.animation = 'animation 2s'
        damageAnimationBonus.style.transform = 'translateY(250px)'
      }
    }
  }
})

document.addEventListener('keyup', (event) =>{
  validationFire = false
})


//--------------------------------------------------------------------------------------------


function isCollide(object1, object2){
  const a = object1.getBoundingClientRect()
  const b = object2.getBoundingClientRect()
  return !(((a.top + a.height) < (b.top)) || (a.top > (b.top + b.height)) || ((a.left + a.width) < b.left) || (a.left > (b.left + b.width)))
}





/*
* Cambio para GitHub
*/
