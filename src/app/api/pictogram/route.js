import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("imageFile")[0];
    const filePath = `./public/img/pictograms/${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", data: file });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function DELETE(req, res) {
  try {
    const formData = await req.formData();
    const fileName = formData.getAll("fileName")[0];
    await fs.unlink(`./public/img/temp/${fileName}`); // Удалить файл по указанному пути
    console.log("File deleted successfully.");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
