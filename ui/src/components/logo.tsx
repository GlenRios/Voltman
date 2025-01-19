import Image from "next/image";

export default function logo(width: number, height: number) {

    return (
        <Image
            src="/images/logo.png"
            alt="Logo"
            width={width}
            height={height}
            className="object-contain object-center mr-1"
        />
    );
}