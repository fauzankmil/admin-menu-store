'use client'

import { cn } from "@/lib/utils";  // Assuming you have a utility for class names
import Link from "next/link";       // Corrected import for Link
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Dashboard',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/banners`, // Fixed href
            label: 'Banners',
            active: pathname === `/${params.storeId}/banners`, // Ensure this matches your route
        },
        {
            href: `/${params.storeId}/categories`, // Fixed href
            label: 'Categories',
            active: pathname === `/${params.storeId}/categories`, // Ensure this matches your route
        },
        {
            href: `/${params.storeId}/products`, // Fixed href
            label: 'Products',
            active: pathname === `/${params.storeId}/products`, // Ensure this matches your route
        },
        {
            href: `/${params.storeId}/settings`, // Fixed href
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`, // Ensure this matches your route
        }

    ];

    return (
        <nav className={cn(
            "flex items-center space-x-4 lg:space-x-6",
            className
        )}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground" // Fixed typo here
                    )}
                    {...props} // Spread additional props to the Link
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
