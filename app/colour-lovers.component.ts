import { Component, Input,OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import './rxjs-operators';


@Component({
  selector: 'colour-lovers',
  templateUrl: 'app/colour-lovers.component.html'
})
export class ColourLoversComponent {
    
    constructor(private jsonp: Jsonp) {}


    @Input() paletteId:number;
    
    palette;
    pattern;
    errorMessage:any;
    jsonVisible:boolean = false;

    getRandomPalette():Observable<any>{    
        return this.jsonp.get('http://www.colourlovers.com/api/palettes/random?format=json&showPaletteWidths=1&jsonCallback=JSONP_CALLBACK')
                    .map(this.extractData)
                    .catch(this.handleError);    
    }
    getPalette(id: number):Observable<any>{        
        return this.jsonp.get('http://www.colourlovers.com/api/palette/' + id + '?format=json&showPaletteWidths=1&jsonCallback=JSONP_CALLBACK')
                    .map(this.extractData)
                    .catch(this.handleError);    
    }
    getRandomPattern():Observable<any>{
        return this.jsonp.get('http://www.colourlovers.com/api/patterns/random?format=json&jsonCallback=JSONP_CALLBACK')
                    .map(this.extractData)
                    .catch(this.handleError);        
    }

    private extractData(res: Response) {
        return res.json();        
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("handleError() got " + JSON.stringify(errMsg));
        return Observable.throw(errMsg);
    }
    
    toggleJSON(){
        this.jsonVisible = !this.jsonVisible;
    }

    changePattern() {
        this.getRandomPattern().subscribe(
            patterns => { 
            this.pattern = patterns[0]
        } ,
        error => this.errorMessage = <any>error
        );

    }
    ngOnInit() {
        if (this.paletteId){
                this.getPalette(this.paletteId).subscribe(
                    resp => { 
                        this.palette = resp[0]
                    } ,
                    error => this.errorMessage = <any>error
                );
        } else {
            this.getRandomPalette().subscribe(
                palettes => { 
                    this.palette = palettes[0]
                } ,
                error => this.errorMessage = <any>error
            );
        }
    }   
}