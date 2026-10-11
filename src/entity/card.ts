export const COLOR_TYPE_NONE = "none";
export const COLOR_TYPE_FIXED = "fixed";
export const COLOR_TYPE_SOME = "some";

export type Card = {
    id: number;
    game_variant: string;
    category: string;
    sort: string[];
    name: string;
    display_name: string;
    amount: number;
    score: string;
    condition: string;
    sub_question: string;
    sub_question_max: string;
    belongs_to: string;
    canonical_name: string; // belongs_to ?? name
    colors: string[];
    colorType: string;
};
