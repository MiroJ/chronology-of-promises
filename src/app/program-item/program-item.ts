import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ProgramItem } from '../app';
import { StatusMarkComponent } from '../status-mark/status-mark';

@Component({
    selector: 'app-program-item',
    imports: [StatusMarkComponent],
    templateUrl: './program-item.html',
    styleUrls: ['./program-item.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramItemComponent {
    /** Input property to receive a program item from the parent component. */
    programItem = input.required<ProgramItem>();
    readonly expandedReferences = signal<Record<string, boolean>>({});

    toggleReferences(referenceListId: string): void {
        this.expandedReferences.update((expanded) => ({
            ...expanded,
            [referenceListId]: !expanded[referenceListId],
        }));
    }

    isReferencesExpanded(referenceListId: string): boolean {
        return this.expandedReferences()[referenceListId] ?? false;
    }

    getReferenceListId(subpointId: number, resultIndex: number): string {
        return `subpoint-${subpointId}-result-${resultIndex}-references`;
    }

    urlProtocol(url: string): string {
        const match = url.match(/^https?:\/\//);
        return match?.[0] ?? '';
    }

    urlDomain(url: string): string {
        const withoutProtocol = url.replace(/^https?:\/\//, '');
        const match = withoutProtocol.match(/^([^/]+)/);
        return match ? match[1] : withoutProtocol;
    }

    urlPath(url: string): string {
        const withoutProtocol = url.replace(/^https?:\/\//, '');
        const match = withoutProtocol.match(/^[^/]+(\/.*)?$/);
        return match?.[1] ?? '';
    }
}
