import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import renderPredictions from "@/utils/render-prediction";
const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef();
  const canvasRef = useRef();
  const runCoco = async () => {
    setIsLoading(true);
    const net = await cocoSSDLoad();
    console.log(net);
    setIsLoading(false);

    let dectectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  };
  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video?.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      //find detected object
      const detectedObject = await net.detect(
        webcamRef.current.video,
        undefined,
        0.6
      );
    //   console.log(detectedObject)
    const context = canvasRef.current.getContext('2d')
    renderPredictions(detectedObject,context)
    }
  }

  useEffect(() => {
    runCoco();
  }, []);
  return (
    <div className="mt-8">
      {isLoading ? (
        <p>Loading AI Model</p>
      ) : (
        <div className="relative flex justify-center items-center bg-gradient-to-b from-white via-gray-300 to-gray-600 p-1.5 rounded-md">
          {/* web cam */}
          <Webcam ref={webcamRef} className="rounded-md  lg:h-[500px] " muted />
          {/* canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
