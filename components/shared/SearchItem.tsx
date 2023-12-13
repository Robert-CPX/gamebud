'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const SearchItem = () => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const handleSearchAction = () => {

  }
  return (
    <React.Fragment>
      <Input type='search' placeholder="Search" className='rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0' onChange={handleInput} />
      <Button variant="outline" size="icon" className='rounded-l-none' onClick={handleSearchAction}>
        <Search className="h-5 w-5" />
      </Button>
    </React.Fragment>
  )
}

export default SearchItem
