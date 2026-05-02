import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {

    items = [
        { label: 'Първо обещание', details: 'Съдържание на първото обещание', completed: 'completed' as const },
        { label: 'Второ обещание', details: 'Съдържание на второто обещание', completed: 'unknown' as const },
        { label: 'Трето обещание', details: 'Съдържание на третото обещание', completed: 'abandoned' as const },
    ];

    get activeIndex(): number {
        return this.items.findIndex(item => item.completed !== 'completed');
    }

    selectedIndex = signal<number | null>(null);

    select(index: number): void {
        this.selectedIndex.set(index);
    }

}
