import "@/styles/globals.css";
import Usercontext from "../../Context/Usercontext/Userstate";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Usercontext>
        <Component {...pageProps} />
      </Usercontext>
    </>
  )
}
