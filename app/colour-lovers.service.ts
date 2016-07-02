import {Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

@Injectable()
export class ColourLoversService {
    constructor(private jsonp: Jsonp) {}

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
}

