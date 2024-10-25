'use-client'

import toast from "react-hot-toast";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";

interface ApiAlertPorps {
    title: string;
    description: string;
    variant: "public" | "admin"
}

const textMap: Record<ApiAlertPorps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertPorps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export const ApiAlert: React.FC<ApiAlertPorps> = ({
    title,
    description,
    variant = "public"
}) => {

//untuk coppy api
const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Berhasil diCopy");
};

    return (
        <Alert>
            <Server className="h-4 w-4" />
            <AlertTitle>
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0,3rem] py-[0,2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button variant="outline" size="sm" onClick={onCopy}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}