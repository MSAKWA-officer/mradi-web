// scripts/create-admin.ts
import { supabase } from "../lib/supabaseClient";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("admin123", 10);
  const email = "admin@church.com";

  // Insert into your Supabase "profiles" table
  const { data, error } = await supabase
    .from("profiles") // adjust table name if different
    .insert([
      {
        email,
        password, // store hashed password
        role: "ADMIN",
      },
    ]);

  if (error) {
    console.error("Failed to create admin:", error);
  } else {
    console.log("Admin created:", data);
  }
}

main();