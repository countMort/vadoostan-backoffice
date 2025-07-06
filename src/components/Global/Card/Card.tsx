import { CardProps } from "@/types/components/Card";
import Image from "next/image";

// Horizontal Card
const Card = ({ imageUrl, title, description, classNames }: CardProps) => {
  return (
    <div
      className={`${classNames?.wrapper} flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800`}
    >
      {imageUrl && (
        <Image
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={imageUrl}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
        />
      )}
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
