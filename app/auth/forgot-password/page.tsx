import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "忘记密码 | 华因智汇",
  description: "重置您的华因智汇账户密码",
}

export default function ForgotPasswordPage() {
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
            <p className="text-lg">
              "华因智汇的数据分析功能帮助我发现了研究领域中的新趋势，为我的项目提供了新的方向。"
            </p>
            <footer className="text-sm">王芳 副教授，复旦大学生物医学研究院</footer>
          </blockquote>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 opacity-40">
          <Image
            src="/abstract-protein-visualization.png"
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
            <h1 className="text-2xl font-semibold tracking-tight">忘记密码</h1>
            <p className="text-sm text-muted-foreground">请输入您的注册邮箱，我们将发送验证码帮助您重置密码</p>
          </div>
          <ForgotPasswordForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
