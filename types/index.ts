
export interface User {
    id: string;
    first_name: string;
    email: string;
    last_name:string;
    username?: string;
    role?: number;
    //TODO add the other fields
}

export interface Article {
    // TODO: decided whether it'll be elasticsearch ID or postgres ID
    id: string;
    title: string;
    validated: boolean;
    content: string;
    summary: string;
    authors: Author[]
    institutions: {name: string}[];
    publishDate: Date;
    keywords: string[];
    pdfUrl: string
    references: string[];
}

export interface Author {
    // TODO: remove the export
    first_name: string;
    last_name: string;
}
