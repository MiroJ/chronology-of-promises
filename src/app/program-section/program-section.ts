import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgramSection } from '../app';
import { ProgramResultsComponent } from '../program-results/program-results';

@Component({
    selector: 'app-program-section',
    imports: [
        ProgramResultsComponent,
    ],
    templateUrl: './program-section.html',
    styleUrls: ['./program-section.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramSectionComponent {
    /** Input property to receive a program section from the parent component. */
    programSection = input.required<ProgramSection>();
}
