import Link from "next/link";
import { NavBar } from "./navbar";

export const  Home = () => {
  return (

   <div className="min-h-screen flex flex-col">
    <div className="fixed top-0 left-0 right-0 z-20 h-16 bg-white p-4">
      <NavBar />
    </div>
    <div className="mt-16">
      Click <Link href="/documents/123" > <span className="text-blue-500 underline">&nbsp; here &nbsp;</span></Link> to see the document page
    </div>
   </div>
  );
}


export default Home;