import { NextResponse } from "next/server";
import fs from "fs/promises";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

const pump = promisify(pipeline);

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("imageFile")[0];
    const filePath = path.resolve(`./public/img/temp/${file.name}`);    
    const fileContent = await file.stream();
    await fs.writeFile(filePath, fileContent, { encoding: "utf-8" });
    return NextResponse.json({ status: "success", data: file });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}

export async function DELETE(req, res) {
  try {
    const formData = await req.formData();
    const fileName = formData.getAll("fileName")[0];
    const filePath = path.resolve(`./public/img/temp/${fileName}`);
    console.log("formData     ", formData);
    console.log("Attempting to delete file:", filePath);
    // Check if the file exists
    try {
      await fs.access(filePath);
      console.log("File exists:", filePath);
    } catch (accessError) {
      console.error("File does not exist:", accessError.message);
      return NextResponse.json({ status: "fail", data: "File does not exist" });
    }

    // Attempt to delete the file
    try {
      await fs.unlink(filePath);
      console.log("File deleted successfully.");
      return NextResponse.json({ status: "success", data: 200 });
    } catch (unlinkError) {
      console.error("Error deleting file:", unlinkError.message);
      return NextResponse.json({ status: "fail", data: "Error deleting file" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error.message });
  }
}
