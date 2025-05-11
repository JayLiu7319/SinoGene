"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SearchSuggestions } from "@/components/search/search-suggestions"

interface HeaderSearchProps {
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
  className?: string
}

export function HeaderSearch({ isExpanded, setIsExpanded, className }: HeaderSearchProps) {
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
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

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
      setIsExpanded(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    } else if (e.key === "Escape") {
      setIsExpanded(false)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (url: string) => {
    router.push(url)
    setShowSuggestions(false)
    setIsExpanded(false)
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
    <div className={cn("relative", className)}>
      {isExpanded ? (
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="搜索论文、学者、团队、方向..."
            className="w-full pl-9 pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => {
              setIsExpanded(false)
              setSearchQuery("")
              setShowSuggestions(false)
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">关闭搜索</span>
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
      ) : (
        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setIsExpanded(true)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">搜索</span>
        </Button>
      )}
    </div>
  )
}
