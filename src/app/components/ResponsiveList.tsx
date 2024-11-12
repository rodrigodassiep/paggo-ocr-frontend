import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import JSZip from 'jszip';
import { MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';


interface Item {
  image : string;
  content: string;
  summary : string;
}


const ResponsiveList: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<Item[]>([]);
  
  // useEffect(() => {
  //   Modal.setAppElement('#__next'); // Set the root element for react-modal
  // }, []);

  useEffect(() => {
    async function fetchResults() {

      const response = await fetch("/api/results", {
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      }
      else {
        setResults([]);
      }
    }

    fetchResults();
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleDowload =async (item : Item, index : number) => {
    const zip = new JSZip();
    zip.file(`query${index}_extracted_text.txt`, item.content);
    zip.file(`query${index}_summary.txt`, item.summary);
    const response = await fetch(item.image);
    const blob = await response.blob();
    zip.file(`query${index}.png`, blob);
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `query${index}.zip`;
      a.click();
    });
  }
  return (
    <div className="space-y-4">
      {results && results.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{"Query " + (index + 1)}</h2>
            <button
              onClick={() => openModal(item.image)}
              className="hover:text-blue-600"
              title="View Image"
            >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
            </button>
            
            <button
              onClick={() => handleDowload(item, index + 1)}
              className="text-blue-500 hover:text-blue-600"
              title="Download as Zip"
            >
              <ArrowDownTrayIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-2">
            <button
              type="button"
              className="bg-gray-100 w-full text-left p-2"
              onClick={() => document.getElementById(`collapse${index}`)?.classList.toggle('hidden')}
            >
              See extracted text
            </button>
            <div id={`collapse${index}`} className="hidden mt-2 text-sm text-gray-700">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="flex justify-center items-center"
        overlayClassName="bg-black bg-opacity-50 fixed inset-0"
      >
        <div className="relative max-w-4xl">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Zoomed In"
              className="w-full h-full object-contain"
            />
          )}
          <button onClick={closeModal} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ResponsiveList;
