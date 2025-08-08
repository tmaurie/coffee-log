import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/infra/auth-server";
import HeaderClient from "./header-client";

export default async function Header() {
    const session = await getServerSession(authOptions);
    return <HeaderClient email={session?.user?.email ?? null}/>;
}
