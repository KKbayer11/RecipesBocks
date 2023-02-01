import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector :'[appplaceholder]'
})

export class PlaceHolderDirective {
    constructor (public viewContainRef : ViewContainerRef){

    }
}