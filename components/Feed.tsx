import {Card, CardBody, ScrollShadow, Chip} from "@nextui-org/react";
import {Article} from "@/types"
import Image from "next/image";

interface FeedProps {
    articles: Article[];
    searchValue: string;
}

export default function Feed({articles, searchValue}: FeedProps) {
    return (
        <div className="flex flex-col justify-center gap-12">
            <p>{articles.length} results found for <b>{searchValue}</b></p>
            <ScrollShadow className="max-w-lg h-96">
                <div className="flex flex-col gap-4 max-w-lg">
                    {articles.map((article, index) => (
                        <Card
                            key={index}
                        >
                            <CardBody>
                                <div className="flex gap-4">
                                    <Image
                                        src="/assets/icons/document.svg"
                                        alt="Document"
                                        width={20}
                                        height={20}
                                    />
                                    <div className="flex flex-col">
                                        <h1>{article.title}</h1>
                                        <div className="flex gap-2">
                                            {article.keywords.map((keyword, index) =>(
                                            <Chip key={index} color="primary">{keyword}</Chip>
                                            ))}
                                        </div>
                                        <div><p>{article.summary}</p></div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </ScrollShadow>
        </div>
    );
}