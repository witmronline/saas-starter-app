"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
    return (
        <form className="w-full max-w-sm space-y-4 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Login</h2>
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button type="submit" className="w-full">Login</Button>
        </form>
    );
}
