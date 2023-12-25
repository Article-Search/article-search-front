import Image from 'next/image'
// use the authcontext provider
import { AuthProvider } from "@/app//Context/authContext" ;

export default function Home() {

  return (

    <AuthProvider>
    {/*nothing*/}
    <main className="">
    </main>
    </AuthProvider>
  )
}
