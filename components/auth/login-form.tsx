"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
  password: z.string().min(6, {
    message: "密码至少需要6个字符",
  }),
  rememberMe: z.boolean().default(false),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)

      // 模拟登录成功
      toast({
        title: "登录成功",
        description: "欢迎回到华因智汇",
      })

      // 重定向到首页
      router.push("/")
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="请输入邮箱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="请输入密码" {...field} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "隐藏密码" : "显示密码"}</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">记住我</FormLabel>
              </FormItem>
            )}
          />
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            忘记密码？
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              登录中...
            </>
          ) : (
            "登录"
          )}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">或通过以下方式登录</span>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-wechat"
            >
              <path d="M9.817 17.18a.5.5 0 0 0-.82.566l.72 1.129A.97.97 0 0 1 9.82 20h-.5a1 1 0 0 1-.51-.14 13 13 0 0 1-3.5-2.47A12.88 12.88 0 0 1 4.167 16" />
              <path d="M9.952 17c-4.578.004-8.39-3.571-8.4-8.056-.013-4.482 3.82-8.07 8.398-8.083 4.577-.013 8.39 3.56 8.404 8.04.012 4.482-3.822 8.07-8.402 8.099Z" />
              <path d="M13.9 20.513a.96.96 0 0 0 .962-.741l.35-1.409a.5.5 0 0 1 .76-.35l1.328.764c.29.173.618-.094.49-.416l-.34-.866a.5.5 0 0 1 .326-.645 9.03 9.03 0 0 0 1.97-.844 8.994 8.994 0 0 0 2.93-2.902 8.848 8.848 0 0 0 1.17-7.942 8.898 8.898 0 0 0-1.739-2.868" />
            </svg>
            <span className="sr-only">微信登录</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
