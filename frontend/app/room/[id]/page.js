import RoomClientWrapper from "./RoomClientWrapper";

// Next.js 16 App Router standard: params is an async Promise
export default async function VideoRoomPage({ params }) {
  const { id } = await params;

  return <RoomClientWrapper roomId={id} />;
}
