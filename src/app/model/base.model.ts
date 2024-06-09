export interface Board {
    id: number;
    name: string;
    description?: string;
    stages?: Stage[];
}

export interface Stage {
    id: number;
    label: string;
    cards: Card[];
}

export interface Card {
    id: number;
    subject: string;
}

