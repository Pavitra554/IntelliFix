import Image from "next/image";

type Props = {
  textSize: string;
  logosize: number;
};
export default function ProductLogo({ textSize, logosize }: Props) {
  return (
    <div className='flex flex-row items-center'>
      <div>
        <Image
          src={"/logo.svg"}
          alt='logo'
          width={logosize}
          height={logosize}
        />
      </div>
      <div className={`${textSize} font-bold text-zinc-50`}>IntelliFix</div>
    </div>
  );
}
