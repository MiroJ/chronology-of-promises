import { Component, input } from '@angular/core';
import { ProgramItem } from '../app';
import { StatusMarkComponent } from '../status-mark/status-mark';

@Component({
    selector: 'app-program-item',
    imports: [StatusMarkComponent],
    templateUrl: './program-item.html',
    styleUrls: ['./program-item.scss'],
})
export class ProgramItemComponent {
    /** Input property to receive a program item from the parent component. */
    programItem = input.required<ProgramItem>();

}
