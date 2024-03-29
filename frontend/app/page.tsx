import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-16">
      <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md md:h-28 md:w-28">
        <Image
          src="/profile.jpg"
          alt="Profile Picture"
          width={200}
          height={200}
        />
      </div>
    </main>
  );
}
