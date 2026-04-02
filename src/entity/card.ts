export type Card = {
    id: number;
    game_variant: string;
    category: string;
    sort: string[];
    name: string;
    amount: number;
    score: string;
    condition: string;
    sub_question: string;
    belongs_to: string;
    canonical_name: string; // belongs_to ?? name
};
