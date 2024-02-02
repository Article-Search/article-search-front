'use client'
import {
    Button,
    Card,
    CardBody,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ScrollShadow,
    useDisclosure
} from "@nextui-org/react";
import {Article} from "@/types"
import Image from "next/image";
import {useState, Fragment} from "react";
import {motion} from "framer-motion";
import {router} from "next/client";

interface FeedProps {
    articles: Article[];
    documentImagePath: string
}

export default function ModeratorFeed({articles, documentImagePath}: FeedProps) {
    const [cardIndex, setCardIndex] = useState<number>(0)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div className="flex flex-col justify-center gap-12">
            <ScrollShadow className="ScrollShadow w-screen max-w-4xl h-[61vh] overscroll-x-none">
                <div className="flex flex-col items-center justify-center gap-9 w-screen max-w-4xl p-4">
                    {articles.map((article, index) => (
                        <Fragment key={index}>
                            <Card
                                className="card-hover-effect transition"
                                shadow="md"
                                onPress={() => {
                                    setCardIndex(index)
                                    router.push(`/moderator/review/${article.id}`)
                                }}
                                isPressable
                            >
                                <CardBody>
                                    <div className="flex gap-4 justify-center w-[41rem] h-[7rem] px-4">
                                        <div className="flex flex-col items-center justify-center w-2/5">
                                            <Image
                                                src={documentImagePath}
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

                        </Fragment>
                    ))}
                </div>
            </ScrollShadow>
        </div>
    );
}