import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "注册 | 华因智汇",
  description: "创建您的华因智汇账户，探索生物基因科研情报",
}

export default function RegisterPage() {
  return (
    <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="华因智汇" width={32} height={32} />
            <span>华因智汇</span>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">"华因智汇平台整合了海量的生物基因科研数据，为我的研究提供了宝贵的参考和洞察。"</p>
            <footer className="text-sm">李明 研究员，中国科学院遗传与发育生物学研究所</footer>
          </blockquote>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 opacity-40">
          <Image
            src="/placeholder.svg?key=ub8sc"
            alt="科学数据可视化"
            width={800}
            height={400}
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">创建您的华因智汇账户</h1>
            <p className="text-sm text-muted-foreground">填写以下信息完成注册</p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            已有账户？{" "}
            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
              直接登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
