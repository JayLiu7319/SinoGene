"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

// 步骤1：输入邮箱
const emailSchema = z.object({
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
})

// 步骤2：输入验证码
const verificationSchema = z.object({
  email: z.string().email(),
  verificationCode: z.string().min(4, {
    message: "验证码至少需要4个字符",
  }),
})

// 步骤3：设置新密码
const passwordSchema = z
  .object({
    email: z.string().email(),
    verificationCode: z.string().min(4),
    password: z.string().min(6, {
      message: "密码至少需要6个字符",
    }),
    confirmPassword: z.string().min(6, {
      message: "确认密码至少需要6个字符",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  })

type EmailFormValues = z.infer<typeof emailSchema>
type VerificationFormValues = z.infer<typeof verificationSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

export function ForgotPasswordForm() {
  const router = useRouter()
  const [step, setStep] = React.useState<number>(1)
  const [formData, setFormData] = React.useState<Partial<PasswordFormValues>>({})
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSendingCode, setIsSendingCode] = React.useState<boolean>(false)
  const [countdown, setCountdown] = React.useState<number>(0)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false)

  // 步骤1表单
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: formData.email || "",
    },
  })

  // 步骤2表单
  const verificationForm = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      email: formData.email || "",
      verificationCode: formData.verificationCode || "",
    },
  })

  // 步骤3表单
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: formData.email || "",
      verificationCode: formData.verificationCode || "",
      password: "",
      confirmPassword: "",
    },
  })

  // 处理步骤1提交
  async function onEmailSubmit(values: EmailFormValues) {
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      setFormData({ ...formData, ...values })
      setIsLoading(false)
      setStep(2)
      handleSendCode()
    }, 1000)
  }

  // 处理步骤2提交
  async function onVerificationSubmit(values: VerificationFormValues) {
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      setFormData({ ...formData, ...values })
      setIsLoading(false)
      setStep(3)
    }, 1000)
  }

  // 处理步骤3提交
  async function onPasswordSubmit(values: PasswordFormValues) {
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)

      // 模拟重置密码成功
      toast({
        title: "密码重置成功",
        description: "您的密码已成功重置，请使用新密码登录",
      })

      // 重定向到登录页
      router.push("/auth/login")
    }, 1500)
  }

  const handleSendCode = () => {
    const email = formData.email || emailForm.getValues("email")
    if (!email || !email.includes("@")) {
      emailForm.setError("email", {
        type: "manual",
        message: "请输入有效的邮箱地址",
      })
      return
    }

    setIsSendingCode(true)

    // 模拟发送验证码
    setTimeout(() => {
      setIsSendingCode(false)
      setCountdown(60)

      toast({
        title: "验证码已发送",
        description: `验证码已发送至 ${email}`,
      })
    }, 1000)
  }

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <div className="space-y-4">
      {/* 步骤指示器 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            1
          </div>
          <div className={`h-1 w-8 ${step > 1 ? "bg-primary" : "bg-muted"}`} />
        </div>
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            2
          </div>
          <div className={`h-1 w-8 ${step > 2 ? "bg-primary" : "bg-muted"}`} />
        </div>
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            3
          </div>
        </div>
      </div>

      {/* 步骤1：输入邮箱 */}
      {step === 1 && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入您注册时使用的邮箱" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  提交中...
                </>
              ) : (
                "下一步"
              )}
            </Button>
          </form>
        </Form>
      )}

      {/* 步骤2：输入验证码 */}
      {step === 2 && (
        <Form {...verificationForm}>
          <form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="space-y-4">
            <FormField
              control={verificationForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={verificationForm.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>验证码</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input placeholder="请输入验证码" {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={handleSendCode}
                        disabled={isSendingCode || countdown > 0}
                      >
                        {isSendingCode ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : countdown > 0 ? (
                          `${countdown}秒后重发`
                        ) : (
                          "重新发送"
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                上一步
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    验证中...
                  </>
                ) : (
                  "下一步"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* 步骤3：设置新密码 */}
      {step === 3 && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新密码</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="请设置新密码" {...field} />
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
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>确认新密码</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showConfirmPassword ? "text" : "password"} placeholder="请确认新密码" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showConfirmPassword ? "隐藏密码" : "显示密码"}</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="w-full" onClick={() => setStep(2)}>
                上一步
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    提交中...
                  </>
                ) : (
                  "重置密码"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
