import { useEffect, useState } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AgreementData from "./editors/editorsContainer/AgreementData";
import LearnNow from "./pages/LearnNow";
import AgreementHtml from "./AgreementHtml";
import Errors from "./utils/helpers/Errors";
import TemplateMarkdown from "./editors/editorsContainer/TemplateMarkdown";
import TemplateModel from "./editors/editorsContainer/TemplateModel";
import useAppStore from "./store/store";
import SampleDropdown from "./components/SampleDropdown";
import UseShare from "./components/UseShare";
import LearnContent from "./components/Content";
import FloatingFAB from "./components/FabButton";

const App = () => {
  const navigate = useNavigate();
  const init = useAppStore((state) => state.init);
  const loadFromLink = useAppStore((state) => state.loadFromLink);
  const backgroundColor = useAppStore((state) => state.backgroundColor);
  const textColor = useAppStore((state) => state.textColor);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        const compressedData = searchParams.get("data");
        if (compressedData) {
          await loadFromLink(compressedData);
          if (window.location.pathname !== "/") {
            navigate("/", { replace: true });
          }
        } else {
          await init();
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, [init, loadFromLink, searchParams, navigate]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .collapse-header {
        color: ${textColor} !important;
      }
      .collapse-content {
        background-color: ${backgroundColor} !important;
      }
      .collapse-content-active {
        background-color: ${backgroundColor} !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [backgroundColor, textColor]);

  const scrollToFooter = () => {
    const exploreContent = document.getElementById("footer");
    if (exploreContent) {
      exploreContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrollToFooter={scrollToFooter} />
      <main className="flex-1">
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            {/* Main Page Route */}
            <Route
              path="/"
              element={
                <div
                  className="p-6 min-h-[calc(100vh-64px-70px)]"
                  style={{ background: backgroundColor }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col sm:w-1/3">
                      <div className="ml-6 flex flex-row gap-2">
                        <SampleDropdown setLoading={setLoading} />
                        <UseShare />
                      </div>
                      <Errors />
                    </div>
                    <div className="flex-1">
                      <div className="p-6 bg-white shadow-md rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <TemplateMarkdown />
                          <TemplateModel />
                          <AgreementData />
                        </div>
                      </div>
                      <AgreementHtml loading={loading} isModal={false} />
                    </div>
                  </div>
                  <FloatingFAB />
                </div>
              }
            />
            {/* Learn Section Routes */}
            <Route path="/learn" element={<LearnNow />}>
              <Route path="intro" element={<LearnContent file="intro.md" />} />
              <Route path="module1" element={<LearnContent file="module1.md" />} />
              <Route path="module2" element={<LearnContent file="module2.md" />} />
              <Route path="module3" element={<LearnContent file="module3.md" />} />
            </Route>
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
};

const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin w-10 h-10 border-4 border-t-teal-500 rounded-full"></div>
  </div>
);

export default App;
