import Card from "@/components/Card";
import BackLink from "@/components/BackLink";
import Image from "next/image";

export default function FormContainer({children, iconPath, heading, IconAlt}) {
    return (
        <>
            <div className="my-4">
                <div className="max-w-xl sm:mx-auto mx-4">
                    <BackLink />
                    <Card tailwindStyles={'bg-white rounded-lg mt-10 relative'}>
                        <Image 
                            width='56' 
                            height='56' 
                            className="absolute -top-7"
                            src={iconPath}
                            alt={IconAlt} />
                        <h1 className="font-bold text-2xl mt-5 text-dark-grey mb-8">{heading}</h1>
                        {children}
                    </Card>
                </div>
            </div>
        </>
    )
}