'use client';
import { useState } from "react";
import { redirect } from 'next/navigation';
import AWS from 'aws-sdk';
import ResponsiveList from './components/ResponsiveList';
import Authenticated from "./components/Authenticated";

const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const REGION = process.env.NEXT_PUBLIC_S3_REGION;

export default function Home() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setSuccess(false);
    setError(null);
  };

  const uploadFile = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_API_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_API_KEY,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });



    const params = {
      Bucket: S3_BUCKET,
      Key: image.name,
      Body: image,
    };

    const upload = s3
      .putObject(params)
      .promise();

    const data = await upload;
    return data;
  };
  const handleUpload = async () => {

    await uploadFile();
    const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURI(image.name)}`;
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setUploading(true);
    setSuccess(false);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to upload an image.");
      return;
    }

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        body: JSON.stringify({ file: url, token }),
      });

      if (response.ok) {
        setSuccess(true);
        setSummary((await response.json()).text);
        setError(null);
      } else {
        throw new Error("Failed to upload the image.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    redirect("/login");
  };
  return (
    <Authenticated>
      <div className="flex">
        {/* Main content - Takes 3/4 of the width */}
        <div className="w-3/4 p-4 text-center">
          <button
            onClick={handleLogout}
            className="absolute top-4 left-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
          <h1 className="text-2xl font-bold mb-6">Invoice Upload</h1>

          {/* File Upload Input */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>



          {uploading && (
            <div>
              <div className=" border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Uploading your image...</span>
            </div>
          )}

          {success && (
            <p className="mt-4 text-green-500 font-semibold">Image uploaded successfully!</p>
          )}

          {error && (
            <p className="mt-4 text-red-500 font-semibold">Error: {error}</p>
          )}

          {/* Result of the Query */}
          {summary && (
            <div className="mt-6 p-4 border border-gray-200 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Query Result</h2>
              <p className="text-gray-700">{summary}</p>
            </div>
          )}
        </div>

        {/* ResponsiveList - Takes 1/4 of the width */}
        <div className="w-1/4 p-4">
          <h2 className="text-xl font-semibold mb-4">Previous Queries</h2>
          <ResponsiveList />
        </div>
      </div>
    </Authenticated>
  );
}
