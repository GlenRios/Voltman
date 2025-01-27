import Image from "next/image";

const Logo: React.FC<{ width: number, height: number }> = ({ width, height }) => {

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

export default Logo;