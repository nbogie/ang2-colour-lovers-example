import { Component, Input,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ColourLoversService } from './colour-lovers.service';

@Component({
  selector: 'colour-lovers',
  templateUrl: 'app/colour-lovers.component.html'
})
export class ColourLoversComponent {
    constructor(private clService: ColourLoversService){}
    
    @Input() paletteId:number;
    
    palette;
    pattern;
    errorMessage:any;
    jsonVisible:boolean = false;

    
    toggleJSON(){
        this.jsonVisible = !this.jsonVisible;
    }

    changePattern() {
        this.clService.getRandomPattern().subscribe(
            resp => { this.pattern = resp[0] } ,
            error => this.errorMessage = <any>error
        );

    }
    
    changePalette(){
        if (this.paletteId){
            this.clService.getPalette(this.paletteId).subscribe(
                resp  => { this.palette = resp[0] } ,
                error => this.errorMessage = <any>error
            );
        } else {
            this.clService.getRandomPalette().subscribe(
                resp => {  this.palette = resp[0] } ,
                error    => this.errorMessage = <any>error
            );
        }
    }

    ngOnInit() {
        this.changePalette();
    }   
}