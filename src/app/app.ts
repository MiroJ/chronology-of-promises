import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProgramItemComponent } from './program-item/program-item';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ProgramItemComponent],
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
    private http = inject(HttpClient);

    readonly programItems = signal<ProgramItem[]>([]);
    readonly title = signal('');

    ngOnInit(): void {
        forkJoin({
            dataPrograms: this.http.get<ProgramData>('data-program.json'),
            dataResults: this.http.get<ResultItem[]>('data-results.json')
        }).subscribe(({ dataPrograms, dataResults }) => {
            this.title.set(dataPrograms.title);

            const linkedProgramItems = dataPrograms.items.map(item => ({
                ...item,
                relatedResultItems: [] as ResultItem[],
                subpoints: item.subpoints.map(sp => ({
                    ...sp,
                    relatedResultItems: [] as ResultItem[]
                }))
            }));

            for (const resultItem of dataResults) {
                if (!resultItem.programIds?.length) {
                    continue;
                }

                for (const id of resultItem.programIds) {
                    if (id.includes('.')) {
                        const [itemId, subpointId] = id.split('.').map(Number);
                        const programItem = linkedProgramItems.find(pi => pi.id === itemId);
                        const subpoint = programItem?.subpoints.find(sp => sp.id === subpointId);

                        if (subpoint) {
                            subpoint.relatedResultItems.push(resultItem);
                        }
                    } else {
                        const itemId = Number(id);
                        const programItem = linkedProgramItems.find(pi => pi.id === itemId);

                        if (programItem) {
                            programItem.relatedResultItems.push(resultItem);
                        }
                    }
                }
            }

            this.programItems.set(linkedProgramItems);
        });
    }

}

// Models data-program.json

export interface ProgramData {
    title: string;
    items: ProgramItem[];
}

export interface ProgramItem {
    id: number;
    label: string;
    subpoints: ProgramSubpoint[];
    relatedResultItems: ResultItem[];
}

export interface ProgramSubpoint {
    id: number;
    label: string;
    relatedResultItems: ResultItem[];
}

// Models data-results.json

export interface ResultItem {
    programIds: string[]; // References to program items (e.g., "1", "2.1")
    label: string;
    date: Date;
    description: string;
    status: '' | 'ok' | 'succeeded' | 'failed';
    imageUrl: string;
    references: string[];
}
