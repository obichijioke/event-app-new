import { NextResponse } from "next/server";
import { Client, Databases } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_URL as string)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string)
  .setKey(process.env.APPWRITE_API_KEY as string);

const databases = new Databases(client);

export async function GET() {
  try {
    const collectionsData = await databases.listCollections(
      process.env.APPWRITE_DATABASE_ID as string
    );
    return NextResponse.json(collectionsData);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const newCollection = await databases.createCollection(
      process.env.APPWRITE_DATABASE_ID as string,
      name,
      description
    );
    return NextResponse.json(newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { error: "Failed to create collection" },
      { status: 500 }
    );
  }
}
