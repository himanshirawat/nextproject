import User from "@/models/userModel";
import connectDB from "@/utils/db";

export async function POST(Request, Response) {
  try {
    await connectDB(
      "mongodb+srv://himanshirawat:kR8D5amrucAEmpS4@data.3nyhlsj.mongodb.net/?retryWrites=true&w=majority"
    );
    const { name, email, password } = Request.body;

    const newuser = await User.create({
      name,
      email,
      password,
    });
    return Response.status(200).json({ success: true, newuser });
  } catch (error) {
    return Response.status(500).json({ message: error });
  }
}
