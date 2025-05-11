"use client"

import { FileText, User, Users, GitBranch, SearchIcon, Loader2 } from "lucide-react"

interface Suggestion {
  type: "paper" | "researcher" | "team" | "direction" | "search"
  text: string
  url: string
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[]
  isLoading: boolean
  onSuggestionClick: (url: string) => void
  searchQuery: string
}

export function SearchSuggestions({ suggestions, isLoading, onSuggestionClick, searchQuery }: SearchSuggestionsProps) {
  const getIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "paper":
        return <FileText className="h-4 w-4 text-muted-foreground" />
      case "researcher":
        return <User className="h-4 w-4 text-muted-foreground" />
      case "team":
        return <Users className="h-4 w-4 text-muted-foreground" />
      case "direction":
        return <GitBranch className="h-4 w-4 text-muted-foreground" />
      case "search":
        return <SearchIcon className="h-4 w-4 text-muted-foreground" />
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-primary/20 text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
          <span className="ml-2 text-sm text-muted-foreground">正在搜索...</span>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="py-1">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                className="w-full text-left px-4 py-2 hover:bg-muted flex items-center gap-2 text-sm"
                onClick={() => onSuggestionClick(suggestion.url)}
              >
                {getIcon(suggestion.type)}
                <span>{highlightText(suggestion.text, searchQuery)}</span>
              </button>
            </li>
          ))}
          <li className="px-4 py-2 text-xs text-muted-foreground border-t">按 Enter 键查看全部搜索结果</li>
        </ul>
      ) : (
        <div className="p-4 text-sm text-muted-foreground text-center">未找到相关建议</div>
      )}
    </div>
  )
}
