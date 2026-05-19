import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-mark',
  imports: [],
  templateUrl: './status-mark.html',
  styleUrls: ['./status-mark.scss'],
})
export class StatusMarkComponent {
    /** Input property to receive the status from the parent component. */
    status = input.required<string>();

    getSvgPath(status: string): string {
        switch (status) {
            case 'completed':
                return '/completed.svg';
            case 'in-progress':
                return '/in-progress.svg';
            case 'failed':
                return '/failed.svg';
            case 'undetermined':
                return '/undetermined.svg';
            default:
                return '';
        }
    }

    getStatusSymbol(status: string): string {
        switch (status) {
            case 'completed':
                return '✔️';
            case 'in-progress':
                return '⏳';
            case 'failed':
                return '❌';
            case 'undetermined':
                return '❔';
            default:
                return '';
        }
    }
}
