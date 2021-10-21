let emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '👽', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']
let greetings = ['Hey', 'Hi', 'Yoooo', 'Yo', 'Hello', 'What\'s up!!', 'Where are you?', 'LOL', 'What means null?']
let names = ['drummel', 'camilabianchi', 'niki', 'dsasson', 'samhay', 'pu22l3', 'santi', 'helen', 'brittany', 'matt', 'mattaniah', 'samantha-alexaa', 'joy', 'kazu', 'aysedemir', 'victoire', 'michael', 'stepha', 'dantasse', 'marcschoeder']
let intervalChat = 1000
let intervalWindow = 1000
let chats = Object.values( document.querySelectorAll( '.chat' ) )

let addLine = function(){
    let chats = Object.values( document.querySelectorAll( '.chat' ) )
    chats.forEach( chat => {
        let emoji = ''
        let exclamation = ''
        let greeting = greetings[Math.floor( Math.random() * greetings.length )]
        for( let i = 0 ; i < Math.floor( Math.random() * 20 ) ; i++ ) exclamation += '!'
        
        let name = names[Math.floor( Math.random() * names.length )]
        if( Math.random() > 0.4 ) emoji = emojis[Math.floor( Math.random() * emojis.length )]
        
        let lineNode = document.createElement('div')
        lineNode.classList.add('line')

        let line = '<b>' + name + '</b> says : ' + greeting
        if( Math.random() > 0.6 ) line += exclamation
        line += ' ' + emoji + ' <br>'
        lineNode.innerHTML = line

        chat.appendChild( lineNode )
        if( chat.childNodes.length > 16 ) chat.removeChild( chat.childNodes[0])
    })
    
    intervalChat = Math.random() * 1000
    setTimeout( () => {
        addLine()
    }, intervalChat )
}

let setChatProps = function( chat ){
    chat.style.opacity = Math.floor( Math.random () * 2 )
    
    let pLeft = Math.random() * ( window.innerWidth - chat.offsetWidth ) + 'px' 
    let pTop = Math.random() * ( window.innerHeight - chat.offsetHeight ) + 'px' 
    
    chat.style.transform = 'translate3d('+pLeft+','+pTop+',0 )'
    
    chat.style.width = 200 + Math.random() * 400 + 'px'
    chat.style.height = 300 + Math.random() * 300 + 'px'
}

let showHideWindows = function(){
    
    chats.forEach( chat => { if( Math.random() > 0.8 ) setChatProps( chat ) } )
    intervalWindow = Math.random() * 1000
    setTimeout( () => {
        showHideWindows()
    }, intervalWindow )
}

chats.forEach( chat => setChatProps( chat ) )
addLine()
showHideWindows()