"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchSuggestions } from "@/components/search/search-suggestions"

interface HomeSearchProps {
  className?: string
  hotSearches?: Array<{ text: string; url: string }>
}

export function HomeSearch({
  className,
  hotSearches = [
    { text: "单细胞测序", url: "/search?q=单细胞测序" },
    { text: "CRISPR", url: "/search?q=CRISPR" },
    { text: "空间转录组", url: "/search?q=空间转录组" },
  ],
}: HomeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Mock suggestions data - in a real app, this would come from an API call
  const suggestions = [
    { type: "paper", text: "论文：肿瘤免疫PD-1相关的最新研究", url: "/search?q=肿瘤免疫PD-1&type=papers" },
    { type: "researcher", text: "学者：张伟 - 北京大学", url: "/researchers/researcher1" },
    { type: "direction", text: "方向：肿瘤免疫治疗", url: "/directions/direction1" },
    { type: "search", text: `搜索：${searchQuery}`, url: `/search?q=${encodeURIComponent(searchQuery)}` },
  ]

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsLoading(true)
      // Simulate API call delay
      const timer = setTimeout(() => {
        setShowSuggestions(true)
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (url: string) => {
    router.push(url)
    setShowSuggestions(false)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="探索生命科学前沿，例如：CRISPR、张锋、肿瘤免疫治疗..."
          className="pl-10 pr-20 h-12 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button className="absolute right-1 top-1 h-10" onClick={handleSearch}>
          搜索
        </Button>

        {showSuggestions && (
          <SearchSuggestions
            suggestions={suggestions}
            isLoading={isLoading}
            onSuggestionClick={handleSuggestionClick}
            searchQuery={searchQuery}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
        热门搜索:
        {hotSearches.map((item, index) => (
          <Link key={index} href={item.url} className="hover:text-primary transition-colors">
            {item.text}
          </Link>
        ))}
        <Link href="/search/advanced" className="text-primary hover:underline ml-auto">
          高级搜索
        </Link>
      </div>
    </div>
  )
}
