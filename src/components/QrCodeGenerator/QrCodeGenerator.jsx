import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

const QrCodeGenerator = () => {
    const [url, setUrl] = useState("");
    const [qrIsVisible, setQrIsVisible] = useState(false);

    const qrCodeRef = useRef(null);

    const handleQrCodeGenerator = () => {
        if (!url) {
            return;
        }
        setQrIsVisible(true);
    };

    const downloadQRCode = () => {
        htmlToImage.toPng(qrCodeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${url}.png`;
                link.click();
            })
            .catch(function (error) {
                console.error("Error Generating QR code:", error);
            });
    };

    return (
        <>
            <h1 className="text-center mt-20 font-bold text-2xl">QR Code Generator</h1>
            <div className="flex items-center justify-center w-full h-[80vh]">
                <div className="flex items-center justify-center gap-3">
                    <div className="gap-3 w-full p-2">
                        <input 
                           type="text" 
                           placeholder="Enter a URL"
                           value={url}
                           className="w-full p-[10px] resize-none outline-none rounded-[5px] mb-[15px] border"
                           onChange={(e) => setUrl(e.target.value)}
                        />

                        <div className="w-[300px] mx-auto flex items-center justify-center">
                            <button onClick={handleQrCodeGenerator} 
                            className="p-3 cursor-pointer text-white border-none rounded-[5px] font-medium bg-blue-600">Generate QR Code</button>
                        </div>
                    </div>

                    {qrIsVisible && (
                        <div className="mt-5">
                            <QRCode value={url} size={300} ref={qrCodeRef}/>
                            <div className="w-[300px] mx-auto flex items-center justify-center mt-[10px]">
                                <button onClick={downloadQRCode} 
                                className="inline-block p-[7px] cursor-pointer text-white border-none rounded-[5px] font-medium bg-blue-600">Download QR Code</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default QrCodeGenerator;
