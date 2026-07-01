import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/IdentifyPage.css'

export default function IdentifyPage() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const navigate = useNavigate()
  const { state } = useLocation()
  const mode = state?.mode

  // Start Camera
  const startCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    })
    videoRef.current.srcObject = mediaStream
    setStream(mediaStream)
  }

  useEffect(() => {
    startCamera()
    return () => stream?.getTracks().forEach((track) => track.stop())
  }, [])

  // Capture photo and show preview
  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    const imageData = canvas.toDataURL('image/jpeg')
    setCapturedImage(imageData)
  }

  // reset preview
  const retakePhoto = async () => {
    setCapturedImage(null) // reset preview
    // stop previous stream if exists
    stream?.getTracks().forEach((track) => track.stop())
    // restart camera
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    })
    videoRef.current.srcObject = mediaStream
    setStream(mediaStream)
  }

  // Confirm photo and send to API
  const confirmPhoto = async () => {
    try {
      const base64Data = capturedImage.split(',')[1]
      const response = await fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': import.meta.env.VITE_PLANTID_API_KEY,
        },
        body: JSON.stringify({
          images: [base64Data],
          plant_details: ['common_names', 'url', 'description', 'taxonomy'],
        }),
      })

      // console.log('Plant.id response status:', response.status)
      // const text = await response.text()
      // console.log('Plant.id raw response:', text)

      const data = await response.json()
      const destination = mode === 'disease' ? '/disease-result' : '/result'
      navigate(destination, { state: { image: capturedImage, result: data } })
    } catch (err) {
      console.error(err)
      alert('Faild to identify plant')
    }
  }

  return (
    <div className="scan-page">
      {!capturedImage ? (
        <video ref={videoRef} autoPlay playsInline className="camera-view" />
      ) : (
        <img src={capturedImage} alt="Preview" className="camera-view" />
      )}
      <button onClick={() => navigate(-1)} className="camera-back-btn">
        <svg
          width="30"
          height="23"
          viewBox="0 0 30 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.1717 9.46661H6.73813L12.8336 3.37112C13.6064 2.59831 13.6064 1.35243 12.8336 0.579613C12.0608 -0.193204 10.8149 -0.193204 10.0421 0.579613L0.579592 10.0421C0.485076 10.1366 0.406132 10.2394 0.335109 10.3418C0.303691 10.3891 0.287849 10.4363 0.256165 10.4838C0.216826 10.5469 0.17722 10.61 0.153726 10.6811C0.129964 10.7442 0.114387 10.8073 0.0906252 10.8783C0.0747843 10.9335 0.0512864 10.9887 0.0354448 11.0518C-0.0118149 11.3042 -0.0118149 11.5721 0.0354448 11.8246C0.0512864 11.8877 0.0668628 11.9429 0.0906252 11.998C0.106467 12.0611 0.122044 12.1322 0.153726 12.1953C0.185144 12.2663 0.224749 12.3294 0.256165 12.3925C0.279926 12.4397 0.303424 12.487 0.335109 12.5345C0.406132 12.6449 0.492727 12.7473 0.579592 12.8342L10.0421 22.2967C10.4284 22.683 10.9332 22.8723 11.4377 22.8723C11.9422 22.8723 12.4471 22.683 12.8333 22.2967C13.6061 21.5239 13.6061 20.278 12.8333 19.5052L6.73779 13.4097L27.1714 13.4095C28.2597 13.4095 29.1428 12.5263 29.1428 11.438C29.1428 10.3497 28.2597 9.46656 27.1714 9.46656L27.1717 9.46661Z"
            fill="white"
          />
        </svg>
      </button>
      {/* buttons*/}
      <div className="scan-controls">
        {!capturedImage ? (
          <button
            onClick={capturePhoto}
            className="capture-btn capture-live"
          ></button>
        ) : (
          <>
            <button onClick={retakePhoto} className="switch-btn">
              <svg
                width="26"
                height="24"
                viewBox="0 0 26 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.00730772 1.09071C-0.0573976 0.557081 0.314519 0.072013 0.848144 0.00730771C1.38177 -0.0573976 1.86684 0.314519 1.93154 0.848144L2.51367 5.35959C4.71282 2.09325 8.43193 0.0719576 12.4421 0.0719576C17.5519 0.0719576 22.0957 3.32215 23.7612 8.14087C23.9391 8.64214 23.6642 9.19191 23.1629 9.36977C23.0659 9.40212 22.9527 9.41827 22.8395 9.41827C22.4353 9.41827 22.0633 9.15956 21.9178 8.77144C20.5272 4.72891 16.7111 2.01234 12.4422 2.01234C8.94941 2.01234 5.69921 3.85572 3.88818 6.7987L8.7392 6.24893C9.27282 6.18422 9.75789 6.57234 9.80645 7.10597C9.85495 7.63959 9.48303 8.12466 8.94941 8.17322L1.96389 8.96555C1.93154 8.96555 1.88304 8.96555 1.85069 8.96555C1.36556 8.96555 0.945147 8.60978 0.896645 8.12472L0.00730772 1.09071ZM24.0361 14.0753L17.0506 14.8676C16.5169 14.9323 16.1289 15.4012 16.1935 15.9349C16.2582 16.4685 16.7271 16.8565 17.2608 16.7919L21.4812 16.323C19.8318 19.7995 16.3229 22.0472 12.4259 22.0472C8.04381 22.0472 4.09828 19.1204 2.83703 14.9323C2.67532 14.4149 2.1417 14.1238 1.62427 14.2855C1.10685 14.4471 0.815791 14.9808 0.977444 15.4982C1.70507 17.9076 3.22509 20.0744 5.23018 21.5944C7.31612 23.1629 9.80634 24.0037 12.4259 24.0037C17.2123 24.0037 21.4974 21.1578 23.3892 16.8403L24.0684 22.225C24.1331 22.7101 24.5535 23.0658 25.0224 23.0658C25.0709 23.0658 25.1033 23.0658 25.1518 23.0658C25.6854 23.0011 26.0573 22.516 25.9926 21.9824L25.0871 14.9485C25.0386 14.3987 24.5697 14.0268 24.0361 14.0753Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              onClick={confirmPhoto}
              className="capture-btn capture-send"
            ></button>
          </>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
