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

    getStatusClass(status: string): string {
        switch (status) {
            case 'completed':
                return 'status-completed';
            case 'in-progress':
                return 'status-in-progress';
            case 'failed':
                return 'status-failed';
            case 'undetermined':
                return 'status-undetermined';
            default:
                return '';
        }
    }

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
