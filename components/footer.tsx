import Link from "next/link"
import { Logo } from "@/components/logo"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold">华因智汇</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              华因智汇是一个专业的生物基因科研情报平台，致力于为科研工作者提供数据驱动的智能洞察。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">平台</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/papers" className="text-muted-foreground hover:text-primary transition-colors">
                  科研论文
                </Link>
              </li>
              <li>
                <Link href="/researchers" className="text-muted-foreground hover:text-primary transition-colors">
                  科研学者
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-muted-foreground hover:text-primary transition-colors">
                  科研团队
                </Link>
              </li>
              <li>
                <Link href="/directions" className="text-muted-foreground hover:text-primary transition-colors">
                  科研方向
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="text-muted-foreground hover:text-primary transition-colors">
                  排名与洞察
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">关于我们</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  公司介绍
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-muted-foreground hover:text-primary transition-colors">
                  加入我们
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  帮助中心
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">法律</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 华因智汇 (SinoGene Insights). 保留所有权利。
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">微信</span>
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
                <path d="M9.5 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h.5c1.1 0 2-.9 2-2s-.9-2-2-2H7.82C6.26 2.5 5 3.76 5 5.32V12c0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5v-2.08c0-1.24-1.01-2.25-2.25-2.25H16c-.41 0-.75.34-.75.75s.34.75.75.75h.17c.41 0 .75.34.75.75V12c0 1.66-1.34 3-3 3h-4c-1.66 0-3-1.34-3-3V5.32c0-.45.37-.82.82-.82H10c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2h-.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">微博</span>
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
                className="lucide lucide-weibo"
              >
                <path d="M9.5 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h.5c1.1 0 2-.9 2-2s-.9-2-2-2H7.82C6.26 2.5 5 3.76 5 5.32V12c0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5v-2.08c0-1.24-1.01-2.25-2.25-2.25H16c-.41 0-.75.34-.75.75s.34.75.75.75h.17c.41 0 .75.34.75.75V12c0 1.66-1.34 3-3 3h-4c-1.66 0-3-1.34-3-3V5.32c0-.45.37-.82.82-.82H10c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2h-.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
