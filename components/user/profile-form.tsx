"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  avatar: z.string().optional(),
  nickname: z.string().min(2, {
    message: "昵称至少需要2个字符",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "请选择性别",
  }),
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
  phone: z.string().optional(),
  bio: z
    .string()
    .max(200, {
      message: "个人简介不能超过200个字符",
    })
    .optional(),
  researchInterests: z.string().optional(),
})

export function ProfileForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [tags, setTags] = React.useState<string[]>(["基因组学", "表观遗传学", "生物信息学"])
  const [tagInput, setTagInput] = React.useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
      nickname: "张伟",
      gender: "male",
      email: "zhangwei@example.com",
      phone: "13800138000",
      bio: "北京大学生命科学学院教授，主要研究方向为基因组学和表观遗传学。",
      researchInterests: tags.join(", "),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // 更新研究兴趣标签
    values.researchInterests = tags.join(", ")

    // 模拟API调用
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)

      // 模拟保存成功
      toast({
        title: "保存成功",
        description: "您的个人资料已更新",
      })
    }, 1500)
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center space-y-4">
                  <FormLabel>头像</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/professional-asian-male-scientist.png" alt="头像" />
                        <AvatarFallback>张伟</AvatarFallback>
                      </Avatar>
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        更换头像
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>昵称</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>性别</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">男</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">女</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">其他</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <Button type="button" variant="outline" size="sm" className="shrink-0">
                        修改
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手机号</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <Button type="button" variant="outline" size="sm" className="shrink-0">
                        修改
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>个人简介</FormLabel>
                  <FormControl>
                    <Textarea placeholder="请输入您的个人简介" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>最多200个字符</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="researchInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>研究兴趣</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button
                              type="button"
                              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              <span className="sr-only">删除</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3 w-3"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="输入研究兴趣标签，按回车添加"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>添加您感兴趣的研究领域，以便我们为您推荐相关内容</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            "保存修改"
          )}
        </Button>
      </form>
    </Form>
  )
}
