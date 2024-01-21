import Image from 'next/image'

interface HeroProps {
  image: string
}

export default function Hero({ image }: HeroProps) {
  return (
    <div className="md:h-screen mx-auto flex flex-col justify-center first:mt-24 items-center">
      <Image
        src={image}
        alt="banner"
        width={1440}
        height={400}
        layout="responsive"
      />
    </div>
  )
}
