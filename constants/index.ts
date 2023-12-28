import {Article, Author} from '@/types';

const author: Author = {
    first_name: 'Author',
    last_name: 'Name',
};
export const articles: Article[] = [];

for (let i = 0; i < 30; i++) {
    const article: Article = {
        id: `article-${i}`,
        title: `Article Title ${i}`,
        content: `This is the content of Article ${i}`,
        summary: `This is the summary of Article ${i}`,
        authors: [author],
        institutions: [`Institution ${i}`],
        publishDate: new Date(),
        keywords: [`keyword1`, `keyword2`],
        pdfUrl: `http://example.com/article-${i}.pdf`,
        references: [`http://example.com/reference-${i}`],
    };

    articles.push(article);
}