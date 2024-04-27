// Define the User interface
export interface User {
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

export interface Option {
    value: string;
    label: string;
    selected?: boolean; // Optional for Dietary filter
};

/**** Recipe interface */
export interface Recipe {
    owner?: string | null;
    title: string;
    id: number;
    yield: number;
    // recipeCode: string;
    time: string;
    prepTime: number;
    cookTime: number;
    totalTime: number;
    comments: Comment[];
    isFavourited?: boolean;
    rating: number;
    imageUrl: string;
    place: string;
    ingredients: string[];
    tips: string[];
    instructions: string[];
}