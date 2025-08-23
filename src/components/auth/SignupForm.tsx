"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
    return (
        <form className="w-full max-w-sm space-y-4 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Sign Up</h2>
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button type="submit" className="w-full">Create Account</Button>
        </form>
    );
}
