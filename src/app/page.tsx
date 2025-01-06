import Link from "next/link";

export const  Home = () => {
  return (
   <div className="flex min-h-screen items-center justify-center">
    Click <Link href="/documents/123" > <span className="text-blue-500 underline">&nbsp; here &nbsp;</span></Link> to see the document page
   </div>
  );
}


export default Home;