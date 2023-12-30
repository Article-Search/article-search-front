import {Card, CardBody, Chip, ScrollShadow} from "@nextui-org/react";
import {Article} from "@/types"
import Image from "next/image";

interface FeedProps {
    articles: Article[];
    searchValue: string;
}

export default function Feed({articles, searchValue}: FeedProps) {
    return (
        <div className="flex flex-col justify-center gap-12">
            <ScrollShadow className="ScrollShadow w-screen max-w-4xl h-screen min-h-screen">
                <div className="flex flex-col items-center justify-center gap-9 w-screen max-w-4xl p-4">
                    {articles.map((article, index) => (
                        <Card
                            key={index}
                        >
                            <CardBody>
                                <div className="flex gap-4 justify-center">
                                    <div className="flex flex-col items-center justify-center w-2/5">
                                        <Image
                                            src="/assets/icons/document.svg"
                                            alt="Document"
                                            width={73}
                                            height={73}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xl font-bold">{article.title}</h1>
                                        <div className="flex gap-2">
                                            {article.keywords.slice(0, 3).map((keyword, index) => (
                                                <Chip key={index} className="shrink-0 text-[#17C964] bg-[#E8FAF0]"
                                                      variant="flat" size="md">{keyword}</Chip>
                                            ))}
                                            {article.keywords.length > 3 && (
                                                <Chip className="shrink-0 text-[#17C964] bg-[#E8FAF0]"
                                                      variant="flat" size="md">+{article.keywords.length - 3}</Chip>
                                            )}
                                        </div>
                                        <div>
                                            <p className="shrink-0 text-gray-400 text-small overflow-hidden overflow-ellipsis">
                                                {article.summary}
                                            </p>
                                        </div>
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