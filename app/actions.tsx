"use server"

import AnimeCard, { AnimeProp } from "@/components/AnimeCard"
import { API_BASE_URL } from "@/const"

const LIMIT = 4

export const fetchAnimes = async (page: number) => {
  const response = await fetch(
    `${API_BASE_URL}?page=${page}&limit=${LIMIT}&order=popularity`
  )

  const data = await response.json()

  // return JSX
  return data?.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ))
}
