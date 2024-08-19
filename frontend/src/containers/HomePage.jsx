import Layout from "../components/Layout";
import './Homepage.css';

const HomePage = () => {
  return (
    <Layout title="AI Document Assistant | Home" content="Home">
      <div className="HomePage">
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1>AI Document Assistant</h1>
          <p className="lead">Enhance your writing with AI-powered document reading, rewriting, and improvement.</p>
          <a href="#features" className="btn btn-primary btn-lg mt-3">Learn More</a>
        </div>
      </header>

      <section id="features" className="py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Read Documents</h5>
                  <p className="card-text">Automatically extract and analyze content from your documents.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Rewrite Content</h5>
                  <p className="card-text">Use AI to improve phrasing and clarity in your writing.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Improve Documents</h5>
                  <p className="card-text">Get suggestions for enhancing style, tone, and structure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="call-to-action" className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Get Started Today</h2>
          <p className="lead">Upload your document and let our AI assistant do the magic.</p>
          <a href="#upload" className="btn btn-primary btn-lg mt-3">Start Now</a>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">© 2024 AI Document Assistant. All Rights Reserved.</p>
        </div>
      </footer>
      </div>
    </Layout>
  );
};

export default HomePage;
