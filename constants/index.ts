import {Article, Author} from '@/types';

const author1: Author = {
    first_name: 'firstName1',
    last_name: 'lastName1',
};
const author2: Author = {
    first_name: 'firstName2',
    last_name: 'lastName2',
};
const author3: Author = {
    first_name: 'firstName3',
    last_name: 'lastName3',
};
const author4: Author = {
    first_name: 'firstName4',
    last_name: 'lastName4',
};
const author5: Author = {
    first_name: 'firstName5',
    last_name: 'lastName5',
};
export const articles: Article[] = [];

for (let i = 0; i < 30; i++) {
    const article: Article = {
        id: `article-${i}`,
        title: `Article Title ${i}`,
        content: `Despite the growing prominence of generative adversarial networks (GANs), optimization in GANs is still a poorly understood topic. In this paper, we analyze the gradient descent'' form of GAN optimization, i.e., the natural setting where we simultaneously take small gradient steps in both generator and discriminator parameters. We show that even though GAN optimization does \emph{not} correspond to a convex-concave game (even for simple parameterizations), under proper conditions, equilibrium points of this optimization procedure are still \emph{locally asymptotically stable} for the traditional GAN formulation. On the other hand, we show that the recently proposed Wasserstein GAN can have non-convergent limit cycles near equilibrium. Motivated by this stability analysis, we propose an additional regularization term for gradient descent GAN updates, which \emph{is} able to guarantee local stability for both the WGAN and the traditional GAN, and also shows practical promise in speeding up convergence and addressing mode collapse.`,
        summary: `This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}This is the summary of Article ${i}`,
        authors: [author1, author2, author3, author4, author5],
        institutions: [`Institution ${i}`, `Institution ${i + 1}`, `Institution ${i + 2}`],
        publishDate: new Date(),
        keywords: [`keyword1`, `keyword2`, `keyword3`, `keyword4`, `keyword5`, `keyword6`],
        pdfUrl: `http://example.com/article-${i}.pdf`,
        references: [`http://example.com/reference-${i}`, `http://example.com/reference-${i + 1}`, `http://example.com/reference-${i + 2}`],
    };

    articles.push(article);
}