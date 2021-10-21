class Line{
    constructor( startPoint, endPoint, curveDetail = 6 ){
        this.aPoint = startPoint
        this.bPoint = endPoint
        this.segmentLength = curveDetail
        this.segmentsDrawn = 0
        this.recurred = 0
        this.computeSegments()
    }

    computeSegments(){
        this.currentSegment = 0
        this.curvePoints = [
            [ this.aPoint.x, this.aPoint.y ],
            [ this.aPoint.x + Math.cos( this.aPoint.v ) * 10, this.aPoint.y + Math.sin( this.aPoint.v ) * 10 ],
            [ this.bPoint.x - Math.cos( this.bPoint.v ) * 10, this.bPoint.y - Math.sin( this.bPoint.v ) * 10 ],
            [ this.bPoint.x, this.bPoint.y ]
        ]

        this.segments = []
        for( var i = 0 ; i <= this.segmentLength ; i++ ) this.segments.push( this.getPointOnCurve( this.curvePoints, i / this.segmentLength ) )
        this.segmentsDrawn++
    }

    getCurrentSegment(){
        let p = this.segments[ this.currentSegment ]
        let p2 = this.segments[ this.currentSegment + 1 ]
        this.currentSegment++
        return [ p, p2 ]
    }

    getPointOnCurve( points, t ) {
        const len = points.length;
        if (len === 1) return points[0]
        else {
          let p = []
          for (let i = 0; i < len - 1; i++) {
            const p1 = points[i], p2 = points[i + 1]
            p.push([ (1 - t) * p1[0] + t * p2[0], (1 - t) * p1[1] + t * p2[1] ])
          }
          return this.getPointOnCurve( p, t )
        }
    }
}

export { Line as default }