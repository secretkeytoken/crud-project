import { Button } from "@/components/ui/button";
import appConfig from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-darkGreen w-full h-screen">
      <div className="flex justify-center items-center">
        <Image src="/brand/logo-dark.png" alt="logo" width={450} height={450} />
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="max-w-2xl">
          <p className="font-medium text-center text-2xl leading-10">
            {appConfig.appDescription}
          </p>
        </div>
        <Link href={"/dashboard"}>
          <Button variant={"secondary"} size={"lg"}>
            Get started
          </Button>
        </Link>
      </div>
    </div>
  );
}
