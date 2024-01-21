import Link from 'next/link'

interface CrumbItem {
  label: string
  href: string
}

interface BreadcrumsProps {
  items: CrumbItem[]
}

export default function Breadcrums({ items }: BreadcrumsProps) {
  return (
    <div className="flex gap-2 items-start">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        if (!isLast) {
          return (
            <>
              <Link
                href={item.href}
                key={item.href}
                className="text-indigo-500 hover:text-indigo-400 hover:underline"
              >
                {item.label}
              </Link>
              <span className="text-gray-400">/</span>
            </>
          )
        } else {
          return item.label
        }
      })}
    </div>
  )
}
