import { useEffect, useRef, useState } from "react"
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {
        return (
            <div style={{
                maxWidth: 420,
                margin: "4em auto",
                background: "#23232b",
                borderRadius: 16,
                boxShadow: "0 4px 32px #0006",
                padding: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h2 style={{marginBottom: "1em", color: "#a5b4fc"}}>Omegle Clone</h2>
                <video autoPlay ref={videoRef} width={320} height={240} style={{marginBottom: "1em"}}></video>
                <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    style={{width: "100%"}}
                />
                <button onClick={() => setJoined(true)}>
                    Join
                </button>
            </div>
        )
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}