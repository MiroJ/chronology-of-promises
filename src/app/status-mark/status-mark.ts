import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-status-mark',
  imports: [],
  templateUrl: './status-mark.html',
  styleUrls: ['./status-mark.scss'],
})
export class StatusMarkComponent {
    /** Input property to receive the status from the parent component. */
    status = input<string>('');
    private readonly location = inject(Location);

    getSvgPath(status: string): string {
        switch (status) {
            case 'completed':
                return this.location.prepareExternalUrl('completed.svg');
            case 'in-progress':
                return this.location.prepareExternalUrl('in-progress.svg');
            case 'failed':
                return this.location.prepareExternalUrl('failed.svg');
            case 'undetermined':
                return this.location.prepareExternalUrl('undetermined.svg');
            default:
                return '';
        }
    }
}
