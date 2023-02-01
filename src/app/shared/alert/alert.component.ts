import { Component, EventEmitter, Input, Output } from "@angular/core";


@ Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertCompenent {
@Input() message! : string ;
@Output() close = new EventEmitter<void>();

Onclose(){
    this.close.emit();
}
}