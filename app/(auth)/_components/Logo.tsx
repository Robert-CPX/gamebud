import Image from 'next/image'

const Logo = () => {
  return (
    <div className='flex flex-col gap-2 items-center'>
      <Image src='/invader.svg' alt='invader' width={80} height={80} className='dark:invert' />
      <div className='flex flex-col items-center'>
        <p className='text-xl font-bold'>Gamebud</p>
        <p className='text-sm font-normal text-muted-foreground'>Let&apos;s play</p>
      </div>
    </div>
  )
}

export default Logo
