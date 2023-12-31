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
            <ScrollShadow className="ScrollShadow w-screen max-w-4xl h-[61vh] overscroll-x-none">
                <div className="flex flex-col items-center justify-center gap-9 w-screen max-w-4xl p-4">
                    {articles.map((article, index) => (
                        <Card
                            key={index}
                            className="card-hover-effect transition"
                            shadow="md"
                        >
                            <CardBody>
                                <div className="flex gap-4 justify-center w-[41rem] h-[7rem] px-4">
                                    <div className="flex flex-col items-center justify-center w-2/5">
                                        <Image
                                            src="/assets/icons/document.svg"
                                            alt="Document"
                                            width={73}
                                            height={73}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center">
                                        <h1 className="text-xl font-bold line-clamp-1">{article.title}</h1>
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
                                        <p className="text-gray-400 text-small line-clamp-2">
                                            {article.summary}
                                        </p>
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