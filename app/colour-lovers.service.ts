import {Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

@Injectable()
export class ColourLoversService {
    constructor(private jsonp: Jsonp) {}

    getRandomPalette():Observable<any>{    

        let params = new URLSearchParams();
        params.set('format', 'json');
        params.set('jsonCallback', 'JSONP_CALLBACK');
        params.set('showPaletteWidths', '1');

        return this.jsonp
                .get('http://www.colourlovers.com/api/palettes/random', {search: params})
                .map(this.extractData)
                .catch(this.handleError);    
    }
    getPalette(id: number):Observable<any>{ 
    
        let params = new URLSearchParams();
        params.set('format', 'json');
        params.set('jsonCallback', 'JSONP_CALLBACK');
        params.set('showPaletteWidths', '1');

        return this.jsonp
                .get('http://www.colourlovers.com/api/palette/' + id, {search: params})
                .map(this.extractData)
                .catch(this.handleError);    
    }

    getRandomPattern():Observable<any>{
        let params = new URLSearchParams();
        params.set('format', 'json');
        params.set('jsonCallback', 'JSONP_CALLBACK');

        return this.jsonp
                .get('http://www.colourlovers.com/api/patterns/random', {search: params})
                .map(this.extractData)
                .catch(this.handleError);        
    }


    private extractData(res: Response) {
        return res.json();        
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("ColourLoversService#handleError() got " + JSON.stringify(errMsg));
        return Observable.throw(errMsg);
    }
}

    


/**
 * Notes: 
 *
 * ColourLovers API requires the callback parameter be named jsonCallback.

 * From https://angular.io/docs/ts/latest/guide/server-communication.html
 *    we note that:
 * 
 * The JSONP technique requires that we pass a callback function name to
 * the server in the query string: callback=JSONP_CALLBACK. 
 * The server uses that name to build a JavaScript wrapper function in 
 * its response which Angular ultimately calls to extract the data. 
*/