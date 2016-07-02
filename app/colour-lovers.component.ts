import { Component, Input,OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Jsonp, Response, URLSearchParams } from '@angular/http';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'colour-lovers',
  templateUrl: 'app/colour-lovers.component.html'
})
export class ColourLoversComponent {
    
    constructor(private jsonp: Jsonp) {}


    @Input() paletteId:number;
    
    palette;
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

    ngOnInit() {
        if (this.paletteId){
                this.getPalette(this.paletteId).subscribe(
                    resp => { 
                        this.palette = resp[0]
                    } ,
                    error => this.errorMessage = <any>error
                );
        } else {
            if (1==2){            
                this.getRandomPalette().subscribe(
                    palettes => { 
                        this.palette = palettes[0]
                    } ,
                    error => this.errorMessage = <any>error
                );
            }
        }
    }   
}