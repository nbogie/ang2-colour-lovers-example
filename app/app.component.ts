import { Component } from '@angular/core';
import { ColourLoversComponent } from './colour-lovers.component';
import { JSONP_PROVIDERS }  from '@angular/http';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ColourLoversComponent],
  providers: [ JSONP_PROVIDERS ]
})
export class AppComponent { }