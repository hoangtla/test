import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium">Về chúng tôi</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-primary">
                  Báo chí
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Hỗ trợ</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary">
                  Vận chuyển
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-primary">
                  Đổi trả
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Chính sách</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Điều khoản
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-sm text-muted-foreground hover:text-primary">
                  Bảo hành
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Theo dõi chúng tôi</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="https://facebook.com" className="text-sm text-muted-foreground hover:text-primary">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com" className="text-sm text-muted-foreground hover:text-primary">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com" className="text-sm text-muted-foreground hover:text-primary">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com" className="text-sm text-muted-foreground hover:text-primary">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Store. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
} 