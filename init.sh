#!/bin/sh

# ----------> Setup
echo ┌─────────────────────────┐
echo │ OK! Lets get started... │
echo └─────────────────────────┘
read -p '└─────> Project name : ' varname
echo

if [ -d "$varname" ]; then
  echo 😡 That directory exists!!!
  echo 😔 Sorry, bye
  exit
fi

# ----------> Create root directory
mkdir src/$varname

# ----------> Welcome :)
npm install --prefix ./src/$(echo $varname) figlet
echo
{
  echo "var figlet = require( 'figlet' );"
  echo "figlet.fonts( function( err, fonts ) {"
  echo "  var font = fonts[ Math.floor( Math.random( ) * fonts.length ) ];"
  echo "    figlet( 'Start!', { font : font },function( err, data ) {"
  echo "    console.log( data );"
  echo "  });"
  echo "});"
} > src/$(echo $varname)/welcome.js
echo

node src/$(echo $varname)/welcome.js
rm -rf src/$(echo $varname)/*

# Create app dir
mkdir src/$(echo $varname)/app

# Create views dir
mkdir src/$(echo $varname)/app/views
{
  echo "doctype"
  echo "html"
  echo "  head"
  echo "    meta(charset='utf-8')"
  echo "    meta(http-equiv='Content-Type',content='text/html; charset=utf-8')"
  echo "    meta(http-equiv='X-UA-Compatible', content='IE=edge')"
  echo "    meta(name='viewport', content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')"
  echo "    title ${varname}"
  echo "    link(rel='stylesheet', id='mainStylesheet' href='../css/main.styl')"
  echo "  body"
  echo "    #main You should do something about this"
  echo "    script(src='../js/main.js')"
} > src/$(echo $varname)/app/views/index.pug


# Create js dir
mkdir src/$(echo $varname)/app/js
{
  if [ "$1" == "three" ]
    then
      echo "import { WebGLRenderer, OrthographicCamera, Scene } from 'three'"

      echo "class Index{"
      echo "  constructor( node ){"
      echo "    this.node = node"
      echo ""
      echo "    this.renderer = new WebGLRenderer( { antialias : true, alpha : true, preserveDrawingBuffer : true } )"
      echo "    this.node.appendChild( this.renderer.domElement )"
      echo ""
      echo "    this.camera = new OrthographicCamera( )"
      echo "    this.scene = new Scene()"
      echo ""
      echo "    window.addEventListener('resize', () => this.resize() )"
      echo ""
      echo "    this.resize()"
      echo "    this.step()"
      echo "  }"
      echo ""
      echo "  resize( ){"
      echo "    let [ width, height ] = [ this.node.offsetWidth, this.node.offsetHeight ]"
      echo "	  this.renderer.setSize( width, height )"
      echo "		this.renderer.setPixelRatio( 2 )"
      echo "    var camView = { left :  width / -2, right : width / 2, top : height / 2, bottom : height / -2 }"
      echo "    for ( var prop in camView ) this.camera[ prop ] = camView[ prop ]"
      echo "    this.camera.position.z = 1000"
      echo "    this.camera.updateProjectionMatrix()"
      echo "  }"
      echo ""
      echo "  step( time ){"
      echo "    requestAnimationFrame( this.step.bind( this ) )"
      echo "    this.renderer.render( this.scene, this.camera )"
      echo "  }"
      echo "}"
      echo ""
      echo "new Index( document.getElementById( 'main'))"
    else
      echo "console.log('Welcome')"
      echo "document.body.style.background = '#'+((1<<24)*Math.random()|0).toString(16)"
      echo "document.getElementById('main').style.color = '#'+((1<<24)*Math.random()|0).toString(16)"
  fi
} > src/$(echo $varname)/app/js/main.js

# Create css dir
mkdir src/$(echo $varname)/app/css
{
  echo "html, body"
  echo "    height 100%"
  echo "    padding 0"
  echo "    margin 0"
  if [ "$1" == "three" ]
    then
      echo "    overflow hidden"
      echo "#main"
      echo "    height 100%"
  fi
} > src/$(echo $varname)/app/css/main.styl

# Create package.json
{
  echo '{'
  echo '  "name": "'${varname}'",'
  echo '  "version": "0.0.0",'
  echo '  "description": "",'
  echo '  "main": "index.js",'
  echo '  "scripts": {'
  echo '    "start": "parcel app/views/index.pug --open",'
  echo '    "build": "rm -rf ./../../build/'${varname}' && parcel build app/views/index.pug --no-source-maps --out-dir ./../../build/'${varname}' --public-url '.'"'
  echo '  },'
  echo '  "keywords": [],'
  echo '  "author": "proper-code",'
  echo '  "license": "ISC",'
  echo '  "devDependencies": {'
  echo '    "figlet": "*",'
  echo '    "parcel-bundler": "*"'
  echo '  },'
  echo '  "dependencies": {'
  if [ "$1" == "three" ]
    then
      echo '    "three": "*"'
  fi
  echo '  }'
  echo '}'
} > src/$(echo $varname)/package.json

# Create .gitignore
{
  echo ".cache"
  echo "dist"
  echo "node_modules"
  echo "npm-debug.log"
  echo "package-lock.json"
} > src/$(echo $varname)/.gitignore

# install
npm i --prefix ./src/$(echo $varname)

# Remove stupid etc dir...
if [ -d ./src/$(echo $varname)/etc ]; then
  rm -rf ./src/$(echo $varname)/etc
fi

# run
npm start --prefix ./src/$(echo $varname)

# ----------> End