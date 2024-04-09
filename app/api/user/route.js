export async function POST(request) {
  const UserData = await request.json();
  return Response.json({ message: "Hello World", UserData });
}

export async function GET() {
  return Response.json({ UserData });
}
