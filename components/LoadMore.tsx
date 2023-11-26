"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { fetchAnimes } from "@/app/actions"

let page = 2

type DataProp = JSX.Element

function LoadMore() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const [data, setdata] = useState<DataProp[]>([])

  useEffect(() => {
    if (isInView) {
      ;(async () => {
        const animes = await fetchAnimes(page)
        setdata((prev) => [...prev, ...animes])
        page++
      })()
    }
  }, [isInView])

  return (
    <>
      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
        {data}
      </section>
      <section className='flex justify-center items-center w-full'>
        <div ref={ref}>
          <Image
            src='./spinner.svg'
            alt='spinner'
            width={56}
            height={56}
            className='object-contain'
          />
        </div>
      </section>
    </>
  )
}

export default LoadMore
