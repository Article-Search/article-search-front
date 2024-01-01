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
import {useState} from "react";
import {motion} from "framer-motion";

interface FeedProps {
    articles: Article[];
    searchValue: string;
}

export default function Feed({articles, searchValue}: FeedProps) {
    const [cardIndex, setCardIndex] = useState<number>(0)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div className="flex flex-col justify-center gap-12">
            <ScrollShadow className="ScrollShadow w-screen max-w-4xl h-[61vh] overscroll-x-none">
                <div className="flex flex-col items-center justify-center gap-9 w-screen max-w-4xl p-4">
                    {articles.map((article, index) => (
                        <>
                            <Card
                                key={index}
                                className="card-hover-effect transition"
                                shadow="md"
                                onPress={() => {
                                    setCardIndex(index)
                                    onOpen()
                                }}
                                isPressable
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

                        </>
                    ))}
                </div>
            </ScrollShadow>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="4xl" placement="center">
                <ModalContent className="max-h-[90vh] h-[90vh] max-md:h-[60vh] overflow-scroll p-4" >
                        <>
                            <ModalHeader className="flex justify-between items-center">
                                <h1 className="text-4xl font-bold ">
                                    {articles[cardIndex].title}
                                </h1>
                                <Button isIconOnly disableRipple className="bg-transparent">
                                    <motion.div whileTap={{scale: 1.2}}>
                                        <Image src="/assets/icons/star.svg" alt="Star" width={35} height={35}/>
                                    {/*    TODO: use a filled image if it's already in the user's favorite articles*/}
                                    </motion.div>
                                </Button>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4 w-full flex-wrap">
                                        {articles[cardIndex].keywords.map((keyword, index) => (
                                            <Chip key={index} className="shrink-0 text-[#17C964] bg-[#E8FAF0] text-xl"
                                                  variant="flat" size="md">{keyword}</Chip>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-2xl text-[#6A6F75] font-bold">Description</h2>
                                        <ScrollShadow className="h-52">
                                            {articles[cardIndex].content}
                                        </ScrollShadow>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                    <h2 className="text-2xl text-[#6A6F75] font-bold">Authors</h2>
                                        <p className="">{articles[cardIndex].authors.map(author => `${author.first_name} ${author.last_name}`).join(', ')}</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-2xl text-[#6A6F75] font-bold">Institutions</h2>
                                        <p className="">{articles[cardIndex].institutions.join(', ')}</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-2xl text-[#6A6F75] font-bold">References</h2>
                                        <ul className="list-disc ml-5">
                                            {articles[cardIndex].references.map((reference, index) => (
                                                <li key={index} className="">
                                                    {reference}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                </ModalContent>
            </Modal>
        </div>
    );
}