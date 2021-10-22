import p5 from 'p5'
import portraits from './../assets/*.png'
import Line from './Line'

let renderer, portrait = portraits.p4

class Renderer extends p5{
    static redirectP5Callbacks( p ) { p.preload = p.preload.bind( p ) }

    constructor( portrait = 'p4' ){
        super( Renderer.redirectP5Callbacks )
        this.levels = 8
        this.portraitSize = 150
        this.density = 1
        this.startLines = 1
        this.minLineLength = 15
        this.maxLineLength = 30
        this.recurred = 0
        this.recursionLevel = 10
        this.curveDetail = 10
        this.speed = 1
        this.points = []
        this.totalPoints = null
        this.lines = []
        this.levelData = new Array(this.levels).fill(0)
        this.pointsToDraw = new Array(this.levels).fill(0)
        this.portrait = portrait
    }

    preload( ){ this.img = this.loadImage( portrait ) }

    setup( ){
        let size = Math.min( window.innerWidth, window.innerHeight ) * 0.8
        this.createCanvas( size, size )
        this.getImagePoints()
        this.pixelDensity( 2 )
        this.strokeWeight( 0.25 )
        
        this.stroke( 0, 0, 0, 200 )
        for( var i = 0 ; i < this.startLines ; i++ ){
            let aPoint = this.points.shift()
            this.lines.push( new Line( aPoint, this.getNextPoint( aPoint) ) )
        }
    }

    getImagePoints(){
        this.pg = this.createGraphics(this.portraitSize, this.portraitSize);
        this.pg.pixelDensity(1)
        this.pg.image( this.img, 0, 0, this.pg.width, this.pg.height )
        this.pg.filter(this.pg.POSTERIZE,this.levels)
        this.pg.loadPixels()
        this.pg.get()
        this.pxls = []
        for( let i = 0 ; i < this.pg.pixels.length ; i+= 4 ) {
            this.levelData[ Math.round( ( this.pg.pixels[ i ] / 255 ) * ( this.levels - 1 ) ) ]++
            this.pxls.push( this.pg.pixels[ i ] )
        }
        this.levelData.forEach( ( l, i ) => {
            let pointsToAdd = l * (this.levels - i - 1 ) * this.density
            let threshold = Math.round( i / ( this.levels - 1 ) * 255 )
            while( pointsToAdd > 0 ){
                let [ x, y ] = [ Math.random() * this.width, Math.random() * this.height ]
                let xRemapped = Math.floor( ( x / this.width ) * this.portraitSize )
                let yRemapped = Math.floor( ( y / this.height ) * this.portraitSize )
                let pxl = this.pxls[ yRemapped * this.portraitSize + xRemapped ]
                if( pxl == threshold ) {
                    this.points.push( { x : x, y : y, v : Math.random() * Math.PI * 2 } )
                    pointsToAdd--
                }
                this.totalPoints = this.points.length
            }
        })
    }

    getNextPoint( aPoint ){
        let candidates = [], alternates = []
        
        this.points.forEach( ( p, i ) => {
            let [ x, y ] = [ p.x - aPoint.x, p.y - aPoint.y ]
            var d = Math.sqrt( x * x + y * y )
            if( d > this.minLineLength && d < this.maxLineLength ) candidates.push( i )
            if( d > this.maxLineLength ) alternates.push( [ i, d ] )
        })

        let selectIndex = null
            if( candidates.length ) selectIndex = candidates[ Math.floor( Math.random() * candidates.length ) ]
            else selectIndex = alternates.sort( ( a, b ) => { return a[1]-b[1] } )[ 0 ][ 0 ]
        
        let bPoint = this.points[ selectIndex ]
        this.points.splice( selectIndex, 1 )
        return bPoint
    }

    draw(){
        this.speed = Math.min( 10, Math.floor( ( 1 - this.points.length / this.totalPoints ) * 500 + 1 ) )
        if( !this.points.length ) return
        for( var i = 0 ; i < this.speed ; i++ ){
            this.lines.forEach( l => {
                if( l.currentSegment < l.segments.length - 1 ){
                    let ps = l.getCurrentSegment()
                    this.line( ps[ 0 ][ 0 ], ps[ 0 ][ 1 ], ps[ 1 ][ 0 ], ps[ 1 ][ 1 ] )
                } else {
                    l.aPoint = l.bPoint
                    l.bPoint = this.getNextPoint( l.aPoint )
                    l.computeSegments()
                    if( this.recurred < this.recursionLevel && Math.random() > 0.9 ) {
                        this.lines.push( new Line( l.aPoint, this.getNextPoint( l.aPoint ) ) )
                        this.recurred++
                    }
                }
            })
        }
    }
}



class Main{
    constructor(){
        document.querySelector( '#portraitSelect' ).addEventListener( 'change', e => {
            portrait = portraits[ e.currentTarget.value ]
            this.restart()
        } )
        
        document.addEventListener( 'dragover', e => e.preventDefault(), false )
        document.addEventListener( 'drop', e => this.onDrop( e ), false )

        this.restart()
    }

    onDrop( e ){
        e.preventDefault()

        let file = e.dataTransfer.files[ 0 ]
        var ext = file.name.split( '.' )[ file.name.split( '.' ).length - 1 ]
        if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) return alert('Needz image plz!')
        
        var reader  = new FileReader()
        reader.onloadend = e => {
            var img = new Image()
            img.onload = () => {
                portrait = reader.result
                this.restart()
            }
            img.src = reader.result
        }
        reader.readAsDataURL( file )
    }

    restart(){
        if( renderer ) renderer.remove()
        renderer = new Renderer( )
    }
}

new Main()