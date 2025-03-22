import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const navigation = {
  shop: [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Sale", href: "/sale" },
  ],
  account: [
    { name: "Sign In", href: "/auth/signin" },
    { name: "Register", href: "/auth/signup" },
    { name: "Order History", href: "/account/orders" },
    { name: "My Account", href: "/account" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <h3 className="text-sm font-semibold leading-6">Shop</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.shop.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pb-6">
            <h3 className="text-sm font-semibold leading-6">Account</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.account.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pb-6">
            <h3 className="text-sm font-semibold leading-6">Company</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} E-Commerce, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 