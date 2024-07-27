import { Toaster } from "sonner";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

const Layout = ({ title, content, children }) => {
 return(<>
  {/* this helps with SEO */}
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    <div className="container mt-5">
    <Toaster position="top-center"/>
      {children}
      </div>
  </>
  ) 
};

export default Layout;
