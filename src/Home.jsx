import Footer from "./Shared/Footer";
import Navbar from "./Shared/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content of the home page.</p>
      <Footer />
    </div>
  );
}

export default Home;